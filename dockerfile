# docker.webpack

#FROM debian:jessie
FROM mhart/alpine-node:7.5.0


WORKDIR /app
COPY . /app

#RUN apt-get update
#RUN apt-get install curl -y
#RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install nodejs -y
RUN apk update && \
    apk upgrade && \
    apk add git
RUN npm install webpack -g
RUN npm install
RUN npm run build
#CMD webpack --watch --watch-polling
CMD npm run start
