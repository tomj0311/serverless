FROM ubuntu:18.04

RUN apt-get -y update
RUN apt-get -y upgrade
# RUN apt-get install build-essential 
# RUN apt-get install wget cmake git libgtk2.0-dev pkg-config 
# RUN apt-get install libavcodec-dev libavformat-dev libswscale-dev
# RUN apt-get install libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev
RUN apt-get install -y libgtk2.0-dev python3-dev python3-pip 
RUN apt-get install -y python-flask

#Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#Copy requirements.txt to leverage docker cache
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install -r requirements.txt
COPY . /app
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]