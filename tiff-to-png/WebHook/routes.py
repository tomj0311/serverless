"""
Routes and views for the flask application.
"""

from WebHook import app
from datetime import datetime
from flask import render_template, jsonify, request, Response
import json
import time
from threading import Thread
from Conversion import convert
from Logger import logger

_logger = logger.Logger()


@app.route('/')
@app.route('/home')
def home():
    return render_template(
        'login.html',
        year=datetime.now().year,
    )


@app.route('/api/gridtrigger', methods=['GET', 'POST'])
def trigger():
    try:

        event_request = request.get_json()

        for event in event_request:
            event_data = event['data']

            if event['eventType'] == "Microsoft.EventGrid.SubscriptionValidationEvent":

                validation_code = event_data['validationCode']
                validation_url = event_data.get('validationUrl', None)

                print("Got a SubscriptionValidation event data, validation \
                      code is: {}, validation url is {}".format(
                    validation_code,
                    validation_url
                ))

                answer_payload = {
                    "validationResponse": validation_code
                }

                return jsonify(answer_payload)

            elif event['eventType'] == "CustomEventType":
                c = convert.Convert()
                t = Thread(target=c.convert, args=(event,))
                t.start()

    except Exception as ex:
        _logger.log_exception(ex)

    finally:
        return "Ok"
