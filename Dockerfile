FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
ENV DB_HOST=localhost
ENV DB_USER=myUser
ENV DB_PASS=myPassword
ENV JWT_SECRET=your_secret_key
ENV NODE_ENV=dev
ENV MONGODB_URI_DEV=mongodb://username:password@mongodb-service.liel-app.svc.cluster.local:27017/mydatabase
ENV MONGODB_URI_PROD=mongodb://username:password@mongodb-service.liel-app.svc.cluster.local:27017/mydatabase
ENV PORT=3000
RUN npm install -g nodemon
COPY package.json package-lock.json .
RUN npm install 
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev"]
