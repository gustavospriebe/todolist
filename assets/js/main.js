// DOM
const inputTask = document.querySelector('.inputTask');
const button = document.querySelector('.button');
const tasks = document.querySelector('.tasks');
const cleanButton = document.querySelector('.clean');

// Cria uma nova tarefa
function createTasks(input) {
    const li = createLI();
    li.innerText = input;
    tasks.appendChild(li);
    createCleanButton(li);
    cleanInput();
    saveTasks();
}

// Cria uma linha dentro da lista que estão as tarefas
function createLI() {
    const li = document.createElement('li');
    return li;
}

// Após criar uma tarefa, zera o texto do input
function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
}

// Cria um botão de apagar para cada tarefa
function createCleanButton(li) {
    li.innerText += ' ';
    const cleanButton = document.createElement('button');
    cleanButton.innerText = 'Limpar';
    cleanButton.setAttribute('class', 'clean');
    li.appendChild(cleanButton);
}

// Salva as tarefas de forma a armazenar em formato JSON
function saveTasks() {
    const liTasks = tasks.querySelectorAll('li')
    const listOfTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Limpar', '').trim();
        listOfTasks.push(taskText);
    }

    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('tasks', tasksJSON);
}

// Função que posibilita dar F5 e não perder a lista
function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks);

    for (let task of listOfTasks) {
        createTasks(task);
    }
}
loadTasks();


// Evento de criar tarefas apertando no enviar
button.addEventListener('click', function() {
    if(!inputTask.value) return;
    createTasks(inputTask.value);
})

// Evento de criar tarefas apertando Enter
inputTask.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if(!inputTask.value) return;
    createTasks(inputTask.value);
    }
})

// Evento de apagar tarefas apertando no Limpar
document.addEventListener('click', (e) => {
    const element = e.target;
    if (element.classList.contains('clean')) {
        element.parentElement.remove();
    }
    saveTasks();
})