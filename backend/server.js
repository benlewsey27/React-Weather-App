const express = require("express");
const axios = require("axios");

require("dotenv").config();
const app = express();

app.get("/api/v1/get-temperature/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  let weatherData;
  try {
    weatherData = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
    );
  } catch (err) {
    return res.status(500).send("ERROR: Failed to retrive weather data");
  }

  const temperature =
    Math.round((weatherData.data.main.temp - 273.15) * 10) / 10;

  const formatCity = (city) => city.charAt(0).toUpperCase() + city.slice(1);

  res.send({
    city: formatCity(city),
    temperature,
  });
});

app.listen(3001, () => console.log("Backend listening on port 3001..."));
