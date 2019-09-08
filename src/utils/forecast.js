const request = require('request');

const forecast = (lattitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/04cd91151c7f7a30a7f32b160a426831/' + lattitude + ',' + longitude + '?units=si';

  request({url, json : true} , (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather api.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })

}

module.exports = forecast;