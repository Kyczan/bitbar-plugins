require('../config')()
const axios = require('axios')

const cityId = process.env.WEATHER_CITY_ID
const apiKey = process.env.WEATHER_API_KEY
const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`

const getIcon = data => {
  const { id, icon } = data.weather[0]

  if (id === 800) { // clear sky
    if (icon === '01n') { 
      return '🌙' // night
    }
    return '☀️' // day
  }
  
  const icons = [
    '',
    '',
    '🌩', // 2xx - storm
    '☔️', // 3xx - drizzle
    '',
    '☔️', // 5xx - rain
    '❄️', // 6xx - snow
    '🌫', // 7xx - fog
    '☁️', // 8xx - clouds
    ''
  ]
  const idx = Math.floor(id/100.0)

  return icons[idx]
}

const app = async () => {
  try {
    const { data } = await axios.get(url)
    const { main, description } = data.weather[0]
    let { temp } = data.main
    temp = Math.round(temp)

    const desc = `[${getIcon(data)} ${temp}℃]`

    console.log(desc)
    console.log('---')
    console.log(`${main}: ${description}`)
  } catch (error) {
    console.error('ERR')
  }
}

module.exports = app
