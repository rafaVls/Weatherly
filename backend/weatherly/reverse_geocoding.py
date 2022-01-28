from os import environ
from flask import Blueprint, request, current_app

from .Param import Param
from ._utils import fetch_api

bp = Blueprint("reverse_geocoding", __name__, url_prefix="/reverse-geo")

@bp.route("/") # e.g. /reverse-geo?lat=32&lon=-117
def get_reverse_geocode():
    """
    Handles all requests to the /reverse-geo route
    """
    latitude = Param("latitude", request.args.get("lat", type=float), "float")
    longitude = Param("longitude", request.args.get("lon", type=float), "float")

    res_code = 400
    res = { "success": False, "error": "" }
    try:
        latitude.validate_type()
        longitude.validate_type()

        url = "https://maps.googleapis.com/maps/api/geocode/json"
        payload = {
            "latlng": f"{latitude.value},{longitude.value}",
            "result_type": "political",
            "key": current_app.config["REVERSE_GEOCODING_API_KEY"]
        }

        data = fetch_api(payload, url)

        if "results" not in data:
            res["success"] = False
            res["status"] = data["status"]
            res["error"] = data["error_message"]
        else:
            res["success"] = True
            res["data"] = data["results"][0] 
            res["status"] = data["status"]

            del res["error"]
            res_code = 200

    except TypeError as e:
        res["error"] = str(e)

    return res, res_code

