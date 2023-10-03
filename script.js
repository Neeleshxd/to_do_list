class TaskItem {
  constructor(task, hours, priority, reminder, dueDate) {
    this.task = task;
    this.hours = hours;
    this.priority = priority;
    this.reminder = reminder;
    this.dueDate = dueDate;
    this.completed = false;
  }
}

class TodoList {
  constructor() {
    this.taskList = [];
  }

  addTask(taskItem) {
    this.taskList.push(taskItem);
  }

  removeTask(index) {
    this.taskList.splice(index, 1);
  }

  getTaskList() {
    return this.taskList;
  }
}

const todoList = new TodoList();

const taskInput = document.getElementById('task');
const hoursInput = document.getElementById('hours');
const priorityInput = document.getElementById('priority');
const reminderInput = document.getElementById('reminder');
const dueDateInput = document.getElementById('due-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const highlightList = document.getElementById('highlight-list');
const imageUpload = document.getElementById('image-upload');
const createHighlightButton = document.getElementById('create-highlight');
const motivationQuotesList = document.getElementById('motivation-quotes-list');
const highlightOfTheDayList = [];
const backgroundMusic = new Audio('background-music.mp3');
const calendarDays = document.querySelector('.calendar-days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const calendarMonthYear = document.getElementById('calendar-month-year');
const date = new Date();

addTaskButton.addEventListener('click', function () {
  const task = taskInput.value;
  const hours = hoursInput.value;
  const priority = priorityInput.value;
  const reminder = reminderInput.value;
  const dueDate = dueDateInput.value;

  if (task && hours && priority && reminder && dueDate) {
    const taskItem = new TaskItem(task, hours, priority, reminder, dueDate);
    todoList.addTask(taskItem);
    displayTasks();
    clearInputFields();
  }
});

function generateCalendarDays() {
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let daysHtml = "";

  for (let i = 1; i <= daysInMonth; i++) {
    daysHtml += `<div class="calendar-day">${i}</div>`;
  }

  calendarDays.innerHTML = daysHtml;
  updateCalendarMonthYear();
}

generateCalendarDays(); // Call the generateCalendarDays function to generate the calendar days when the page loads

function displayTasks() {
  taskList.innerHTML = '';
  const taskItems = todoList.getTaskList();
  for (let i = 0; i < taskItems.length; i++) {
    const taskItem = taskItems[i];
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');
    if (taskItem.priority === 'high') {
      taskElement.classList.add('high');
    } else if (taskItem.priority === 'medium') {
      taskElement.classList.add('medium');
    } else if (taskItem.priority === 'low') {
      taskElement.classList.add('low');
    }
    if (taskItem.hours === 0 || taskItem.completed) {
      taskElement.classList.add('completed');
    }
    const taskText = document.createElement('span');
    taskText.textContent = taskItem.task;
    const hoursText = document.createElement('span');
    hoursText.textContent = taskItem.hours + ' hours';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function () {
      todoList.removeTask(i);
      displayTasks();
    });
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', function () {
      taskItem.completed = true;
      displayTasks();
    });
    const dueDateText = document.createElement('span');
    dueDateText.classList.add('due-date');
    dueDateText.textContent = 'Due: ' + taskItem.dueDate;
    taskElement.appendChild(taskText);
    taskElement.appendChild(hoursText);
    taskElement.appendChild(dueDateText);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);
  }
}

function clearInputFields() {
  taskInput.value = '';
  hoursInput.value = '';
  priorityInput.value = 'high';
  reminderInput.value = '';
  dueDateInput.value = '';
}

darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

createHighlightButton.addEventListener('click', function () {
  const imageFile = imageUpload.files[0];

  if (imageFile) {
    const highlightOfTheDay = {
      image: imageFile
    };

    highlightOfTheDayList.push(highlightOfTheDay);

    displayHighlights();

    imageUpload.value = '';
  }
});

function displayHighlights() {
  highlightList.innerHTML = '';
  const highlightImages = document.createElement('div');
  highlightImages.classList.add('highlight-images');
  for (let i = 0; i < highlightOfTheDayList.length; i++) {
    const highlightImage = document.createElement('img');
    highlightImage.classList.add('highlight-image');
    highlightImage.src = URL.createObjectURL(highlightOfTheDayList[i].image);
    highlightImages.appendChild(highlightImage);
  }
  highlightList.appendChild(highlightImages);
}

// Add an array of motivation quotes
const motivationQuotes = [
  'Believe you can and you\'re halfway there. -Theodore Roosevelt',
  'I can\'t change the direction of the wind, but I can adjust my sails to always reach my destination. -Jimmy Dean',
  'Perfection is not attainable, but if we chase perfection we can catch excellence. -Vince Lombardi',
  'Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy. -Norman Vincent Peale',
  'If you can dream it, you can achieve it. -Zig Ziglar'
];

function displayMotivationQuote() {
  const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
  const motivationQuote = document.createElement('li');
  motivationQuote.textContent = motivationQuotes[randomIndex];
  motivationQuotesList.appendChild(motivationQuote);
}

displayMotivationQuote(); // Display a random motivation quote when the page loads
backgroundMusic.play(); // Play the background music when the page loads

prevMonthButton.addEventListener('click', function () {
  date.setMonth(date.getMonth() - 1);
  generateCalendarDays();
});

nextMonthButton.addEventListener('click', function () {
  date.setMonth(date.getMonth() + 1);
  generateCalendarDays();
});

function updateCalendarMonthYear() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  calendarMonthYear.textContent = monthName + ' ' + year;
}

updateCalendarMonthYear(); // Call the updateCalendarMonthYear function to display the current month and year when the page loads