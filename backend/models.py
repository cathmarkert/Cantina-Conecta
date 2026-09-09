from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum
from sqlalchemy import Numeric

db = SQLAlchemy()

# Tabela Associativa entre Dependente e Estoque
lanche_tabela = db.Table('lanche',
    db.Column('dependente_id', db.Integer, db.ForeignKey('dependente.id'), primary_key=True),
    db.Column('estoque_id', db.Integer, db.ForeignKey('estoque.id'), primary_key=True),
    db.Column('quantidade', db.Integer, nullable=False),
    db.Column('valor', db.Float, nullable=False),
    db.Column('horario', db.DateTime, default=datetime.now),
    db.Column('data', db.DateTime, default=datetime.now)
)

# Tabela Usuarios
class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    credito = db.Column(Numeric(10, 2), default=0.0)
    email = db.Column(db.String(100), unique=True, nullable=False)
    is_owner = db.Column(db.Boolean, default=False)

    dependentes = db.relationship('Dependente', back_populates='usuario')
    avisos = db.relationship('Aviso', back_populates='dono', foreign_keys='Aviso.dono_id')

# Tabela Dependente
class Dependente(db.Model):
    __tablename__ = 'dependente'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(50), nullable=False, unique=True)
    lanche_avulso = db.Column(db.Boolean, nullable=False)
    limite = db.Column(Numeric(10, 2), default=0.0)
    valor_gasto = db.Column(Numeric(10, 2), default=0.0)

    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

    usuario = db.relationship('Usuario', back_populates='dependentes')
    lanches = db.relationship('Estoque', secondary=lanche_tabela, back_populates='dependentes')

# Tabela Estoque
class Estoque(db.Model):
    __tablename__ = 'estoque'

    id = db.Column(db.Integer, primary_key=True)
    produto = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, default=0)
    contem_lactose = db.Column(db.Boolean, default=False)
    contem_gluten = db.Column(db.Boolean, default=False)
    preco = db.Column(Numeric(10, 2), default=0.0)

    dependentes = db.relationship('Dependente', secondary=lanche_tabela, back_populates='lanches')

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
