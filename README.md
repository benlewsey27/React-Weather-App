# React Weather

Aim: Create a sample project using React.js and OpenWeatherMap API.

[![](./docs/MainPage.png)](#)

## Overview

React Weather uses 3 docker containers:

- React Frontend
- Express Backend (Coming Soon)
- NGINX Reverse Proxy

**Known Issues**

- API Key is exposed in Developer Tools > Network (A backend will be used to hide mask request)
- React Build cannot use environment variables as it uses static render (.env file is used)

## Run Local

1. Create a .env file and store in the frontend directory. It's contents should be as below:

```
REACT_APP_WEATHER_API_KEY={ OpenWeatherMap API Key }
```

2. Run the below in the terminal:

```bash
docker-compose build
docker-compose up

# Open on https://localhost:8000
```

This project was created with [Create React App](https://github.com/facebook/create-react-app).
