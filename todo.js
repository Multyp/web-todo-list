const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById('taskDate').value;

    if (taskText === '') {
        alert("Please enter a task.");
        return;
    }
    if (taskDate === '') {
        alert("Please enter a date.");
        return;
    }

    const listItem = createTaskElement(taskText, taskDate);
    taskList.appendChild(listItem);

    taskInput.value = '';
    saveTaskToLocalStorage(taskText, taskDate);
}


function createTaskElement(taskText, taskDate) {
    const listItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    const dateSpan = document.createElement('span');
    const deleteBtn = document.createElement('button');

    taskSpan.textContent = taskText;
    dateSpan.textContent = taskDate;
    deleteBtn.textContent = 'Delete';

    listItem.appendChild(taskSpan);
    listItem.appendChild(dateSpan);
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        removeTaskFromLocalStorage(taskText, taskDate);
    });

    return listItem;
}

function saveTaskToLocalStorage(taskText, taskDate) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, date: taskDate });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText, taskDate) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => !(task.text === taskText && task.date === taskDate));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks ? tasks : [];
}

function loadTasksFromLocalStorage() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.date);
        taskList.appendChild(listItem);
    });
}

loadTasksFromLocalStorage();
