FROM node:latest
# Copy first only package.json for make use of Docker layers
# Please see: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
ADD package*.json ./
RUN npm install
# Add whole App
ADD . .
# Expose the port
EXPOSE 3001
CMD node app.js