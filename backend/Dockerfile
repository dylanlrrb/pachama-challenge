FROM python:slim

RUN mkdir /backend

WORKDIR /backend

COPY . /backend

EXPOSE 5000

RUN pip install -r requirements.txt

CMD ["python", "app.py"]