FROM node:16-alpine3.16
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/
RUN npm install
COPY . /src/app
EXPOSE 3000
CMD [ "npm", "start" ]