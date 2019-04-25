import logging

import azure.functions as func
from ImageConversion import convert
import cv2


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('filename')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('filename')

    if name:
        if convert.convert(name):
            return func.HttpResponse(f"Converted {name}!")
        else:
            return func.HttpResponse("Convert failed!")
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )
