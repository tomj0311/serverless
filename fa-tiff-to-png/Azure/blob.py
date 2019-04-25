from azure.storage.blob import BlockBlobService
from Azure import config


class Blob:
    def __init__(self):
        self.config = config.BLOBS['slimageutils']
        self.account_key = self.config['key']
        self.container_name = self.config['container_name']
        self.account_name = self.config['account_name']

        self.retries = int(self.config['retries'])
        self.retry_in_seconds = int(self.config['retry_in_seconds'])
        self.blob_service = BlockBlobService(
            account_name=self.account_name, account_key=self.account_key)

    def get_image_bytes(self, image_file_name):
        image_binary_str = self.blob_service.get_blob_to_bytes(
            self.container_name, image_file_name).content

        return image_binary_str

    def save_image_bytes(self, image_file_name, image_bytes):
        blob = self.blob_service.create_blob_from_bytes(
            self.container_name, image_file_name, blob=image_bytes)

        return blob
