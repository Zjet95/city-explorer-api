'use strict';

console.log('Server Online');
//** Requires */
const express = require('express');
require('dotenv').config();
//const data = require("./data/weather.json");
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules.movies');
const app = express();
//** MIDDLEWARE */
//** cors is used as a security guard that allows us to share resources across the internet. */
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});



app.get('/weather', getWeather);

app.get('/movie', getMovies);



app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

app.use((error, request, response) => {
  response.status(404).send(error.message);
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));

