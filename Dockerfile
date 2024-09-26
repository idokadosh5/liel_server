FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
ENV JWT_SECRET=ec9f9c8a6a3a5f4b8b4c2a9d6d7e1e2b7a1f9c3e7b9a4e6d4b5c1f9a2d6b8f3
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
