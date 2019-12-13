const request = require('request');

const geocode = (address, callback) => {
  const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address)
      + ".json?access_token=pk.eyJ1IjoiZGFuam9uemkiLCJhIjoiY2s0MnU4NDNvMDB6ODNrbXl4cWxxbTRhYSJ9.c9o3pe3cbQWKdEkeDjESoA&limit=1";

  request({url: mapUrl, json: true}, (error, {body}) => {
    if (error) {
      callback('unable to connect mapping service', undefined)
    } else if (body.features.length === 0) {
      callback('unable to find location, try another location', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }

  });
};

module.exports = geocode
