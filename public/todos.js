var todosContainer = document.querySelector('#todos')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)

todoButton.addEventListener('click', addTodo)

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value

    var body = {
        todo: todoTask,
        completed: false
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodo)
}

function getTodos() {
    fetch('http://localhost:3000/api/v1/todos')
    .then(response => response.json())
    .then(loopTodos)
}

function loopTodos(todos) {
    todosContainer.innerHTML = ''
    todos.forEach(showTodo)
}

function showTodo(todo) {
    var todoTemplate = `<li class="list-group-item">${todo.todo}</li>`
                    
    todosContainer.innerHTML = todoTemplate + todosContainer.innerHTML
}
