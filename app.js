//selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//functions
function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  const todoText = document.createElement("li");
  todoText.innerText = todoInput.value;
  //save to local storage
  saveToLocalStorage(todoInput.value);
  todoText.classList.add("todo-text");
  todoDiv.appendChild(todoText);

  const markedTodo = document.createElement("button");
  markedTodo.innerHTML = `<i class="fa-solid fa-check"></i>`;
  markedTodo.classList.add("todo-check-btn");
  todoDiv.appendChild(markedTodo);

  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteTodoBtn.classList.add("todo-delete-btn");
  todoDiv.appendChild(deleteTodoBtn);

  todoList.appendChild(todoDiv);
}

//delete or check function
function deleteCheck(e) {
  const item = e.target;

  //delete mark
  if (item.classList[0] === "todo-delete-btn") {
    const element = item.parentElement;
    element.remove();
    deleteTodos(element);
  }

  //check mark
  if (item.classList[0] === "todo-check-btn") {
    const element = item.parentElement;
    const todoTextItem = item.previousSibling;
    console.log(todoTextItem);
    element.classList.toggle("completed");
    todoTextItem.classList.toggle("opacity-reduced");
  }
}

function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    const todoText = document.createElement("li");
    todoText.innerText = todo;

    todoText.classList.add("todo-text");
    todoDiv.appendChild(todoText);

    const markedTodo = document.createElement("button");
    markedTodo.innerHTML = `<i class="fa-solid fa-check"></i>`;
    markedTodo.classList.add("todo-check-btn");
    todoDiv.appendChild(markedTodo);

    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteTodoBtn.classList.add("todo-delete-btn");
    todoDiv.appendChild(deleteTodoBtn);

    todoList.appendChild(todoDiv);
  });
}

function deleteTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
