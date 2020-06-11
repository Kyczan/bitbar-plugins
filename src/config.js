const path = require('path')

const envPath = path.join(__dirname, '../.env')

const config = () => {
  require('dotenv').config({path: envPath})
}

module.exports = config
