const path = require('path');
const express = require('express') // Express is a function
const hbs = require('hbs');
const { handlebars } = require('hbs');
const { countReset } = require('console');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log('Directory Name: ', __dirname)
// console.log('Current Filename: ', __filename)

const app = express() // Doesn't take any any arguments. Instead configure server by using methods on app
const port = process.env.PORT || 3000 //HEROKU PORT or default to 3000
//Define paths for Express
const publicDirectory = path.join(__dirname, '../public')
// Handlebars expects "views" folder in root. Changed it to "template" for demostration
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// SET ALLOWS TO SET VALUE FOR EXPRESS SETTING. In this case adjustings for express' "view engine"
// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // set "views" as the path set above
hbs.registerPartials(partialsPath) // configure/register partials path


// Way to customize server
// Setup static directory to serve.
app.use(express.static(publicDirectory))
// express.static is a function  to take path to folder to serve

//App takes in two arguments. Route and function where describe what to do with route.
// app.get('/about', (req, res) => {
//   res.send('<h2>About Title Page</h2>')
// })

// USE RENDER TO RENDER OUT A PAGE TO THE SCREEN WITH DATA FOR RIGHT NOW
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ryan Frazier'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ryan Frazier'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is my help messge!',
    title: 'Help',
    name: 'Ryan Frazier'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address to the API. '
    })
  }
  // Call to geocode to get address and weather
  geocode(req.query.address, (error, { latitude, longitude, location } ={} ) => {
    if (error) {
      return res.send({ error })
    }

    forecast( latitude, longitude, (error, forecastData ) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})
// app.get('/products', (req, res) => {
//   // With Express, you can only do "res.send" once per handlebars. So that is why we had to put return  in the if
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term'
//     })
//   }

//   console.log(req.query.search)
//   res.send({
//     products: []
//   })
// })


// Wildcard catch for things off the /help url
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ryan Frazier',
    error: 'Help Article Not Found.'
  })
})


// 404 page configuration MUST be last in request in Express. Because express goes down from top to bottom
// * is a wildcard character to catch anything that isn't defined
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ryan Frazier',
    error: 'Page Not Found'
  })
})

// To start the server. Only used once on an app. Second argument is optional
// Taking the port number from either Heroku or the default of 3000 above.
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
