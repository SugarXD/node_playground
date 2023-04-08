FROM node:18-alpine
ARG installDevDependencies=false
WORKDIR /app
COPY . .
RUN if [ "$installDevDependencies" = "false" ] ; then npm ci --production; else npm ci; fi
RUN apk update && apk add
CMD ["npm", "start"]
EXPOSE 3000