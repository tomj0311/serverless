import datetime
import uuid

from msrest.authentication import TopicCredentials
from azure.eventgrid import EventGridClient
from azure.eventgrid.models import EventGridEvent

TOPIC_ENDPOINT = "tiff-to-png.southeastasia-1.eventgrid.azure.net"

EVENT_GRID_KEY = 'FeYkNUUlOm7Bld4Ht2273dGAoGcUDVR8om5E8mz10YE='


def build_events_list():
    result = []
    for i in range(1):
        result.append(EventGridEvent(
            id=uuid.uuid4(),
            subject="t2p",
            data={
                'key': 'FLAG_T24.TIF'
            },
            event_type='CustomEventType',
            event_time=datetime.datetime.now(),
            data_version=2.0
        ))
    return result


def run():

    credentials = TopicCredentials(
        EVENT_GRID_KEY
    )
    event_grid_client = EventGridClient(credentials)
    event_grid_client.publish_events(
        TOPIC_ENDPOINT,
        events=build_events_list()
    )
    print("Published events to Event Grid.")

if __name__ == "__main__":
    run()
