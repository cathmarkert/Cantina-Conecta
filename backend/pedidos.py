"""Ciclo de compra: criação de pedidos, venda no balcão e extratos.

Toda compra passa por `registrar_pedido`, que valida estoque, saldo e limite
antes de gravar. As mutações (débito de crédito, baixa de estoque, gasto do
dependente) acontecem numa única transação: se qualquer validação falhar,
nada é persistido.
"""
from datetime import datetime, timedelta
from decimal import Decimal

from flask import Blueprint, jsonify, request

from models import Dependente, Estoque, ItemPedido, Pedido, Recarga, db
from security import buscar_dependente_do_usuario, login_required, owner_required

pedidos_bp = Blueprint('pedidos', __name__)


class ErroDeCompra(Exception):
    """Compra recusada por uma regra de negócio (estoque, saldo ou limite)."""

    def __init__(self, mensagem, status=400):
        super().__init__(mensagem)
        self.mensagem = mensagem
        self.status = status


def _validar_itens(itens):
    """Valida o payload de itens e devolve [(produto, quantidade), ...]."""
    if not itens:
        raise ErroDeCompra('Selecione ao menos um item.')

    validados = []
    for item in itens:
        produto = Estoque.query.get(item.get('estoque_id'))
        if produto is None:
            raise ErroDeCompra('Produto não encontrado no estoque.', 404)

        try:
            quantidade = int(item.get('quantidade'))
        except (TypeError, ValueError):
            raise ErroDeCompra(f'Quantidade inválida para {produto.produto}.')

        if quantidade <= 0:
            raise ErroDeCompra(f'Quantidade inválida para {produto.produto}.')

        if produto.quantidade < quantidade:
            raise ErroDeCompra(
                f'Estoque insuficiente para {produto.produto}: '
                f'restam {produto.quantidade}.'
            )

        validados.append((produto, quantidade))

    return validados


def registrar_pedido(dependente, itens, horario, origem):
    """Cria o pedido e aplica seus efeitos. Levanta ErroDeCompra se recusado.

    O commit fica a cargo de quem chama, para que a rota controle o rollback.
    """
    validados = _validar_itens(itens)
    responsavel = dependente.usuario

    total = sum(produto.preco * quantidade for produto, quantidade in validados)

    if responsavel.credito < total:
        raise ErroDeCompra(
            f'Saldo insuficiente: o pedido custa R$ {total:.2f} e o saldo '
            f'é de R$ {responsavel.credito:.2f}.'
        )

    # Limite zerado significa "sem teto de gasto".
    if dependente.limite > 0 and dependente.valor_gasto + total > dependente.limite:
        disponivel = dependente.limite - dependente.valor_gasto
        raise ErroDeCompra(
            f'Limite de {dependente.name} excedido: restam R$ {disponivel:.2f} '
            f'e o pedido custa R$ {total:.2f}.'
        )

    pedido = Pedido(
        dependente_id=dependente.id,
        horario=horario,
        origem=origem,
        total=total,
    )
    db.session.add(pedido)

    for produto, quantidade in validados:
        produto.quantidade -= quantidade
        pedido.itens.append(ItemPedido(
            estoque_id=produto.id,
            quantidade=quantidade,
            valor_unitario=produto.preco,
        ))

    responsavel.credito = responsavel.credito - total
    dependente.valor_gasto = dependente.valor_gasto + total

    return pedido


def serializar_pedido(pedido):
    return {
        'id': pedido.id,
        'nome': pedido.dependente.name,
        'responsavel': pedido.dependente.usuario.name,
        'data': pedido.data.strftime('%d/%m/%Y'),
        'horario': pedido.horario,
        'origem': pedido.origem,
        'total': float(pedido.total),
        'itens': [
            f'{item.quantidade}x {item.produto.produto}' for item in pedido.itens
        ],
    }


@pedidos_bp.route('/pedidos', methods=['POST'])
@login_required
def criar_pedido(usuario):
    data = request.get_json() or {}

    dependente, erro = buscar_dependente_do_usuario(usuario, data.get('dependente_id'))
    if erro:
        return erro

    horario = data.get('horario')
    if not horario:
        return jsonify({'message': 'Selecione o horário de entrega.'}), 400

    try:
        pedido = registrar_pedido(
            dependente, data.get('itens'), horario, Pedido.AGENDADO
        )
        db.session.commit()
    except ErroDeCompra as e:
        db.session.rollback()
        return jsonify({'message': e.mensagem}), e.status
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao registrar pedido: ' + str(e)}), 500

    return jsonify({
        'message': 'Pedido realizado com sucesso!',
        'pedido': serializar_pedido(pedido),
        'credito': float(usuario.credito),
    }), 201


