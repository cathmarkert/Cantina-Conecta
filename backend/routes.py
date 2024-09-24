from flask import Blueprint, request, session, jsonify
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario, Dependente

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/teste', methods=['GET'])
def teste():
    return('teste')

# Rota para pegar informações do perfil
@routes_bp.route('/profile', methods=['GET'])
def get_profile():
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({'message': 'Usuário não está autenticado.'}), 401

    user = Usuario.query.get(user_id)

    if not user:
        return jsonify({'message': 'Usuário não encontrado.'}), 404

    perfil = {
        'id': user.id,
        'nome': user.name,
        'credito': user.credito,
        'is_owner': user.is_owner,
        'dependentes': [{'id': dep.id, 'nome': dep.name, 'matricula': dep.matricula, 'lanche_avulso': dep.lanche_avulso, 'limite': dep.limite, 'valor_gasto': dep.valor_gasto} for dep in user.dependentes]
    }

    return jsonify(perfil), 200

@routes_bp.route('/dependentes', methods=['POST'])
def add_dependente():
    data = request.json

    user_id = session.get('user_id')

    # Validação dos dados recebidos
    nome = data.get('name')
    matricula = data.get('matricula')
    lanche_avulso = data.get('lanche_avulso', False)

    if not nome or not matricula:
        return jsonify({"message": "Nome e matrícula são obrigatórios."}), 400

    # Criação de um novo dependente
    novo_dependente = Dependente(name=nome, matricula=matricula, lanche_avulso=lanche_avulso, usuario_id=user_id)

    try:
        db.session.add(novo_dependente)
        db.session.commit()
        return jsonify({"message": "Dependente adicionado com sucesso!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Erro ao adicionar dependente: " + str(e)}), 500


@routes_bp.route('/dependentes/lanche/avulso/<int:dependente_id>', methods=['PATCH'])
def update_dependente(dependente_id):
    dependente = Dependente.query.get(dependente_id)
    if not dependente:
        return jsonify({'message': 'Dependente não encontrado'}), 404
    
    data = request.get_json()

    # Atualiza o campo lanche_avulso se estiver presente na requisição
    if 'lanche_avulso' in data:
        dependente.lanche_avulso = data['lanche_avulso']
    db.session.commit()

    return jsonify({'message': 'Dependente atualizado com sucesso', 'dependente': {
        'id': dependente.id,
        'name': dependente.name,
        'matricula': dependente.matricula,
        'limite': dependente.limite,
        'lanche_avulso': dependente.lanche_avulso
    }}), 200

@routes_bp.route('/add-credit', methods=['POST'])
def add_credit():
    data = request.get_json()
    value = data.get('credito')
    print(value)

    user_id = session.get('user_id')
    user = Usuario.query.get(user_id)

    total = value + user.credito

    if value <= 0:
        return jsonify({'message': 'Valor deve ser maior que zero.'}), 400

    user.credito = total
    db.session.commit()

    return jsonify({'message': f'Créditos adicionados: R$ {value:.2f}'}), 200