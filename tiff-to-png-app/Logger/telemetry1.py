from applicationinsights import TelemetryClient
tc = TelemetryClient('fda25b68-18b4-4277-b206-83f90a945a59')
tc.context.application.ver = '1.2.3'
tc.context.device.id = 'My current device'
tc.context.device.oem_name = 'Asus'
tc.context.device.model = 'X31A'
tc.context.device.type = "Other"
tc.context.user.id = 'santa@northpole.net'
tc.track_trace('My trace with context')
tc.flush()