@pedidos_bp.route('/venda-balcao', methods=['POST'])
@owner_required
def venda_balcao(usuario):
    """Venda feita no balcão da cantina, debitada do responsável do dependente."""
    data = request.get_json() or {}

    dependente = Dependente.query.get(data.get('dependente_id'))
    if dependente is None:
        return jsonify({'message': 'Dependente não encontrado.'}), 404

    if not dependente.lanche_avulso:
        return jsonify({
            'message': f'{dependente.name} não está autorizado a comprar lanche avulso.'
        }), 403

    try:
        pedido = registrar_pedido(
            dependente,
            data.get('itens'),
            datetime.now().strftime('%H:%M'),
            Pedido.BALCAO,
        )
        db.session.commit()
    except ErroDeCompra as e:
        db.session.rollback()
        return jsonify({'message': e.mensagem}), e.status
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao registrar a venda: ' + str(e)}), 500

    return jsonify({
        'message': 'Venda registrada com sucesso!',
        'pedido': serializar_pedido(pedido),
    }), 201


@pedidos_bp.route('/pedidos', methods=['GET'])
@login_required
def listar_pedidos(usuario):
    """Dono vê todos os pedidos da cantina; responsável vê os dos seus dependentes."""
    consulta = Pedido.query.join(Dependente)

    if not usuario.is_owner:
        consulta = consulta.filter(Dependente.usuario_id == usuario.id)

    pedidos = consulta.order_by(Pedido.data.desc(), Pedido.horario).all()
    return jsonify([serializar_pedido(p) for p in pedidos]), 200


@pedidos_bp.route('/extrato', methods=['GET'])
@login_required
def extrato(usuario):
    """Débitos (pedidos dos dependentes) e créditos (recargas) do responsável."""
    lancamentos = []

    pedidos = (
        Pedido.query.join(Dependente)
        .filter(Dependente.usuario_id == usuario.id)
        .all()
    )
    for pedido in pedidos:
        lancamentos.append({
            'id': f'pedido-{pedido.id}',
            'type': 'Lanche',
            'sign': '-',
            'value': f'R$ {pedido.total:.2f}'.replace('.', ','),
            'date': pedido.data.strftime('%d/%m/%Y'),
            'ordenacao': pedido.data.isoformat(),
        })

    for recarga in Recarga.query.filter_by(usuario_id=usuario.id).all():
        lancamentos.append({
            'id': f'recarga-{recarga.id}',
            'type': 'Saldo',
            'sign': '+',
            'value': f'R$ {recarga.valor:.2f}'.replace('.', ','),
            'date': recarga.data.strftime('%d/%m/%Y'),
            'ordenacao': recarga.data.isoformat(),
        })

    lancamentos.sort(key=lambda item: item['ordenacao'], reverse=True)
    return jsonify(lancamentos), 200


@pedidos_bp.route('/extrato-compras', methods=['GET'])
@owner_required
def extrato_compras(usuario):
    """Todas as compras da cantina, para a tela de extrato do dono."""
    pedidos = Pedido.query.order_by(Pedido.data.desc()).all()
    return jsonify([
        {
            'id': str(pedido.id),
            'studentName': pedido.dependente.name,
            'responsibleName': pedido.dependente.usuario.name,
            'value': f'R$ {pedido.total:.2f}'.replace('.', ','),
            'date': pedido.data.strftime('%d/%m/%Y'),
        }
        for pedido in pedidos
    ]), 200


@pedidos_bp.route('/resumo', methods=['GET'])
@login_required
def resumo(usuario):
    """Estatísticas dos últimos 30 dias para as telas iniciais."""
    desde = datetime.now() - timedelta(days=30)

    consulta = Pedido.query.join(Dependente).filter(Pedido.data >= desde)
    if not usuario.is_owner:
        consulta = consulta.filter(Dependente.usuario_id == usuario.id)
    pedidos = consulta.all()

    total_lanches = sum(item.quantidade for p in pedidos for item in p.itens)
    valor_gasto = sum((p.total for p in pedidos), Decimal(0))

    # Produto mais pedido no período, usado na tela inicial do dono.
    contagem = {}
    for pedido in pedidos:
        for item in pedido.itens:
            contagem[item.produto.produto] = (
                contagem.get(item.produto.produto, 0) + item.quantidade
            )
    produto_mais_pedido = max(contagem, key=contagem.get) if contagem else '—'

    return jsonify({
        'lanches_30_dias': total_lanches,
        'valor_30_dias': float(valor_gasto),
        'produto_mais_pedido': produto_mais_pedido,
    }), 200
