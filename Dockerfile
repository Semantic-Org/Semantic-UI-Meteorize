FROM node:7.2
RUN apt-get -y update && apt-get -y upgrade && rm -rf /var/cache/apt/*
RUN npm install -g gulp
USER node
RUN curl https://install.meteor.com/ | sh
RUN echo "PATH=/home/node/.meteor:$PATH" >> ~/.bashrc
WORKDIR /app
