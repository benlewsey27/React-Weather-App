const axios = require("axios");

const health = (req, res) => {
  res.status(200).send();
}

const getWeatherData = async (city, apiKey) => {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`);
  return response;
}

const getTemp = async (req, res) => {
  console.log('Invoking getTemp...');
  const apiKey = process.env.WEATHER_API_KEY;
  const { city } = req.params;

  console.log(`Getting tempature for city ${city}...`);

  let weatherData;
  try {
    weatherData = await module.exports.getWeatherData(city, apiKey);
  } catch (err) {
    console.log(err);
    return res.status(500).send("ERROR: Failed to retrive weather data");
  }

  const temp = Math.round((weatherData.data.main.temp - 273.15) * 10) / 10;
  const formatCity = (city) => city.charAt(0).toUpperCase() + city.slice(1);

  console.log('Request successful!');
  res.status(200).send({
    city: formatCity(city),
    temp,
  });
}

module.exports = {
  health,
  getTemp,
  getWeatherData,
}