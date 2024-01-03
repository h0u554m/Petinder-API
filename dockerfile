FROM registry.semaphoreci.com/node:18
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY . .
RUN rm -rf node_modules
RUN npm install
RUN npm uninstall bcrypt && npm install bcrypt
EXPOSE 3000
CMD [ "npm", "start"]
