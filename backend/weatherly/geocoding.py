from os import environ
from flask import Blueprint, request

from .Param import Param
from ._utils import fetch_api

bp = Blueprint("geocoding", __name__, url_prefix="/geocoding")

@bp.route("/") # e.g. /geocoding?address=Tijuana
def get_coordinates():
    """
    Handles all requests to the /geocoding route
    """
    address = Param("address", request.args.get("address", type=str), "str")

    res_code = 400
    res = { "success": False, "error": "" }
    try:
        address.validate_type()

        url = "https://maps.googleapis.com/maps/api/geocode/json"
        payload = {
            "address": address.value,
            "key": environ.get("GEOCODING_API_KEY")
        }

        data = fetch_api(payload, url)

        if not data:
            res["success"] = False
            res["error"] = f"Location {address.value} not found"
        else:
            res["success"] = True
            res["data"] = data["results"]
            res["status"] = data["status"]

            del res["error"]
            res_code = 200

    except TypeError as e:
        res["error"] = str(e)

    return res, res_code

