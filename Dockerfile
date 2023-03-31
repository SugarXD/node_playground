FROM node:18-alpine
ARG installDevDependencies=false
WORKDIR /app
COPY . .
RUN if ["$installDevDependencies" = "false"] ; then npm ci --production; else npm ci; fi
RUN apt-get update && apt-get install -y bash
CMD ["npm", "start"]
EXPOSE 3000