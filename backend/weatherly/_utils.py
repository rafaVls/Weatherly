from itertools import repeat
from requests import exceptions
from multiprocessing import Pool

import requests 

def multithread_request(
    func, query_params: dict[str, "str | float"], url:str, iter_params: list[str]
):
    """
    Use `multiprocessing.Pool()` to make HTTP requests in parallel (with 
    `payload` as the requests params) with `iter_params` as the variable query 
    parameters.
    """
    with Pool(2) as p:
        data_list = [data for data in p.starmap(
            func, zip(repeat(query_params), repeat(url), iter_params)
            # func, zip(iter_params, repeat(query_params))
        )]

    return data_list

def fetch_api(
    payload: dict[str, "str | float"], 
    url: str,
    units: str = None,
    times_called: int = 1
):
    """
    Make an HTTP GET request to the specified URL with `payload` as the request 
    parameters, with `units` as the varying one. `times_called` is used for 
    recursive calls in the process of catching and handling errors.
    """
    try:
        if units is not None:
            payload["units"] = units

        data = requests.get(url, params=payload)

    except exceptions.Timeout as e_timeout:
        # retry with recursiveness with a limit of 5 attempts
        if times_called > 5:
            return { "error": str(e_timeout), "cod": 408 }

        times_called += 1

        # data = fetch_forecast(payload, units, url, times_called)
        data = fetch_api(payload, url, units, times_called)
        return data # return directly, successful fetch_forecast returns json 

    except exceptions.TooManyRedirects as e_redirects:
        return { "error": str(e_redirects), "cod": 400 }

    except exceptions.RequestException as e:
        # critical failure, exiting app
        raise SystemExit(e)

    return data.json()

