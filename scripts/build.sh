#!/bin/bash

backendVersion=$(cat backend/VERSION)
frontendVersion=$(jq -r '.version' frontend/package.json)

docker build -t ghcr.io/benlewsey27/react-weather-backend:$backendVersion ./backend 
docker build -t ghcr.io/benlewsey27/react-weather-frontend:$frontendVersion ./frontend 
