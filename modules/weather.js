'use strict';

const axios = require('axios');

let cache = {};

async function getWeather(request, response, next) {

  try {
    let latitude = request.query.lat;
    let longitude = request.query.lon;
    let key = `${latitude}, ${longitude}Forecast`;
    if (cache[key] && (Date.now() - cache[key].timeStamp) < 10000) {
      console.log('Weather Cache hit!');
      response.status(200).send(cache[key].data);
    } else {
      console.log('No Weather Cache');

      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&days=5&units=I`;
      let weatherData = await axios.get(url);


      let groomWeather = weatherData.data.data;

      let dataToSend = groomWeather.map((day) => new Forecast(day));

      cache[key] = {
        data: dataToSend,
        timeStamp: Date.now()
      };

      response.status(200).send(dataToSend);

    }


  } catch (error) {
    next(error);
  }
}



class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
}




module.exports = getWeather;

