from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Numeric

db = SQLAlchemy()


# Tabela Usuarios
class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    # O hash gerado pelo Werkzeug (scrypt) passa de 160 caracteres.
    password = db.Column(db.String(255), nullable=False)
    credito = db.Column(Numeric(10, 2), default=0, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    is_owner = db.Column(db.Boolean, default=False)

    dependentes = db.relationship('Dependente', back_populates='usuario')
    avisos = db.relationship('Aviso', back_populates='dono', foreign_keys='Aviso.dono_id')
    recargas = db.relationship('Recarga', back_populates='usuario')


# Tabela Dependente
class Dependente(db.Model):
    __tablename__ = 'dependente'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(50), nullable=False, unique=True)
    # Permite ao dependente comprar no balcão da cantina, sem pedido agendado.
    lanche_avulso = db.Column(db.Boolean, nullable=False, default=False)
    # Teto de gasto acumulado. 0 significa sem limite.
    limite = db.Column(Numeric(10, 2), default=0, nullable=False)
    valor_gasto = db.Column(Numeric(10, 2), default=0, nullable=False)

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

    usuario = db.relationship('Usuario', back_populates='dependentes')
    pedidos = db.relationship('Pedido', back_populates='dependente')


# Tabela Estoque
class Estoque(db.Model):
    __tablename__ = 'estoque'

    id = db.Column(db.Integer, primary_key=True)
    produto = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, default=0, nullable=False)
    contem_lactose = db.Column(db.Boolean, default=False)
    contem_gluten = db.Column(db.Boolean, default=False)
    preco = db.Column(Numeric(10, 2), default=0, nullable=False)

    itens = db.relationship('ItemPedido', back_populates='produto')


# Tabela Pedido
class Pedido(db.Model):
    """Um lanche comprado para um dependente, com um ou mais itens.

    Substitui a tabela associativa dependente/estoque: o vínculo carrega dados
    próprios (horário de entrega, origem, total) e precisa ser consultado como
    entidade no extrato e nas listas de pedidos.
    """
    __tablename__ = 'pedido'

    AGENDADO = 'agendado'
    BALCAO = 'balcao'

    id = db.Column(db.Integer, primary_key=True)
    dependente_id = db.Column(db.Integer, db.ForeignKey('dependente.id'), nullable=False)

    # Horário de entrega escolhido pelo responsável, no formato 'HH:MM'.
    horario = db.Column(db.String(5))
    data = db.Column(db.DateTime, default=datetime.now, nullable=False)
    origem = db.Column(db.String(20), default=AGENDADO, nullable=False)
    total = db.Column(Numeric(10, 2), nullable=False)

    dependente = db.relationship('Dependente', back_populates='pedidos')
    itens = db.relationship(
        'ItemPedido', back_populates='pedido', cascade='all, delete-orphan'
    )


# Tabela ItemPedido
class ItemPedido(db.Model):
    __tablename__ = 'item_pedido'

    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedido.id'), nullable=False)
    estoque_id = db.Column(db.Integer, db.ForeignKey('estoque.id'), nullable=False)

    quantidade = db.Column(db.Integer, nullable=False)
    # Preço unitário no momento da compra. Guardado como snapshot para que uma
    # mudança de preço no estoque não reescreva o histórico do extrato.
    valor_unitario = db.Column(Numeric(10, 2), nullable=False)

    pedido = db.relationship('Pedido', back_populates='itens')
    produto = db.relationship('Estoque', back_populates='itens')


# Tabela Recarga
class Recarga(db.Model):
    """Entrada de crédito na conta do responsável.

    Sem esse registro o extrato só conseguiria mostrar as saídas.
    """
    __tablename__ = 'recarga'

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    valor = db.Column(Numeric(10, 2), nullable=False)
    data = db.Column(db.DateTime, default=datetime.now, nullable=False)

    usuario = db.relationship('Usuario', back_populates='recargas')


# Tabela Aviso
class Aviso(db.Model):
    __tablename__ = 'aviso'

    id = db.Column(db.Integer, primary_key=True)
    mensagem = db.Column(db.String(255), nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.now)

    dono_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)  # Dono é obrigatório
    responsavel_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=True)  # Responsável é opcional

    dono = db.relationship('Usuario', back_populates='avisos', foreign_keys=[dono_id])
    responsavel = db.relationship('Usuario', foreign_keys=[responsavel_id])
