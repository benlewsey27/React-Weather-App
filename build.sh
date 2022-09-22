#!/bin/bash

echo $GITHUB_TOKEN | docker login ghcr.io -u benlewsey27 --password-stdin

backendVersion=$(jq -r '.version' backend/package.json)
frontendVersion=$(jq -r '.version' frontend/package.json)

docker build -t ghcr.io/benlewsey27/react-weather-backend:$backendVersion ./backend 
docker build -t ghcr.io/benlewsey27/react-weather-frontend:$frontendVersion ./frontend 

docker push ghcr.io/benlewsey27/react-weather-backend:$backendVersion
docker push ghcr.io/benlewsey27/react-weather-frontend:$frontendVersion

docker rmi ghcr.io/benlewsey27/react-weather-backend:$backendVersion
docker rmi ghcr.io/benlewsey27/react-weather-frontend:$frontendVersion
