const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forcast');


const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Dan'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Dan'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'help',
    title: 'Help',
    name: 'Dan'
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({error: "Please provide an address"});
  }

  geocode(req.query.address, (error, {long, lat, location} = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  });


});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dan',
    errorMessage: "Help page missing"
  })
});


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dan',
    errorMessage: "Page missing"
  })
});

app.listen(port, () => {
  console.log('server is up on ' + port)
});
