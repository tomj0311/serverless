from applicationinsights import TelemetryClient


class Logger:
    def __init__(self):
        tc = TelemetryClient('fda25b68-18b4-4277-b206-83f90a945a59')
        tc.context.application.ver = '1.0.0'

        self._logger = tc

    def log_exception(self, exception, props=None, measurement=None):
        self._logger.track_exception(value=exception, properties=prop)
        self._logger.flush()

    def log_event(self, message, props=None, measurement=None):
        self._logger.track_event(message, properties=props, 
                                 measurements=measurement)
        self._logger.flush()

    def log_debug(self, message, props=None):
        self._logger.track_trace(message, properties=props, severity='DEBUG')
        self._logger.flush()
