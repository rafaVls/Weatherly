from requests.models import Response

import json

class TestGetGeocode:
    """All tests related to the /reverse-geo route"""

    mock_res = Response()
    mock_res.status_code = 200
    mock_res._content = b'''{
        "results": [{
            "address_components": [{"long_name": "Mexico", "short_name": "MX"}],
            "formatted_address": "Mexico",
            "geometry": {"bounds": {}, "location": {}},
            "place_id": "some_code_here",
            "types": ["country", "political"]
        }],
        "status": "OK",
        "success": true
    }'''

    def test_use_case(self, test_app, mock_request):
        mock_request.return_value = self.mock_res

        response = test_app.get(
            "/reverse-geo?lat=32&lon=-117",
            follow_redirects=True
        )

        assert response.status_code == 200
        assert response.status == "200 OK"
        assert json.loads(response.data.decode("utf-8")) == {
            "data": {
                "address_components": [{
                    "long_name": "Mexico",
                    "short_name": "MX"
                }],
                "formatted_address": "Mexico",
                "geometry": { "bounds": {}, "location": {}},
                "place_id": "some_code_here",
                "types": ["country", "political"]
            },
            "status": "OK",
            "success": True
        }

    def test_api_error(self, test_app, mock_request):
        self.mock_res._content = b'''{
            "status": "WRONG PARAMETER",
            "error_message": "WRONG LATLON PARAM"
        }'''
        mock_request.return_value = self.mock_res

        response = test_app.get(
            "/reverse-geo?lat=32&lon=-117",
            follow_redirects=True
        )

        assert response.status_code == 400
        assert response.status == "400 BAD REQUEST"
        assert json.loads(response.data.decode("utf-8")) == {
            "error": "WRONG LATLON PARAM",
            "status": "WRONG PARAMETER",
            "success": False
        }

