# docker.webpack

#FROM debian:jessie
FROM mhart/alpine-node:7.5.0


WORKDIR /app
COPY . /app

RUN apk update && \
    apk upgrade && \
    apk add git
RUN npm install webpack -g
RUN npm install
RUN npm run build
#CMD webpack --watch --watch-polling
CMD npm run start
