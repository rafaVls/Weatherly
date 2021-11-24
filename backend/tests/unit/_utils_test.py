from weatherly._utils import fetch_forecast, multithread_request
from unittest.mock import call
from pytest import raises, mark

class TestMultithreadRequest:
    """Tests related to the multithread_request function"""

    def test_use_case(self, mock_response):
        data1, data2 = multithread_request(
            fetch_forecast, { "lat": 32 }, ["metric", "imperial"]
        )

        assert data1 == data2 == { "current": { "temp": 82.69 } }

    @mark.parametrize("request_error", ["timeout"], indirect=True)
    def test_timeout_exception(self, request_error):
        data1, data2 = multithread_request(
            fetch_forecast, { "lat": 32 }, ["metric", "imperial"]
        )

        assert data1 == data2 == { "error": "Timeout error", "cod": 408 }

    @mark.parametrize("request_error", ["redirect"], indirect=True)
    def test_redirects_exception(self, request_error):
        data1, data2 = multithread_request(
            fetch_forecast, { "lat": 32 }, ["metric", "imperial"]
        )

        assert data1 == data2 == { "error": "Redirect error", "cod": 400 }

class TestFetchForecast:
    """Tests related to the fetch_forecast function"""

    def test_use_case(self, mock_response):
        res = fetch_forecast("", {})
            
        mock_response.assert_called_once()
        assert res == { "current": { "temp": 82.69 } }

    @mark.parametrize("request_error", ["timeout"], indirect=True)
    def test_timeout_exception(self, request_error):
        res = fetch_forecast("", {}, "")

        # requests.get should be called at least 6 times in case of Timeout
        calls = [call("", params={ "units": "" }) for _ in range(5)]
        request_error.assert_has_calls(calls)
        assert res == { "error": "Timeout error", "cod": 408 }

    @mark.parametrize("request_error", ["redirect"], indirect=True)
    def test_redirects_exception(self, request_error):
        res = fetch_forecast("", {}, "")

        request_error.assert_called_once()
        assert res == { "error": "Redirect error", "cod": 400 }

    @mark.parametrize("request_error", ["request"], indirect=True)
    def test_request_exception(self, request_error):
        with raises(SystemExit, match="Request error"):
            fetch_forecast("", {}, "")

        request_error.assert_called_once()
