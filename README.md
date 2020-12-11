# React Weather

Aim: Create a sample project using React.js and OpenWeatherMap API.

[![](./docs/MainPage.png)](#)

## Overview

React Weather uses two docker containers:

- React Frontend (using NGINX Reverse Proxy)
- Express Backend

## Requirements

- A Current Weather Data API Key from [Open Weather Map](https://openweathermap.org/)

## Running Locally

Run the below in the terminal:

```bash
export WEATHER_API_KEY={OpenWeatherMap API Key}

docker-compose build
docker-compose up

# Open on http://localhost:8000
```

## Kubernetes Deployment

1. Ensure there is a running kubernetes cluster.
2. Ensure there are docker images in a container registry (e.g. Docker Hub or ECR).
3. Create a secret kubernetes config with OpenWeatherMap API Key (find example in the secret-example.yml file).
4. To create the environment, run:

```
kubectl apply -f ./deploy/shared/secret.yml
kubectl apply -f ./deploy/<local or aws>/backend.yml
kubectl apply -f ./deploy/<local or aws>/frontend.yml
```

5. To destroy the environment, run:

```
kubectl delete -f ./deploy/shared/secret.yml
kubectl delete -f ./deploy/<local or aws>/backend.yml
kubectl delete -f ./deploy/<local or aws>/frontend.yml
```

Note: In steps 4 and 5, choose local or aws depending on required method.

## Roadmap
- [x] Deploy application to local kubernetes cluster
- [x] Deploy application to cloud-based kubernetes cluster (AWS EKS)
- [ ] Create CI/CD pipeline to build and push images

