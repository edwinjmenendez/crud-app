// make fetch requests to get all the data from the backend
const getReminders = () => {
  fetch('/reminders')
  .then(response => response.json())
  .then(reminders => { // reminders = array of objects
    const list = document.getElementById('list');
    list.innerHTML = ''; // reset the length of the list so it doesnt keep adding
    reminders.forEach(reminder => {
      addItem(reminder)
    })
  })
  .catch(err => console.log('error in fetching reminders:', err))
}
getReminders();
document.getElementById('refresh').addEventListener('click', getReminders);

// make fetch request to add a reminder to the list
document.getElementById('reminderInput').addEventListener('submit', (e) => {
  e.preventDefault(); // prevents the automatic refresh and prevents from having that weird post request url encoded
  const reminderText = document.getElementById('reminderText');
  // set the body up for the fetch request in json format
  const body = {
    text: reminderText.value
  }
  if (!body.text) return; // if text is empty return undefined
  fetch('/reminders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(reminder => {
    reminderText.value = ''; // reset text value
    addItem(reminder)
  })
  .catch(err => console.log(err))
})

const addItem = (reminder) => {
  const newLi = document.createElement('li') // creates a new <li></li>
  newLi.id = reminder._id // creates id attribute to newLi and assign it to id from db
  newLi.innerText = reminder.text // sets the text inside of <li> to the text value from db
  const button = document.createElement('button')
  button.innerText = 'DELETE'
  button.addEventListener('click', () => {
    fetch(`/reminders/${reminder._id}`, {
      method: 'DELETE',
    })
    .then(res => res.json()) // or res.json()
    .then(res => {
      console.log(res)
      document.getElementById('list').removeChild(newLi);
    })
    .catch(err => console.log(err))
  })
  newLi.appendChild(button);
  list.appendChild(newLi) // appends the newLi into the list element 
}


// make fetch request to delete a reminder to the list