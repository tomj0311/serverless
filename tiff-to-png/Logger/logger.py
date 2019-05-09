from applicationinsights import TelemetryClient


class Logger:
    def __init__(self):
        tc = TelemetryClient('ec8d6f29-4b41-4c17-b64e-7d6201100d32')
        tc.channel.sender.send_interval_in_milliseconds = 30 * 1000
        tc.context.application.ver = '1.0.0'

        self._logger = tc

    def log_exception(self, exception, props=None):
        self._logger.track_exception(value=exception, properties=props)

    def log_event(self, message, props=None):
        self._logger.track_event(message, properties=props)
        self._logger.flush()

    def log_debug(self, message, props=None):
        self._logger.track_trace(message, properties=props, severity='DEBUG')
        self._logger.flush()
