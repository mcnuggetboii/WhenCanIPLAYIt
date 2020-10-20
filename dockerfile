FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install --unsafe-perm
EXPOSE 8080 3000 3030
CMD npm run deploy