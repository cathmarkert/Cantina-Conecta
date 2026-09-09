from decimal import Decimal, InvalidOperation

from flask import Blueprint, jsonify, request

from models import Aviso, Estoque, db
from security import login_required, owner_required

cantina_bp = Blueprint('cantina', __name__)


def serializar_produto(item):
    return {
        'id': item.id,
        'nome': item.produto,
        'quantidade': item.quantidade,
        'contem_lactose': item.contem_lactose,
        'contem_gluten': item.contem_gluten,
        'preco': float(item.preco),
    }


@cantina_bp.route('/add-estoque', methods=['POST'])
@owner_required
def add_estoque(usuario):
    data = request.get_json() or {}
    produto = data.get('nome')
    quantidade = data.get('quantidade')
    preco = data.get('preco')

    if not produto or quantidade is None:
        return jsonify({'message': 'Nome e quantidade são obrigatórios.'}), 400

    try:
        quantidade = int(quantidade)
        preco = Decimal(str(preco if preco is not None else 0))
    except (ValueError, TypeError, InvalidOperation):
        return jsonify({'message': 'Quantidade ou preço inválidos.'}), 400

    if quantidade < 0 or preco < 0:
        return jsonify({'message': 'Quantidade e preço não podem ser negativos.'}), 400

    novo_produto = Estoque(
        produto=produto,
        quantidade=quantidade,
        contem_lactose=bool(data.get('contem_lactose')),
        contem_gluten=bool(data.get('contem_gluten')),
        preco=preco,
    )

    try:
        db.session.add(novo_produto)
        db.session.commit()
        return jsonify({
            'message': 'Produto adicionado ao estoque com sucesso!',
            'produto': serializar_produto(novo_produto),
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao adicionar produto: ' + str(e)}), 500


@cantina_bp.route('/estoque', methods=['GET'])
@login_required
def get_estoque(usuario):
    estoque = Estoque.query.order_by(Estoque.produto).all()
    return jsonify([serializar_produto(item) for item in estoque]), 200


@cantina_bp.route('/add-aviso', methods=['POST'])
@owner_required
def add_aviso(usuario):
    data = request.get_json() or {}
    mensagem = data.get('mensagem')

    if not mensagem:
        return jsonify({'message': 'Mensagem de Aviso é obrigatória.'}), 400

    novo_aviso = Aviso(mensagem=mensagem, dono_id=usuario.id)

    try:
        db.session.add(novo_aviso)
        db.session.commit()
        return jsonify({'message': 'Aviso adicionado com sucesso!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao adicionar aviso: ' + str(e)}), 500


@cantina_bp.route('/avisos', methods=['GET'])
@login_required
def get_avisos(usuario):
    """Avisos da cantina, do mais recente para o mais antigo."""
    avisos = Aviso.query.order_by(Aviso.data_criacao.desc()).limit(20).all()
    return jsonify([
        {
            'id': aviso.id,
            'mensagem': aviso.mensagem,
            'data': aviso.data_criacao.strftime('%d/%m/%Y'),
        }
        for aviso in avisos
    ]), 200
