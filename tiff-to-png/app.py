from os import environ
from WebHook import app

if __name__ == '__main__':
    app.run('0.0.0.0', debug=False, port=80, threaded=True)
