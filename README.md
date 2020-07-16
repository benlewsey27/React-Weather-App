# React Weather

Aim: Create a sample project using React.js and OpenWeatherMap API.

[![](./docs/MainPage.png)](#)

## Overview

React Weather uses three docker containers:

- React Frontend
- Express Backend
- NGINX Reverse Proxy

**Known Issues**

- React Build cannot use environment variables as it uses static render (.env file is used)

## Run Local

1. Create a .env file and store in the backend directory. It's contents should be as below:

```
WEATHER_API_KEY={ OpenWeatherMap API Key }
```

2. Run the below in the terminal:

```bash
docker-compose build
docker-compose up

# Open on http://localhost:8000
```

This project was created with [Create React App](https://github.com/facebook/create-react-app).
