const db = require('../models/db');

const reminderController = {};

reminderController.addReminder = (req, res, next) => { // cant display each add on postman for some reason
  const { text } = req.body;
  const params = [ text ]; // has to be in an array to be accepted in query string
  const queryStr = `INSERT INTO reminders (text) VALUES ($1) RETURNING *;`;
  db.query(queryStr, params)
  .then((reminderData) => {
    // console.log(reminderData)
    res.locals.reminders = reminderData.rows[0];
    return next();
  })
  .catch((err) => {
    console.log(err)
    return next(err);
  })
}

reminderController.getReminder = (req, res, next) => {
  console.log('getReminders middlware');
  console.log(req.body);
  const queryStr = `SELECT * FROM reminders;`;
  db.query(queryStr)
  .then(reminderData => {
    res.locals.reminders = reminderData.rows;
    return next();
  })
  .catch(err => {
    console.log(err);
    return next(err);
  })
}

reminderController.deleteReminder = (req, res, next) => {
  console.log('deleteReminders middlware')
  const { id } = req.params;
  const params = [ id ];
  const queryStr = `DELETE FROM reminders WHERE _id=$1 RETURNING *`
  db.query(queryStr, params)
  .then(reminderData => {
    res.locals.reminders = reminderData.rows[0];
    return next();
  })
  .catch(err => {
    console.log(err)
    return next(err);
  })
}

module.exports = reminderController;