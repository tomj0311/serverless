FROM ubuntu:18.04

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y libgtk2.0-dev python3-dev python3-pip 
RUN apt-get install -y python-flask

#Cache requirements.txt 
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn
COPY . /app

EXPOSE 8000
CMD ["gunicorn", "--config", "./conf/gunicorn_config.py", "app:application"] 

#Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
