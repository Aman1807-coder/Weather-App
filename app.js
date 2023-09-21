const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {

    const query = req.body.cityName;
    const apiKey = "98db56240ec573a434e88b27a6f1a4bf";
    const unit = "metric";
    const url = 'https://api.openweathermap.org/data/2.5/weather?appid='+apiKey+'&q='+query+'&units='+unit;
    https.get(url, (response) => {
        response.on('data', (data) => {
            // console.log(data); //it will give data in hexadecimal format
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(`<p> ${weatherDescription} Weather </p>`);
            res.write(`<h1>The Temperature of ${query} is ${temp} degree celcius</h1>`);
            res.write(`<img src=${imgURL} />`);
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("Server Running at Port 3000");
});