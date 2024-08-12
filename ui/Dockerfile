# Stage 1: Build the Angular app
FROM node:20-alpine AS build

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine

# Install gettext package which provides envsubst
RUN apk add --no-cache gettext

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html



# Create a directory for the config file
RUN mkdir -p /usr/share/nginx/html/config

# Copy the initial config.js and the shell script
COPY src/config/config.js /usr/share/nginx/html/config/config.js
COPY substitute_env.sh /usr/share/nginx/html/

# Grant execution permissions to the script
RUN chmod +x /usr/share/nginx/html/substitute_env.sh

# Set environment variables
ENV IMAGE_VERSION=""
ENV API_URL=""

# Expose port for Nginx
EXPOSE 80

# Command to run the environment substitution script and start Nginx
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/substitute_env.sh && nginx -g 'daemon off;'"]
