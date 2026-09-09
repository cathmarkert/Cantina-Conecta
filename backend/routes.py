from decimal import Decimal, InvalidOperation

from flask import Blueprint, jsonify, request

from models import Dependente, Recarga, db
from security import buscar_dependente_do_usuario, login_required

routes_bp = Blueprint('routes', __name__)


def serializar_dependente(dependente):
    return {
        'id': dependente.id,
        'nome': dependente.name,
        'matricula': dependente.matricula,
        'lanche_avulso': dependente.lanche_avulso,
        'limite': float(dependente.limite),
        'valor_gasto': float(dependente.valor_gasto),
    }


# Rota para pegar informações do perfil
@routes_bp.route('/profile', methods=['GET'])
@login_required
def get_profile(usuario):
    return jsonify({
        'id': usuario.id,
        'nome': usuario.name,
        'credito': float(usuario.credito),
        'is_owner': usuario.is_owner,
        'dependentes': [serializar_dependente(dep) for dep in usuario.dependentes],
    }), 200


@routes_bp.route('/dependentes', methods=['POST'])
@login_required
def add_dependente(usuario):
    data = request.get_json() or {}

    nome = data.get('name')
    matricula = data.get('matricula')
    lanche_avulso = data.get('lanche_avulso', False)

    if not nome or not matricula:
        return jsonify({'message': 'Nome e matrícula são obrigatórios.'}), 400

    if Dependente.query.filter_by(matricula=matricula).first():
        return jsonify({'message': 'Já existe um dependente com essa matrícula.'}), 400

    novo_dependente = Dependente(
        name=nome,
        matricula=matricula,
        lanche_avulso=bool(lanche_avulso),
        usuario_id=usuario.id,
    )

    try:
        db.session.add(novo_dependente)
        db.session.commit()
        return jsonify({
            'message': 'Dependente adicionado com sucesso!',
            'dependente': serializar_dependente(novo_dependente),
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao adicionar dependente: ' + str(e)}), 500


@routes_bp.route('/remove-dependentes/<int:id>', methods=['DELETE'])
@login_required
def remover_dependente(usuario, id):
    dependente, erro = buscar_dependente_do_usuario(usuario, id)
    if erro:
        return erro

    try:
        db.session.delete(dependente)
        db.session.commit()
        return jsonify({'message': 'Dependente removido com sucesso'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao remover dependente: ' + str(e)}), 500


@routes_bp.route('/dependentes/limite/<int:dependente_id>', methods=['PATCH'])
@login_required
def update_limite(usuario, dependente_id):
    dependente, erro = buscar_dependente_do_usuario(usuario, dependente_id)
    if erro:
        return erro

    data = request.get_json() or {}

    try:
        novo_limite = Decimal(str(data.get('limite')))
    except (InvalidOperation, TypeError):
        return jsonify({'message': 'Limite inválido.'}), 400

    if novo_limite < 0:
        return jsonify({'message': 'O limite não pode ser negativo.'}), 400

    try:
        dependente.limite = novo_limite
        db.session.commit()
        return jsonify({
            'message': 'Limite atualizado com sucesso',
            'dependente': serializar_dependente(dependente),
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


@routes_bp.route('/dependentes/lanche/avulso/<int:dependente_id>', methods=['PATCH'])
@login_required
def update_dependente(usuario, dependente_id):
    dependente, erro = buscar_dependente_do_usuario(usuario, dependente_id)
    if erro:
        return erro

    data = request.get_json() or {}

    if 'lanche_avulso' in data:
        dependente.lanche_avulso = bool(data['lanche_avulso'])
    db.session.commit()

    return jsonify({
        'message': 'Dependente atualizado com sucesso',
        'dependente': serializar_dependente(dependente),
    }), 200


@routes_bp.route('/add-credit', methods=['POST'])
@login_required
def add_credit(usuario):
    data = request.get_json() or {}

    # O valor chega do app como número JSON (float). Convertê-lo via str evita
    # tanto o TypeError de somar float com Decimal quanto o ruído binário do float.
    try:
        valor = Decimal(str(data.get('credito')))
    except (InvalidOperation, TypeError):
        return jsonify({'message': 'Valor inválido.'}), 400

    if valor <= 0:
        return jsonify({'message': 'Valor deve ser maior que zero.'}), 400

    try:
        usuario.credito = usuario.credito + valor
        db.session.add(Recarga(usuario_id=usuario.id, valor=valor))
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erro ao adicionar crédito: ' + str(e)}), 500

    return jsonify({
        'message': f'Créditos adicionados: R$ {valor:.2f}',
        'credito': float(usuario.credito),
    }), 200
