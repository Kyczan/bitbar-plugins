require('../config')()
const fs = require('fs');
const path = require('path')

const authorize = require('./src/authorize')
const listEvents = require('./src/listEvents')

const CREDENTIALS_PATH = path.join(__dirname, './secrets/credentials.json')

const app = () => {
  // Load client secrets from a local file.
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
  });
}

module.exports = app
