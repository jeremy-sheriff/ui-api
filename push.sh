#!/bin/bash

# Define the image names and tags
EXPRESS_API_IMAGE="muhohoweb/express-api"
ANGULAR_UI_IMAGE="muhohoweb/angular-ui"
TAG="1.0.1"

# Build the Docker images (optional, if not already built)
echo "Building Docker images..."
docker-compose build

# Tag the images (optional, if already tagged in the docker-compose.yml)
 docker tag api $EXPRESS_API_IMAGE:$TAG
 docker tag ui $ANGULAR_UI_IMAGE:$TAG

# Push the Express API image to Docker Hub
echo "Pushing $EXPRESS_API_IMAGE:$TAG to Docker Hub..."
docker push $EXPRESS_API_IMAGE:$TAG

# Push the Angular UI image to Docker Hub
echo "Pushing $ANGULAR_UI_IMAGE:$TAG to Docker Hub..."
docker push $ANGULAR_UI_IMAGE:$TAG

# Confirmation message
echo "Images have been pushed to Docker Hub."
