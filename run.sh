#!/bin/bash

echo "Pulling new image..."

docker login -u $DOCKER_USER -p $DOCKER_PWD

docker pull obinnaelobi/safezone:latest

docker-compose up -d
