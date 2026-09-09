from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from models import Usuario, db
from security import login_required

auth_bp = Blueprint('auth', __name__)


# Rota para registro
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    is_owner = data.get('is_owner', False)

    if not email or not password or not name:
        return jsonify({'message': 'Nome, email e senha são obrigatórios.'}), 400

    # Verifica se o email já existe
    if Usuario.query.filter_by(email=email).first():
        return jsonify({'message': 'Email já está em uso.'}), 400

    # Cria um novo usuário
    new_user = Usuario(
        email=email,
        password=generate_password_hash(password),
        name=name,
        is_owner=bool(is_owner)
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201


# Rota para login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    user = Usuario.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Email ou senha inválidos.'}), 401

    # Armazena o ID do usuário na sessão
    session['user_id'] = user.id

    return jsonify({
        'message': 'Login realizado com sucesso!',
        'id': user.id,
        'is_owner': user.is_owner
    }), 200


@auth_bp.route('/user_data', methods=['GET'])
@login_required
def get_user_data(usuario):
    return jsonify({
        'id': usuario.id,
        'email': usuario.email,
        'name': usuario.name
    }), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout realizado com sucesso!'}), 200
