FROM node:16
WORKDIR /app
RUN apt-get update
RUN apt-get install -y sqlite3
RUN mkdir -p /app/data
COPY ./package*.json /app
COPY ./*.js /app
COPY ./config-dev.json /app
COPY ./schema/ddl.sql /app/ddl.sql
RUN npm install
RUN echo "You can provide some initialization for sqlite3 database"
RUN sqlite3 /app/data/people.dat < /app/ddl.sql
CMD node /app/index.js /app/config-dev.json
