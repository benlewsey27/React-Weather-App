# React Weather

Aim: Create a sample project using React.js and OpenWeatherMap API.

[![](./docs/MainPage.png)](#)

## Overview

React Weather uses three docker containers:

- React Frontend
- Express Backend
- NGINX Reverse Proxy

:warning:You will need a Current Weather Data API Key from [Open Weather Map](https://openweathermap.org/) to use this service.

## Running Locally

Run the below in the terminal:

```bash
export WEATHER_API_KEY={OpenWeatherMap API Key}

docker-compose build
docker-compose up

# Open on http://localhost:8000
```
