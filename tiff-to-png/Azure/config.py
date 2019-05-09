IMAGE_PATH = "images"

BLOBS = {
    'slimageutils':  {
        'account_name': 'GG',
        'container_name': 'images',
        'key': 'GG',
        'retries': 3,
        'retry_in_seconds': 5,
    },
}

# GRIDS = {
#     'sl_tiff_to_png_topic': {
#         'topic_endpoint': 'sl-tiff-to-png-topic.southeastasia-1.eventgrid.azure.net',
#         'key': 'DH5QpyHzdsQSjEFENgJhp77c5H1rIQDS2hXjkpWfNYk='
#     }
# }

# PROXIES = ''

# PROXIES = {
#     'http': 'http://esiproxy:8080', 
#     'https': 'http://esiproxy:8080',
# }

QUEUE_LENGTH = 8
LOG_FILE = 'service.log'
