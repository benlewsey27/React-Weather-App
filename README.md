# React Weather

Aim: Create a sample project using React.js and OpenWeatherMap API.

[![](./docs/MainPage.png)](#)

## Run Local

**If using .env run below:**

```bash
set -a && source .env
docker-compose build
docker-compose up

# Open on https://localhost:5000
```

**Otherwise use:**

```bash
export REACT_APP_WEATHER_API_KEY = <OPEN WEATHER MAP API KEY>
docker-compose build
docker-compose up

# Open on https://localhost:5000
```

This project was created with [Create React App](https://github.com/facebook/create-react-app).
