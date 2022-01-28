from weatherly import create_app

app = create_app('flask_production.cfg')

if __name__ == '__main__':
    app.run();
