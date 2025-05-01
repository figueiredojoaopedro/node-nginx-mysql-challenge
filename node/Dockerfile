FROM node:22-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN apk add --no-cache wget tar && \
  wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
  tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
  rm dockerize-linux-amd64-v0.6.1.tar.gz

EXPOSE 3000

CMD sh -c "dockerize -wait tcp://db:3306 -timeout 30s && node index.js"