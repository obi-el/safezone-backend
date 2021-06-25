#!/bin/bash

sudo apt-get install -y sshpass

echo "Building New safezone image"

docker build -t obinnaelobi/safezone:latest .

echo "Copying docker-compose file to server"

sshpass -p "$SSH_PWD" scp docker-compose.yml root@safezone1.fyre.ibm.com:~/
sshpass -p "$SSH_PWD" scp run.sh root@safezone1.fyre.ibm.com:~/

echo "Pushing image..."

docker login -u $DOCKER_USER -p $DOCKER_PWD

docker push obinnaelobi/safezone:latest

#echo "ssh into machine and run new image"

#sshpass -p "$SSH_PWD" ssh root@safezone1.fyre.ibm.com 'export DOCKER_USER="$DOCKER_USER"; export DOCKER_PWD="$DOCKER_PWD"; cd ~; chmod +x run.sh; ./run.sh'
