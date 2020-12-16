console.log('Client side javascript file is loaded')

// Variables:
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// Fetch weather
const fetchWeather = (location) => {
  fetch('http://localhost:3000/weather?address='+ location)
  .then((res) => {
    res.json().then( ( { error, location, forecast } ) => {
      if (error) {
        messageOne.textContent = error
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    } )
  })
}
// Form Submit
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  if (location) {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '
  }

  fetchWeather(location)
})