from os import environ
from flask import Blueprint, request

from .Param import Param
from ._utils import multithread_request, fetch_api 

bp = Blueprint("forecast", __name__, url_prefix="/forecast")

@bp.route("/") # e.g. /forecast?lat=32.62&long=-115.45
def get_forecast():
    """
    Handles all requests to the /forecast route
    """
    latitude = Param("latitude", request.args.get("lat", type=float), "float")
    longitude = Param("longitude", request.args.get("lon", type=float), "float")
    
    res_code = 400
    res = { "success": False, "error": "" }

    try:
        # if Param isn't of the specified type, this will raise a TypeError
        latitude.validate_type()
        longitude.validate_type()

        url = "https://api.openweathermap.org/data/2.5/onecall"
        payload = {
            "lat": latitude.value,
            "lon": longitude.value,
            "exclude": "minutely,alerts",
            "appid": environ.get("ONECALL_API_KEY")
        }

        data_metric, data_imperial = multithread_request(
            fetch_api, payload, url, ["metric", "imperial"]
        )

        if "cod" in data_metric: # the error code is present in both data_*
            res["error"] = data_metric["message"]
            res_code = int(data_metric["cod"])
        else:
            res["success"] = True
            res["forecast_metric"] = data_metric
            res["forecast_imperial"] = data_imperial

            del res["error"]
            res_code = 200

    except TypeError as e:
        res["error"] = str(e)

    return res, res_code

