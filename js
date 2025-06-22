const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-tasks');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
clearBtn.addEventListener('click', clearAllTasks);

// Add a task
function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = '';
}

// Create task DOM element
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => createTaskElement(task));
}

// Delete a task
function deleteTask(e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.parentElement;
    removeTaskFromLocalStorage(li.textContent.replace('Delete', '').trim());
    li.remove();
  }
}

// Remove from localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearAllTasks() {
  if (confirm('Are you sure you want to clear all tasks?')) {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
  }
}
