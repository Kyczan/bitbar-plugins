const { google } = require('googleapis')
const { format } = require('date-fns')
const { pl } = require('date-fns/locale')
const isToday = require('date-fns/isToday')
const isTomorrow = require('date-fns/isTomorrow')
const isSameDay = require('date-fns/isSameDay')

// for how many days fetch events
const NUMBER_OF_DAYS = 4

const getBoundaryDates = () => {
  const today = new Date()
  const d = today.getDate()
  const m = today.getMonth()
  const y = today.getFullYear()

  const timeMin = today.toISOString();
  const timeMax = (new Date(y, m, d + NUMBER_OF_DAYS + 1, 0, 0, 0, 0)).toISOString()

  const allDays = []
  allDays.push(today)
  for (let i = 0; i < NUMBER_OF_DAYS; i++) {
    allDays.push(new Date(y, m, d + i + 1, 0, 0, 0, 0))
  }

  return {timeMin, timeMax, allDays}
}

const listEvents = async auth => {
  const { timeMin, timeMax, allDays } = getBoundaryDates()
  // connect to google calendar api
  const calendar = google.calendar({version: 'v3', auth});
  // get list of active calendars
  const calendarListResponse = await calendar.calendarList.list();
  const calendarList = calendarListResponse.data.items  
  const allEvents = []
  
  // get events from active calendars
  await Promise.all(
    calendarList.map(async cal => {
      const eventsResponse = await calendar.events.list({
        calendarId: cal.id,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime'
      })
      const events = eventsResponse.data.items;
      allEvents.push(...events)
    })
  )

  allEvents.sort((a, b) => {
    const startA = a.start.dateTime || a.start.date
    const startB = b.start.dateTime || b.start.date
    return (startA < startB) ? -1 : ((startA > startB) ? 1 : 0)
  })

  console.log('[🗓]')
  console.log('---')
  
  allDays.map(day => {
    let formatString = 'd MMMM (EEEE)'
    if (isToday(day)) {
      formatString = "'Dzisiaj' (EEEE)"
    } else 
    if (isTomorrow(day)) {
      formatString = "'Jutro' (EEEE)"
    }
    console.log(format(day, formatString, {locale: pl}))

    allEvents.map(event => {
      const startTime = event.start.dateTime
      const eventDate = startTime ? new Date(startTime) : new Date(event.start.date)
      if(isSameDay(day, eventDate)) {
        const start = startTime ? format(new Date(startTime), 'HH:mm ', {locale: pl}) : ''
        const summary = event.summary
        const cal = event.organizer.displayName
        const result = `${start}${summary} (${cal}) | color=black`
        console.log(result)
      }
    })
    console.log('---')
  })
}

module.exports = listEvents
