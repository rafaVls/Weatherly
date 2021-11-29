from requests.models import Response

import json

class TestGetCoordinates:
    """All tests related to the /geocoding route"""

    mock_res = Response()
    mock_res.status_code = 200
    mock_res._content = b'''{
        "results": [{ "geography": { "lat": 32, "lon": -115 }}],
        "status": "OK"
    }'''

    def test_use_case(self, test_app, mock_request):
        mock_request.return_value = self.mock_res
        
        response = test_app.get(
            "/geocoding?address=mexicali",
            follow_redirects=True
        )

        assert response.status_code == 200
        assert response.status == "200 OK"
        assert json.loads(response.data.decode("utf-8")) == {
            "data": [{ "geography": { "lat": 32, "lon": -115 }}],
            "status": "OK",
            "success": True
        }

    def test_api_error(self, test_app, mock_request):
        self.mock_res._content = b'[]'
        mock_request.return_value = self.mock_res

        response = test_app.get(
            "/geocoding?address=definetely+fake+address",
            follow_redirects=True
        )

        assert response.status_code == 400
        assert response.status == "400 BAD REQUEST"
        assert json.loads(response.data.decode("utf-8")) == {
            "error": "Location definetely fake address not found",
            "success": False
        }

    def test_type_error(self, test_app):
        # no need to mock request here, since validate_type() raises TypeError
        # before the fetch_api function is called
        response = test_app.get(
            "/geocoding?address=not_valid_address_32.54",
            follow_redirects=True
        )

        assert response.status_code == 400
        assert response.status == "400 BAD REQUEST"
        assert json.loads(response.data.decode("utf-8")) == {
            "error": "address must be of type str",
            "success": False
        }

