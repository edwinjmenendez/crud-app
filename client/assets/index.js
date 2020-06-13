// make fetch requests to get all the data from the backend
const getReminders = () => {
  fetch('/reminders')
  .then(response => response.json())
  .then(reminders => { // reminders = array of objects
    const list = document.getElementById('list');
    list.innerHTML = ''; // reset the length of the list so it doesnt keep adding
    reminders.forEach(reminder => {
      const newLi = document.createElement('li') // creates a new <li></li>
      newLi.id = reminder._id // creates id attribute to newLi and assign it to id from db
      newLi.innerText = reminder.text // sets the text inside of <li> to the text value from db
      list.appendChild(newLi) // appends the newLi into the list element 

    })
  })
  .catch(err => console.log('error in fetching reminders:', err))
}
getReminders();

document.getElementById('refresh').addEventListener('click', getReminders);