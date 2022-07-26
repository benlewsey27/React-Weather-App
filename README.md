# React Weather

Aim: Create a sample project using React.js and OpenWeatherMap API.

<img src='./docs/MainPage.png' alt='React Weather Display'>

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

## Helm Deployment

A Helm chart has been created for deploying this project to a Kubernetes environment. 

Example deployment instructions can be found [here](./docs/deployment-notes.md).
