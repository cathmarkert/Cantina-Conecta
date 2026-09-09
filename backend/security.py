"""Controle de acesso das rotas.

A autenticação é por sessão (Flask-Session): o login grava `session['user_id']`
e todo o resto deriva daí. Estes helpers evitam que cada rota repita a checagem
e garantem que um usuário só enxergue os próprios dados.
"""
from functools import wraps

from flask import jsonify, session

from models import Dependente, Usuario


def usuario_logado():
    """Retorna o Usuario da sessão atual, ou None se não houver sessão válida."""
    user_id = session.get('user_id')
    if user_id is None:
        return None
    return Usuario.query.get(user_id)


def login_required(f):
    """Bloqueia a rota se não houver usuário na sessão.

    Injeta o Usuario como primeiro argumento da view.
    """
    @wraps(f)
    def wrapper(*args, **kwargs):
        user = usuario_logado()
        if user is None:
            return jsonify({'message': 'Usuário não está autenticado.'}), 401
        return f(user, *args, **kwargs)
    return wrapper


def owner_required(f):
    """Restringe a rota ao dono da cantina."""
    @wraps(f)
    def wrapper(*args, **kwargs):
        user = usuario_logado()
        if user is None:
            return jsonify({'message': 'Usuário não está autenticado.'}), 401
        if not user.is_owner:
            return jsonify({'message': 'Ação permitida apenas ao dono da cantina.'}), 403
        return f(user, *args, **kwargs)
    return wrapper


def buscar_dependente_do_usuario(usuario, dependente_id):
    """Busca um dependente garantindo que ele pertence ao usuário.

    Retorna (dependente, None) em caso de sucesso ou (None, resposta_de_erro)
    quando o dependente não existe ou é de outro responsável — sem essa checagem
    qualquer conta conseguiria manipular o dependente de outra trocando o ID.
    """
    dependente = Dependente.query.get(dependente_id)

    if dependente is None:
        return None, (jsonify({'message': 'Dependente não encontrado.'}), 404)

    if dependente.usuario_id != usuario.id:
        return None, (jsonify({'message': 'Este dependente não pertence a você.'}), 403)

    return dependente, None
