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

## Roadmap
- [x] Deploy application to local kubernetes cluster
- [ ] Deploy application to cloud-based kubernetes cluster
- [ ] Create CI/CD pipeline to build and push images
