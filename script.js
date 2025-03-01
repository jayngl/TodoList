// Project: To-Do List Application
// Goal: Build a to-do list app where you can add, edit, delete, and check off tasks.
// Skills: Arrays, loops, objects, DOM manipulation, event listeners.
// Time: 4 days
// Learning Focus: Arrays, for loops, filter, map, and basic DOM updates.

const todoContainer = document.getElementById("todoContainer");
const todoInput = document.getElementById("todoInput");

// todo bluePrint class
class todo {
  constructor(todoString, todoDate, isComplete) {
    this.todoString = todoString;
    this.todoDate = todoDate;
    this.isComplete = isComplete;
  }
}

// todo array container
const todos = JSON.parse(localStorage.getItem("todo")) || [];

// function to add todo to todo array container
const addTodo = (e) => {
  if (todoInput.value !== "") {
    let key = e.key;
    if (key === "Enter") {
      let todoVal = todoInput.value;

      const time = todoDate();
      const todoItem = new todo(todoVal, time, false);
      todos.push(todoItem);
      localStorage.setItem("todo", JSON.stringify(todos));
      refresh();
    }
  }
};

//  add todo
todoInput.addEventListener("keydown", addTodo);

// timestamp function
const todoDate = () => {
  const date = new Date();
  let hour = date.getHours();
  let meridiam = hour >= 12 ? "PM" : "AM";

  hour = hour >= 12 ? hour % 12 : hour;
  let minute = date.getMinutes();
  return `${hour}:${minute} ${meridiam}`;
};

let clickCounter = 0;
// display todos
const displayTodo = () => {
  const docFrag = document.createDocumentFragment();
  todos.forEach((todo, index) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    const checkTodo = document.createElement("INPUT");
    checkTodo.setAttribute("type", "checkbox");
    const todoText = document.createElement("p");
    const todoTimeStamp = document.createElement("p");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    checkTodo.classList.add("checkbox");

    checkTodo.addEventListener("click", () => {
      checkOffTodo(index);
    });

    // make ckeck functionality persistent after reload
    if (todos[index].isComplete === true) {
      checkTodo.checked = true;
      todoText.classList.add("checked");
    } else {
      checkTodo.checked = false;
      todoText.classList.remove("checked");
    }

    todoText.classList.add("todoString");
    todoText.textContent = todo.todoString;
    todoTimeStamp.textContent = todo.todoDate;

    editBtn.innerHTML = " &#9998;";

    editBtn.addEventListener("click", () => {
      clickCounter++;
      todoInput.removeEventListener("keydown", addTodo);
      todoInput.focus();
      editBtn.innerHTML = "&#128190;";

      if (clickCounter % 2 === 0) {
        editBtn.innerHTML = "&#9998;";
        if (todoInput.value !== "") {
          editTodo(index);
          clickCounter = 0;
        }
        // console.log(clickCounter);
      }
    });
    deleteBtn.innerHTML = "&#128465;";

    deleteBtn.addEventListener("click", () => {
      deleteTodo(index);
    });

    todoCard.append(checkTodo, todoTimeStamp, todoText, editBtn, deleteBtn);
    docFrag.append(todoCard);
    todoContainer.append(docFrag);
  });
};

displayTodo();

// refresh function

const refresh = () => {
  todoContainer.innerHTML = "";
  todoInput.value = "";
  displayTodo();
};

// edit todoItem

const editTodo = (index) => {
  todos[index].todoString = todoInput.value;
  todos[index].todoDate = `Edited:${todoDate()}`;

  refresh();
  localStorage.setItem("todo", JSON.stringify(todos));
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todos));
  refresh();
};

// check off tasks
const checkOffTodo = (index) => {
  const checkbox = document.querySelectorAll(".checkbox");
  const todoString = document.querySelectorAll(".todoString");

  if (checkbox[index].checked === true) {
    todoString[index].classList.add("checked");
    todos[index].isComplete = true;
    localStorage.setItem("todo", JSON.stringify(todos));
  } else {
    todoString[index].classList.remove("checked");
    todos[index].isComplete = false;

    localStorage.setItem("todo", JSON.stringify(todos));
  }
};

// checkOffTodo();
// localStorage.clear();
