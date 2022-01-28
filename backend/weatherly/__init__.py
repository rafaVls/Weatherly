from flask import Flask
from flask_cors import CORS
from . import forecast, geocoding, reverse_geocoding

def create_app(config_filename="flask.cfg"):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, origins=["https://weatherly-sand.vercel.app"])

    app.config.from_pyfile(config_filename)
    app.register_blueprint(forecast.bp)
    app.register_blueprint(geocoding.bp)
    app.register_blueprint(reverse_geocoding.bp)
    
    return app
