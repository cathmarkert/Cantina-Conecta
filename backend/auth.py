from flask import Blueprint, request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/teste', methods=['GET'])
def teste():
    return('teste')

# Rota para registro
@auth_bp.route('/register', methods=['POST'])
def register():
    print("cheguei aqui")
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    is_owner = data.get('is_owner', False)

    # Verifica se o email já existe
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email já está em uso.'}), 400

    # Cria um novo usuário
    new_user = User(
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

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Email ou senha inválidos.'}), 401

    return jsonify({
        'message': 'Login realizado com sucesso!',
        'user_id': user.id,
        'is_owner': user.is_owner 
    }), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    # Limpa a sessão ou trata o logout
    # session.pop('user_id', None)
    return jsonify({'message': 'Logout realizado com sucesso!'}), 200

