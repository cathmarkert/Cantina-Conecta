import os

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_session import Session

from auth import auth_bp
from cantina import cantina_bp
from models import db
from pedidos import pedidos_bp
from routes import routes_bp

load_dotenv()

app = Flask(__name__)
# supports_credentials permite que o cookie de sessão trafegue quando o app roda
# no navegador (expo web). No app nativo o CORS não se aplica.
CORS(app, supports_credentials=True)

basedir = os.path.abspath(os.path.dirname(__file__))
dbdir = os.path.join(basedir, 'db')
# O SQLite não cria o diretório do arquivo: sem isso a conexão falha na primeira execução.
os.makedirs(dbdir, exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(dbdir, "cantina.sqlite")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-trocar-em-producao')
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

app.register_blueprint(auth_bp)
app.register_blueprint(routes_bp)
app.register_blueprint(cantina_bp)
app.register_blueprint(pedidos_bp)


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8082)
