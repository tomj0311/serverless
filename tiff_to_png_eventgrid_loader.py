import datetime
import uuid

from msrest.authentication import TopicCredentials
from azure.eventgrid import EventGridClient
from azure.eventgrid.models import EventGridEvent

from threading import Thread
import time

TOPIC_ENDPOINT = "tiff-to-png-topic.southeastasia-1.eventgrid.azure.net"

EVENT_GRID_KEY = 'H1G0d9RiDsmYto3hr/bngu6oJuOzhpEYWUWV/9fLtOw='


def build_events_list(filename):
    result = []
    for i in range(1):
        result.append(EventGridEvent(
            id=uuid.uuid4(),
            subject="t2p",
            data={
                'key': filename
            },
            event_type='CustomEventType',
            event_time=datetime.datetime.now(),
            data_version=2.0
        ))
    return result

def send_event(filename, event_grid_client):

    event_grid_client.publish_events(
        TOPIC_ENDPOINT,
        events=build_events_list(filename)
    )

    print(filename + ' event published')

    return True

def run():
    credentials = TopicCredentials(
        EVENT_GRID_KEY
    )

    event_grid_client = EventGridClient(credentials)

    filenames = ['101-14198-04-04AX02.tif', '101-14198-04-04AX02.tif', 'CCITT_4.TIF', 'CCITT_6.TIF', 'FLAG_T24.TIF', 'G31DS.TIF', 'G4.TIF', 'GMARBLES.TIF', 'MARBLES.TIF', 'XING_T24.TIF']

    for i in range(100):
        for filename in filenames:
            # send_event(filename, event_grid_client)
            t = Thread(target=send_event, args=(filename, event_grid_client,))
            t.start()

    print("Published events to Event Grid.")

if __name__ == "__main__":
    run()
