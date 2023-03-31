FROM node:18-alpine
ARG installDevDependencies=false
WORKDIR /app
COPY . .
RUN if [ "$installDevDependencies" = "false" ] ; then npm ci --production; else npm ci; fi
RUN apt-get update && apt-get install --no-install-recommends -y bash \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
CMD ["npm", "start"]
EXPOSE 3000