from pytest import mark

import json

class TestGetForecast:
    """All tests related to the get_forecast route"""

    @mark.parametrize("mock_mr_res", ["success"], indirect=True)
    def test_use_case(self, mock_mr_res):
        assert mock_mr_res.status_code == 200
        assert mock_mr_res.status == "200 OK"
        assert json.loads(mock_mr_res.data.decode("utf-8")) == {
            "forecast_metric": { "current": { "temp": 32.0 }},
            "forecast_imperial": { "current": { "temp": 89.69 }},
            "success": True
        }

    @mark.parametrize("mock_mr_res", ["error"], indirect=True)
    def test_api_error(self, mock_mr_res):
        assert mock_mr_res.status_code == 408
        assert mock_mr_res.status == "408 REQUEST TIMEOUT"
        assert json.loads(mock_mr_res.data.decode("utf-8")) == {
            "error": "Timeout error",
            "success": False
        }

    # def test_type_error(self, test_app, mock_multithread):
    @mark.parametrize("mock_mr_res", [None], indirect=True)
    def test_type_error(self, mock_mr_res):
        assert mock_mr_res.status_code == 400
        assert mock_mr_res.status == "400 BAD REQUEST"
        assert json.loads(mock_mr_res.data.decode("utf-8")) == {
            "error": "latitude must be of type float",
            "success": False
        }
