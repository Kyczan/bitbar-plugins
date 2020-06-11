require('../config')()
const axios = require('axios')
const capitalize = require('capitalize')

const [ engine, scriptPath, selectedWebhook ] = process.argv
const apiKey = process.env.SONOFF_API_KEY
const webhooks = [
  'bedroom_on',
  'bedroom_off',
  'bedroom_lamp_on',
  'bedroom_lamp_off',
  'hall_on',
  'hall_off',
  'kitchen_on',
  'kitchen_off',
  'wc_on',
  'wc_off',
  'living_on',
  'living_off',
  'living_lamp_on',
  'living_lamp_off'
];

const getUrl = webhook => `https://maker.ifttt.com/trigger/${webhook}/with/key/${apiKey}`

const createLink = webhook => {
  const name = capitalize.words(webhook.split('_').join(' '))
  console.log(`${name} | bash=${scriptPath} param1=${webhook} terminal=false`)
}

const fireWebhook = webhook => {
  axios.get(getUrl(webhook))
}

const app = () => {
  if (selectedWebhook) {
    fireWebhook(selectedWebhook)
    return
  }

  console.log('[💡]');
  console.log('---');
  webhooks.forEach(webhook => {
    createLink(webhook);
  });
}

module.exports = app
