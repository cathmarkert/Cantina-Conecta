from flask import Blueprint, request, session, jsonify
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Usuario, Dependente, Estoque, Aviso

cantina_bp = Blueprint('cantina', __name__)

@cantina_bp.route('/teste', methods=['GET'])
def teste():
    return('teste')

# Rota para pegar informações do perfil
@cantina_bp.route('/add-estoque', methods=['POST'])
def add_estoque():
    data = request.get_json()
    produto = data.get('nome')
    quantidade = data.get('quantidade')
    preco = data.get('preco')
    contem_lactose = data.get('contem_lactose')
    contem_gluten = data.get('contem_gluten')

    user_id = session.get('user_id')
    user = Usuario.query.get(user_id)

    if not produto or not quantidade:
        return jsonify({"message": "Nome e quantidade são obrigatórios."}), 400

    novo_produto = Estoque(produto=produto, quantidade=quantidade, contem_lactose=contem_lactose, contem_gluten=contem_gluten, preco=preco)

    try:
        db.session.add(novo_produto)
        db.session.commit()
        return jsonify({"message": "Produto adicionado ao estoque com sucesso!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Erro ao adicionar produto: " + str(e)}), 500
    

@cantina_bp.route('/estoque', methods=['GET'])
def get_estoque():
    try:
        # Query para buscar todos os itens de estoque
        estoque = Estoque.query.all()

        # Transformando o resultado em um formato JSON
        estoque_list = [{
            'id': item.id,
            'nome': item.produto,
            'quantidade': item.quantidade,
            'contem_lactose': item.contem_lactose,
            'contem_gluten': item.contem_gluten,
            'preco' : item.preco
        } for item in estoque]

        # Retornando a lista de estoque como JSON
        return jsonify(estoque_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@cantina_bp.route('/add-aviso', methods=['POST'])
def add_aviso():
    data = request.get_json()
    aviso = data.get('mensagem')

    user_id = session.get('user_id')
    user = Usuario.query.get(user_id)

    if not aviso:
        return jsonify({"message": "Mensagem de Aviso é obrigatória."}), 400

    novo_aviso = Aviso(mensagem=aviso, dono_id=user_id)

    try:
        db.session.add(novo_aviso)
        db.session.commit()
        return jsonify({"message": "Aviso adicionado com sucesso!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Erro ao adicionar aviso: " + str(e)}), 500
    
@cantina_bp.route('/remove-stock', methods=['POST'])
def remove_stock():
    data = request.get_json()
    products_to_remove = data.get('products', [])

    if not products_to_remove:
        return jsonify(message='Nenhum produto para remover.'), 400

    for item in products_to_remove:
        product_id = item.get('id')
        quantity_str = item.get('quantity')  # Obtém o quantity como string
        try:
            quantity = int(quantity_str)  # Converte para inteiro
        except ValueError:
            return jsonify(message=f'Quantidade inválida para o produto {product_id}.'), 400

        if quantity < 0:
            return jsonify(message=f'Quantidade inválida para o produto {product_id}.'), 400

        product = Estoque.query.get(product_id)
        if product:
            if product.quantidade >= quantity:
                product.quantidade -= quantity
            else:
                return jsonify(message=f'Quantidade insuficiente para o produto {product_id}.'), 400
        else:
            return jsonify(message=f'Produto {product_id} não encontrado.'), 400

    db.session.commit()
    return jsonify(message='Produtos retirados do estoque com sucesso.'), 200

