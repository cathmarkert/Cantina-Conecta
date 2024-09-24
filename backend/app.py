import os
from dotenv import load_dotenv
from flask import Flask, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session
from models import db
from auth import auth_bp
from routes import routes_bp
from cantina import cantina_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "db", "cantina.sqlite")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

db.init_app(app)
migrate = Migrate(app, db)

try:
    with app.app_context():
        db.create_all()
except Exception as e:
    print(f'Erro ao criar o banco de dados: {e}')

app.register_blueprint(auth_bp)
app.register_blueprint(routes_bp)
app.register_blueprint(cantina_bp)

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=8082) 
