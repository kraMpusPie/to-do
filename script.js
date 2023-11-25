const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');

let tasks = [];

const loadTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    tasks = storedTasks;
    renderTasks();
  }
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;

  tasks.push({
    text: taskText,
    completed: false
  });

  newTaskInput.value = '';
  renderTasks();
  saveTasks();
};

const toggleCompleted = (index) => {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  saveTasks();
};

const editTask = (index, newText) => {
  tasks[index].text = newText;
  renderTasks();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
};

const renderTasks = () => {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;

    if (task.completed) {
      taskTextElement.classList.add('completed');
    }

    taskElement.appendChild(taskTextElement);

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.classList.add('completed-button');
    completeButton.addEventListener('click', () => {
      toggleCompleted(index);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null) {
        editTask(index, newText.trim());
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    taskElement.appendChild(completeButton);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    taskList.appendChild(taskElement);
  });
};

loadTasks();
addTaskButton.addEventListener('click', addTask);
