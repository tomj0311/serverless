from os import environ
from WebHook import application

if __name__ == '__main__':
    application.run('0.0.0.0', debug=False, port=8000, threaded=True)
