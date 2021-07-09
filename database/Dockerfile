FROM mysql

RUN mkdir /data

COPY ./data /data

COPY ./scripts /docker-entrypoint-initdb.d 

EXPOSE 3306