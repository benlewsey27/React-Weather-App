const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/get-temp/:city", async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const { city } = req.params;

  let weatherData;

  try {
    weatherData = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
    );
  } catch (err) {
    return res.status(500).send("ERROR: Failed to retrive weather data");
  }

  const temp = Math.round((weatherData.data.main.temp - 273.15) * 10) / 10;

  const formatCity = (city) => city.charAt(0).toUpperCase() + city.slice(1);

  res.send({
    city: formatCity(city),
    temp,
  });
});

app.listen(3001, () => console.log("Backend listening on port 3001..."));
