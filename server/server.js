const express = require('express'); // require express
const path = require('path'); // require the path 
const app = express(); // have a variable to invoke express
const PORT = 3000; // have a port to be listening on

app.use(express.json()); // convert everything to json

// add potential routes to our server
app.get('/reminders', (req, res) => {
  // return res.status(200) and send the response
})
app.post('/reminders', (req, res) => {
  // return res.status(200) and send the response
})
app.delete('/reminders/:id', (req, res) => {  // <-- deletes specific id
  // return res.status(200) and send the response
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