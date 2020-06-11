require('../config')()
const axios = require('axios')

const installationId = process.env.AIRLY_INSTALLATION_ID
const apiKey = process.env.AIRLY_API_KEY
const url = `https://airapi.airly.eu/v2/measurements/installation?indexType=AIRLY_CAQI&installationId=${installationId}&apikey=${apiKey}`

const app = async () => {
  try {
    const { data } = await axios.get(url)
    // get current CAQI
    let { value } = data.current.indexes[0]
    value = Math.round(value)
    const desc = `[🌱 ${value}]`

    console.log(desc)
  } catch (error) {
    console.error('ERR')
  }
}

module.exports = app
