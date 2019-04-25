FROM mcr.microsoft.com/azure-functions/python:2.0

ENV AzureFunctionsJobHost__Logging__Console__IsEnabled=true

ENV http_proxy http://esiproxy:8080
ENV https_proxy https://esiproxy:8080

RUN apt-get update && apt-get install -y \
    libgtk2.0-dev \
    python-opencv 

RUN cat /etc/os-release

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    pip install -r requirements.txt --proxy=http://esiproxy:8080