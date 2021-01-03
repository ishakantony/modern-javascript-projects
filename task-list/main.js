const addForm = document.querySelector('#task-form')
const taskInput = document.querySelector('#task')
const filterTaskInput = document.querySelector('#task-filter')
const taskList = document.querySelector('#task-list')
const clearAllTasksButton = document.querySelector('#clear-all-tasks')

loadEventListeners()

init()

function init() {
  const tasks = getTasksFromLocalStorage()

  tasks.forEach(({ id, task }) => {
    const taskEl = createTaskElement(id, task)

    taskList.appendChild(taskEl)
  })
}

function loadEventListeners() {
  addForm.addEventListener('submit', addTask)

  taskList.addEventListener('click', deleteTask)

  filterTaskInput.addEventListener('keyup', filterTasks)

  clearAllTasksButton.addEventListener('click', clearAllTasks)
}

function addTask(e) {
  e.preventDefault()

  if (taskInput.value === '') {
    alert('Please input a task')
    return
  }

  const id = Date.now()
  const task = taskInput.value

  const taskEl = createTaskElement(id, task)

  addTaskToLocalStorage(id, task)
  taskList.appendChild(taskEl)

  addForm.reset()
}

function createTaskElement(id, task) {
  const li = document.createElement('li')

  li.classList.add('collection-item')
  li.dataset.id = id

  const div = document.createElement('div')
  div.textContent = task

  const button = document.createElement('a')

  button.classList.add('secondary-content')

  const i = document.createElement('i')

  i.classList.add('fas')
  i.classList.add('fa-trash')

  button.appendChild(i)
  div.appendChild(button)
  li.appendChild(div)

  return li
}

function deleteTask(e) {
  e.preventDefault()

  if (e.target.parentElement.nodeName.toLowerCase() !== 'a') return

  if (!confirm('Are you sure you?')) return

  const elementToDelete = e.target.parentElement.parentElement.parentElement

  deleteTaskFromLocalStorage(elementToDelete.dataset.id)

  elementToDelete.remove()
}

function filterTasks(e) {
  const value = e.target.value

  document.querySelectorAll('.collection-item').forEach((el) => {
    if (el.firstElementChild.textContent.indexOf(value) === -1)
      el.style.display = 'none'
    else el.style.display = 'block'
  })
}

function clearAllTasks(e) {
  e.preventDefault()

  if (!confirm('Are you sure?')) return

  while (taskList.firstElementChild) taskList.firstElementChild.remove()

  localStorage.clear()
}

function deleteTaskFromLocalStorage(idToDelete) {
  const tasks = getTasksFromLocalStorage()

  if (tasks.length === 0) return

  const newTasks = tasks.filter(({ id }) => id !== +idToDelete)

  localStorage.setItem('tasks', JSON.stringify(newTasks))
}

function addTaskToLocalStorage(id, task) {
  const tasks = getTasksFromLocalStorage()

  const taskObj = { id, task }

  tasks.push(taskObj)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasksFromLocalStorage() {
  let tasks

  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

  if (!tasksFromLocalStorage) tasks = []
  else tasks = tasksFromLocalStorage

  return tasks
}
