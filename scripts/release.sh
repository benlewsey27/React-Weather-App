#!/bin/bash

echo $GITHUB_TOKEN | docker login ghcr.io -u benlewsey27 --password-stdin

frontendVersion=$(jq -r '.version' frontend/package.json)
backendVersion=$(cat backend/VERSION)

docker push ghcr.io/benlewsey27/react-weather:$frontendVersion
docker push ghcr.io/benlewsey27/react-weather-api:$backendVersion
