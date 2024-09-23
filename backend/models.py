from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    is_owner = db.Column(db.Boolean, default=False)

    transactions = db.relationship('Transaction', back_populates='user', lazy=True)
    dependents = db.relationship('Dependent', back_populates='user', lazy=True)

class Dependent(db.Model):
    __tablename__ = 'dependents'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.String(50), nullable=False)
    registration = db.Column(db.String(50), nullable=False)
    lanches = db.Column(db.String(50), nullable=False)
    valorgasto = db.Column(db.String(50), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='dependents')

    orders = db.relationship('Order', back_populates='dependent', lazy=True)
    transactions = db.relationship('Transaction', back_populates='dependent', lazy=True)

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    dependent_id = db.Column(db.Integer, db.ForeignKey('dependents.id'), nullable=False)

    dependent = db.relationship('Dependent', back_populates='orders')

class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)

    dependent_id = db.Column(db.Integer, db.ForeignKey('dependents.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    dependent = db.relationship('Dependent', back_populates='transactions')
    user = db.relationship('User', back_populates='transactions')
