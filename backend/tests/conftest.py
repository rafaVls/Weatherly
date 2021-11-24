from requests.exceptions import Timeout, TooManyRedirects, RequestException
from requests.models import Response
from weatherly import create_app
from unittest.mock import patch

import pytest

@pytest.fixture(scope="class")
def flask_app():
    # Create a client using the Flask application configured for testing
    flask_app = create_app("flask_test.cfg")

    return flask_app

@pytest.fixture(scope="class")
def test_app(flask_app):
    with flask_app.test_client() as test_client:
        # establish an application context
        with flask_app.app_context():
            yield test_client # this is where the testing happens

@pytest.fixture(scope="function")
def mock_multithread():
    with patch ("weatherly.forecast.multithread_request") as mock_mr:
        yield mock_mr

@pytest.fixture(scope="function")
def mock_mr_res(mock_multithread, test_app, request):
    if isinstance(request.param, str):
        if request.param == "success":
            data = [{"current": {"temp": value}} for value in [32.0, 89.69]]
        else:
            data = [{"cod": "408", "message": "Timeout error"} for _ in [0, 1]]

        mock_multithread.return_value = data
        url = "/forecast?lat=32&lon=-115"

    else:
        url = "/forecast?lat=True&lon=-115"

    return test_app.get(url, follow_redirects=True)

@pytest.fixture(scope="function")
def mock_request():
    with patch("weatherly._utils.requests.get") as mock_req:
        yield mock_req

@pytest.fixture(scope="function")
def mock_response(mock_request):
    mock_res = Response()
    mock_res.status_code = 200
    mock_res._content = b'{ "current": { "temp": 82.69 } }'
    mock_request.return_value = mock_res

    return mock_request

@pytest.fixture(scope="function")
def request_error(mock_request, request):
    if request.param == "timeout":
        mock_request.side_effect = Timeout("Timeout error")
    elif request.param == "redirect":
        mock_request.side_effect = TooManyRedirects("Redirect error")
    elif request.param == "request":
        mock_request.side_effect = RequestException("Request error")

    return mock_request
