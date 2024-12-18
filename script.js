
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

document.getElementById('main_btn').addEventListener('click', () => {
    const name = document.getElementById('text-name').value;
    const date = document.getElementById('text-date').value;
    const priority = document.getElementById('priority').value;

    if (name && date && priority !== "Priority") {
        todoList.push({ name, date, priority, completed: false });
        localStorage.setItem('todoList', JSON.stringify(todoList)); 
        loadTasks();
        document.getElementById('text-name').value = "";
        document.getElementById('text-date').value = "";
        document.getElementById('priority').value = "Priority";
    } else {
        alert("Please fill out all fields!");
    }
});

function loadTasks() {
    const today = new Date().toISOString().split('T')[0];
    const todayTasksContainer = document.querySelector('.today-tasks-container');
    const futureTasksContainer = document.querySelector('.future-tasks-container');
    const completedTasksContainer = document.querySelector('.completed-tasks-container');

    todayTasksContainer.innerHTML = '';
    futureTasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';

    let todaySerial = 1;
    let futureSerial = 1;
    let completedSerial = 1;

    todoList.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.style.backgroundColor = 'white';
            taskElement.style.color = 'black';
            taskElement.style.border = '1px solid black';
        }

        taskElement.innerHTML = `
            <div class="loaded-tasks">
                <div class="task-sno">${task.completed ? completedSerial++ : (task.date === today ? todaySerial++ : futureSerial++)}.</div>
                <div>${task.name}</div>
                <div>${task.date}</div>
                <div>${task.priority}</div>
            </div>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = `<img src="trash 1.svg" alt="Delete" class="delete-icon">`;
        if (task.completed) {
            deleteBtn.style.backgroundColor = 'white';
            deleteBtn.innerHTML = `<img src="trash 2.svg" alt="Delete" class="delete-icon">`;
            deleteBtn.style.border = 'none'
        }
        deleteBtn.addEventListener('click', () => {
            todoList.splice(index, 1); 
            localStorage.setItem('todoList', JSON.stringify(todoList)); 
            loadTasks(); 
        });

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggle-btn');
        if (task.completed) {
            toggleBtn.style.backgroundColor = 'white';
            toggleBtn.style.color = 'black';
            toggleBtn.style.border = 'none'
        }
        toggleBtn.innerHTML = task.completed 
            ? 'Undo' 
            : `<img src="check-circle 1.svg" alt="Complete" class="complete-icon">`;

        toggleBtn.addEventListener('click', () => {
            task.completed = !task.completed; 
            localStorage.setItem('todoList', JSON.stringify(todoList)); 
            loadTasks(); 
        });

        taskElement.appendChild(toggleBtn);
        taskElement.appendChild(deleteBtn);

        if (task.completed) {
            completedTasksContainer.appendChild(taskElement);
        } else if (task.date === today) {
            todayTasksContainer.appendChild(taskElement);
        } else {
            futureTasksContainer.appendChild(taskElement);
        }
    });
}

loadTasks();
