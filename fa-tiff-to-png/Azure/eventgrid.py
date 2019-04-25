import datetime
import uuid

import cv2
import os
import sys
lib_path = os.path.abspath(os.path.join('.'))
sys.path.append(lib_path)

from msrest.authentication import TopicCredentials
from azure.eventgrid import EventGridClient
from azure.eventgrid.models import EventGridEvent
from Azure import config

# If you wish to debug
# import logging
# logging.basicConfig(level=logging.DEBUG)

# Enter values for <topic-name> and <region>
config = config.GRIDS['sl_tiff_to_png_topic']
TOPIC_ENDPOINT = config['topic_endpoint']

# Enter value for <topic-key>
EVENT_GRID_KEY = config['key']


def build_events_list(subject, data, event_type, data_version):
    # type: () -> List[EventGridEvent]
    result = []
    for i in range(1):
        result.append(EventGridEvent(
            id=uuid.uuid4(),
            subject=subject,
            data=data,
            event_type=event_type,
            event_time=datetime.datetime.now(),
            data_version=1.0
        ))
    return result


def run(subject, data, event_type, data_version):

    credentials = TopicCredentials(
        EVENT_GRID_KEY
    )

    event_grid_client = EventGridClient(credentials)

    event_grid_client.publish_events(
        TOPIC_ENDPOINT,
        events=build_events_list(subject, data, event_type, data_version)
    )

    print("Published events to Event Grid.")

if __name__ == "__main__":
    run()
