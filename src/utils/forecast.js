const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a269b01c4f1ac1897fb92aa02e326d43&query=${latitude},${longitude}&units=f`

  request({ url, json: true}, (error, { body }) => {
    // Remove response because we are using response.body so destructure
    if (error) {
      callback('Could not connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location within Weather API', undefined)
    } else {
      callback(undefined, `It is currently ${body.current.temperature} degrees outside.`)
    }
  })
}

module.exports = forecast