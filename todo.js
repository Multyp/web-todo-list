const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert("Veuillez entrer une tâche à faire.");
        return;
    }

    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);

    taskInput.value = '';
    saveTaskToLocalStorage(taskText);
}

function createTaskElement(taskText) {
    const listItem = document.createElement('li');
    const taskSpan = document.createElement('span');
    const deleteBtn = document.createElement('button');

    taskSpan.textContent = taskText;
    deleteBtn.textContent = 'Delete';

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        removeTaskFromLocalStorage(taskText);
    });

    return listItem;
}

function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    const index = tasks.indexOf(taskText);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return tasks ? tasks : [];
}

function loadTasksFromLocalStorage() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => {
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
    });
}

loadTasksFromLocalStorage();