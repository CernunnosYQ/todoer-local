const new_todo = document.getElementById('new-todo');
const new_title = document.getElementById('new-todo-title');
const todo_submit = document.getElementById('new-todo-submit');

const todo_list = document.getElementById('todo-list');

const todos = JSON.parse(localStorage.getItem('todos')) || [];
let nextID = JSON.parse(localStorage.getItem('nextID')) || 0;

window.addEventListener("DOMContentLoaded", () => {
  renderHTML();
  new_todo.onsubmit = (e) => {
    e.preventDefault();
    createTodo();
  }
})

function createTodo() {
  let todo = [nextID, false, new_title.value];
  nextID += 1;
  todos.push(todo);

  new_title.value = '';
  
  saveTodos();
  renderHTML();
}

function renderHTML() {
  const todo_template = todos.map(t => {
    return '<li class="c-todo"><input id="completed-' + t[0] + '" class="c-todo__completed' + 
      (t[1] ? ' is-completed" checked="true"' : '" ') + 'type="checkbox">' +
      '<label for="completed-'+ t[0] +'" class="c-todo__title">' + t[2] + '</label>' +
      '<button class="c-todo__delete"><i class="fas fa-trash"></i></button></li>'
  })

  todo_list.innerHTML = todo_template.join('');

  const delete_todo = document.querySelectorAll('.c-todo__delete');

  delete_todo.forEach((elemento, i) => {
    elemento.onclick = () => {
      todos.splice(i, 1);
      saveTodos();
      renderHTML();
    }
  })

  const completed = document.querySelectorAll('.c-todo__completed');

  completed.forEach((elemento, i) => {
    elemento.addEventListener('change', function () {
      if (this.checked && !this.classList.contains('is-completed')) {
        todos[i][1] = true;
      } else if (!this.checked && this.classList.contains('is-completed')) {
        todos[i][1] = false;
      }
      saveTodos();
    })
  })
}

function saveTodos() {
  const todoString = JSON.stringify(todos);
  const nextIDString = JSON.stringify(nextID);
  localStorage.setItem('todos', todoString);
  localStorage.setItem('nextID', nextIDString);
}