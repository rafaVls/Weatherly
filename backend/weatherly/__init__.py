from flask import Flask
from . import forecast 

def create_app(config_filename="flask.cfg"):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_pyfile(config_filename)
    app.register_blueprint(forecast.bp)
    
    return app
