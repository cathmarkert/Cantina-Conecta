from flask import Blueprint, request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/teste', methods=['GET'])
def teste():
    return('teste')

# Rota para registro
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    is_owner = data.get('is_owner', False)

    # Verifica se o email já existe
    if Usuario.query.filter_by(email=email).first():
        return jsonify({'message': 'Email já está em uso.'}), 400

    # Cria um novo usuário
    new_user = Usuario(
        email=email,
        password=generate_password_hash(password),
        name=name,
        is_owner=is_owner
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

# Rota para login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
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
def get_user_data():
    if 'user_id' not in session:
        return jsonify({'message': 'Usuário não está logado.'}), 401
    
    user = Usuario.query.get(session['user_id'])
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name
    }), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout realizado com sucesso!'}), 200


