from weatherly import create_app

class TestFactory:
    """All tests related to the factory app"""

    def test_config(self, flask_app):
        assert not create_app().testing
        assert create_app().config["ENV"] == "development"
        assert create_app().config["DEBUG"] == True

        assert flask_app.testing
        assert flask_app.config["ENV"] == "testing"
        assert flask_app.config["DEBUG"] == False
