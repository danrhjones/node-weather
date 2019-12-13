const request = require('request');

const weather = (lat, long, callback) => {

  const url = 'https://api.darksky.net/forecast/f16da2194bca61ce51b1b203c24edf2c/' + lat + ',' + long;

  request({url: url, json: true}, (error, {body}) => {
    if (error) {
      callback('unable to connect weather service', undefined)
    } else if (body.error) {
      callback('unable to find location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary +
          ' It is currently ' + body.currently.temperature +
          ' degress out. There is a '
          + body.currently.precipProbability + '% chance of rain.')

    }
  });
};

module.exports = weather

