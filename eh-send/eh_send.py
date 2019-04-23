import os
from AzureBlob import azureblob
import datetime
from time import time
from threading import Thread


def upload_to_blob(imagebytes, filename):
    blob = azureblob.AzureBlob()
    blobpath = blob.save_image_bytes(filename, imagebytes)
    print(filename + ' ' + str(len(imagebytes)) + ' ' + str(datetime.datetime.now()))


def send_event_to_eventhuh(filename):
    pass


def generate_and_send_events():
    directory = "./images"

    start_time = time()

    for filename in os.listdir(directory):
        if str.lower(filename).endswith(".tif") or str.lower(
                filename).endswith(".tiff"):

            with open(os.path.join(directory, filename), mode="rb") as f:
                imagebytes = f.read()
                f.close()

            upload_to_blob(imagebytes, filename)

            elapsed = time() - start_time
            print(str(elapsed))

        else:
            continue


if __name__ == "__main__":
    generate_and_send_events()
