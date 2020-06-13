const db = require('../models/db');

const reminderController = {};

reminderController.addReminder = (req, res, next) => { // cant display each add on postman for some reason
  const { text } = req.body;
  const params = [ text ]; // has to be in an array to be accepted in query string
  const queryStr = `INSERT INTO reminders (text) VALUES ($1) RETURNING *;`;
  db.query(queryStr, params)
  .then((reminderData) => {
    console.log(reminderData)
    res.locals.reminders = reminderData.rows[0];
    return next();
  })
  .catch((err) => {
    console.log(err)
    return next(err);
  })
}

reminderController.getReminder = (req, res, next) => {

}

reminderController.deleteReminder = (req, res, next) => {

}

module.exports = reminderController;