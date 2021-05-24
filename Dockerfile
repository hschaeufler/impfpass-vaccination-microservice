ARG VERSION=latest
FROM node:${VERSION}
ARG PORT=3000
ARG NODEENV=production
ENV NODE_ENV=$NODEENV
ENV PORT=$PORT
# Copy first only package.json for make use of Docker layers
# Please see: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
ADD package*.json ./
RUN npm install
# Add whole App
ADD . .
# Expose the port
EXPOSE ${PORT}
CMD node app.js