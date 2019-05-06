"""
Routes and views for the flask application.
"""

from WebHook import app
from datetime import datetime
from flask import render_template, jsonify, request, Response
from Logger import logger
import json
import time
from threading import Thread
from Conversion import convert


@app.route('/')
@app.route('/home')
def home():
    return render_template(
        'login.html',
        year=datetime.now().year,
    )


@app.route('/api/trigger', methods=['GET', 'POST'])
def trigger():
    try:
        logging.info('Python HTTP trigger function processed a request.')

        postreqdata = request.get_json()

        for event in postreqdata:
            event_data = event['data']

            # Deserialize the event data into the appropriate type based on event type using if/elif/else
            if event['eventType'] == "Microsoft.EventGrid.SubscriptionValidationEvent":
                validation_code = event_data['validationCode']
                validation_url = event_data.get('validationUrl', None) # If you don't use the preview version of EventGrid, this might no exist
                print("Got a SubscriptionValidation event data, validation code is: {}, validation url is {}".format(
                    validation_code,
                    validation_url
                ))

                answer_payload = {
                    "validationResponse": validation_code
                }
            elif event['eventType'] == "CustomEvent":
                payload = json.loads(event_data['key'])
                t = Thread.start(convert.convert("xyz"))
                t.start()
                time.sleep(3)

    except Exception as ex:
        logger.Logger().log_exception(ex)

    else:
        return jsonify(answer_payload)
