import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Dependent
from auth import auth_bp

app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "db", "cantina.sqlite")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

try:
    with app.app_context():
        db.create_all()
except Exception as e:
    print(f'Erro ao criar o banco de dados: {e}')

app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=8082) 
