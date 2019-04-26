import os
import sys
lib_path = os.path.abspath(os.path.join('.'))
sys.path.append(lib_path)

import cv2, numpy as np
from Azure import blob


def encode_ndarray(ndarray):
    _, buffer = cv2.imencode('.png', ndarray)
    return buffer


def convert(filename):
    # get file from blob
    azureblob = blob.Blob()
    image_binary_string = azureblob.get_image_bytes(filename)

    image_array = np.fromstring(image_binary_string, dtype='uint8')
    image_ndarray = cv2.imdecode(image_array, cv2.IMREAD_UNCHANGED)

    png_image_binary_str = encode_ndarray(image_ndarray).tostring()
    filenametosave = str(filename).split('.')[0] + ".png"
    blobpath = azureblob.save_image_bytes(filenametosave, png_image_binary_str)

    return True

if __name__ == "__main__":
    convert()
