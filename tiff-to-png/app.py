from os import environ
from WebHook import app

if __name__ == '__main__':
    HOST = environ.get('SERVER_HOST', '0.0.0.0')
    try:
        PORT = int(environ.get('SERVER_PORT', '5000'))
    except ValueError:
        PORT = 5000

    app.run(HOST, debug=True, port=PORT, threaded=True)