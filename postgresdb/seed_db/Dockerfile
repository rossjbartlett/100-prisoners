FROM python:3.8-slim

WORKDIR /usr/src/app

# TODO not sure why, installing packages directly works
# but not when installing from requirements.txt
# get error building wheel
RUN pip install numpy==1.19.0
RUN pip install influxdb==5.3.0
RUN pip install pandas==1.0.5

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

COPY load_data.py .
COPY data.csv .

CMD [ "python", "./load_data.py" ]