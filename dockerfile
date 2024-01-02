FROM registry.semaphoreci.com/node:18
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY / .
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

EXPOSE 3000
CMD [ "npm", "start"]