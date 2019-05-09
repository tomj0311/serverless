import cv2, numpy as np
import os
import sys

lib_path = os.path.abspath(os.path.join('.'))
sys.path.append(lib_path)

from Azure import blob
from Logger import logger

class Convert(object):
    def __init__(self, logger):
        self.logger = logger.Logger()

    def encode_ndarray(self, ndarray):
        _, buffer = cv2.imencode('.png', ndarray)
        return buffer

    def convert(self, event):

        azureblob = blob.Blob()

        try:
            event_data = event['data']
            filename = event_data['key']

            image_binary_string = azureblob.get_image_bytes(filename)
            image_array = np.fromstring(image_binary_string, dtype='uint8')
            image_ndarray = cv2.imdecode(image_array, cv2.IMREAD_UNCHANGED)
            png_image_binary_str = self.encode_ndarray(image_ndarray).tostring()
            filenametosave = str(filename).split('.')[0] + ".png"
            blobpath = azureblob.save_image_bytes(filenametosave,
                                                  png_image_binary_str)

            self.logger.log_debug("Converted " + filename)

        except Exception as ex:
            self.logger.log_exception(Exception)

        finally:
            azureblob.save_json(event['id'] + '.json', event)
            self.logger.log_debug("Event failed!", props=event)

if __name__ == "__main__":
    c = Convert()
    c.convert('101-14198-04-04AX02.tif')
