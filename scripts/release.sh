#!/bin/bash

echo $GITHUB_TOKEN | docker login ghcr.io -u benlewsey27 --password-stdin

backendVersion=$(cat backend/VERSION)
frontendVersion=$(jq -r '.version' frontend/package.json)

docker push ghcr.io/benlewsey27/react-weather-backend:$backendVersion
docker push ghcr.io/benlewsey27/react-weather-frontend:$frontendVersion

docker rmi ghcr.io/benlewsey27/react-weather-backend:$backendVersion
docker rmi ghcr.io/benlewsey27/react-weather-frontend:$frontendVersion
