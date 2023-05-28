# edit tag to proper version
FROM node:alpine as builder
# build directory. If changed, also change copy command
WORKDIR /app
# upload app source
COPY ./ /app/
ENV HOME=/app
# arg for nexus publish control
#ARG NPM_PUBLISH
# arg for sonar scan control
#ARG SONAR_ARGS
# arg for json-server (mock server) control
#ARG STUB_ARGS
# clear cache, install deps and run artefact build
RUN npm cache verify && npm install && npm run build

RUN npm install pm2 -g


# command to run
ENTRYPOINT ["npm", "run", "start:onvm"]



