const express = require('express'); // require express
const path = require('path'); // require the path 
const app = express(); // have a variable to invoke express
const PORT = 3000; // have a port to be listening on

const reminders = require('./controllers/reminderController'); // after setting up the controller, add routes to each middleware
app.use(express.json()); // convert everything to json


// serve static files to display on browser; index.js and styles.css

// way 1
// app.get('/assets/index.js', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, '../client/assets/index.js'))
// })
// app.get('/assets/styles.css', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../client/assets/styles.css'))
// })
// way 2
app.use('/assets', express.static(path.join(__dirname, '../client/assets'))); // serves index.js and css

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/index.html')) // renders html file
})


// add potential routes to our server
app.get('/reminders', reminders.getReminder, (req, res) => {
  return res.status(200).json(res.locals.reminders);
})
app.post('/reminders', reminders.addReminder, (req, res) => {
  return res.status(200).json(res.locals.reminders);
})
app.delete('/reminders/:id', reminders.deleteReminder, (req, res) => {  // <-- deletes specific id
  return res.status(200).json(res.locals.reminders);
})

// add error handlers
app.use('*', (req, res) => {
  return res.status(404).send('PAGE NOT FOUND')
})
app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500);
})
// listen to our server and listen on a port
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})