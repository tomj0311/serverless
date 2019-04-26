FROM mcr.microsoft.com/azure-functions/python:2.0

# to log errors to the console
ENV AzureFunctionsJobHost__Logging__Console__IsEnabled=true

# Importnat to install libgtk for opencv
RUN apt-get update && apt-get install -y \
    libgtk2.0-dev 

# Find OS and version of the liinux image
# RUN cat /etc/os-release

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    pip install -r requirements.txt --proxy=http://esiproxy:8080