from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    is_owner = db.Column(db.Boolean, default=False)

    transactions = db.relationship('Transaction', backref='user_transactions', lazy=True)  
    dependents = db.relationship('Dependent', backref='user_dependents', lazy=True) 

class Dependent(db.Model):
    __tablename__ = 'dependents'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.String(50), nullable=False)
    registration = db.Column(db.String(50), nullable=False)
    lanches = db.Column(db.String(50), nullable=False)
    valorgasto = db.Column(db.String(50), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    orders = db.relationship('Order', backref='dependent_orders', lazy=True, overlaps='dependent_orders')
    transactions = db.relationship('Transaction', backref='dependent_transactions', lazy=True, overlaps='dependent_transactions')

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    dependent_id = db.Column(db.Integer, db.ForeignKey('dependents.id'), nullable=False)
    comidas = db.Column(db.Text, nullable=False)
    bebidas = db.Column(db.Text, nullable=False)
    time = db.Column(db.String(50), nullable=False)

    dependent = db.relationship('Dependent', backref='dependent_orders', lazy=True)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)

    dependent_id = db.Column(db.Integer, db.ForeignKey('dependents.id'), nullable=True)
    dependent = db.relationship('Dependent', backref='dependent_transactions', lazy=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    user = db.relationship('User', backref='user_transactions', lazy=True)
