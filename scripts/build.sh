#!/bin/bash

frontendVersion=$(jq -r '.version' frontend/package.json)
backendVersion=$(cat backend/VERSION)

docker build -t ghcr.io/benlewsey27/react-weather:$frontendVersion ./frontend 
docker build -t ghcr.io/benlewsey27/react-weather-api:$backendVersion ./backend 
