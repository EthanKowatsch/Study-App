// Save dom elements
const todoName = document.getElementById("new-todo");
const todoDate = document.getElementById("todoDate");
const addTodoBtn = document.getElementById("add-todo");
const todoOutputList = document.querySelector(".todo-output-list");

// Function to save the new todo to local storage
function saveTodoToLocalStorage(todoData) {
  const todos = getTodosFromLocalStorage();
  todos.push(todoData);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get todos from local storage
function getTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

// Function to display todos from local storage
function displayTodos() {
  const todos = getTodosFromLocalStorage();
  todoOutputList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoRow = document.createElement("div");
    todoRow.classList.add("todo-row");

    // Create a div for the checkbox
    const todoCheckboxDiv = document.createElement("div");
    todoCheckboxDiv.classList.add("todo-checkbox-div");
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.completed || false;
    todoCheckbox.classList.add("todo-checkbox");
    todoCheckbox.onclick = () => toggleTodoCompletion(index);
    todoCheckboxDiv.appendChild(todoCheckbox);

    // Create a div for the todo name
    const todoNameCell = document.createElement("div");
    todoNameCell.classList.add("todo-name");
    todoNameCell.textContent = todo.name;
    if (todo.completed) {
      todoNameCell.classList.add("completed");
    }

    // Create a div for the date added
    const todoDateAddedCell = document.createElement("div");
    todoDateAddedCell.classList.add("todo-date-added");
    todoDateAddedCell.textContent = todo.dateAdded;

    // Create a div for the due date
    const todoDueDateCell = document.createElement("div");
    todoDueDateCell.classList.add("todo-due-date");
    todoDueDateCell.textContent = todo.dueDate;

    // Create a div for the remove button
    const removeTodoCell = document.createElement("div");
    removeTodoCell.classList.add("remove-todo");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "X";
    removeButton.onclick = () => removeTodoFromLocalStorage(index);
    removeTodoCell.appendChild(removeButton);

    // Append all cells to the todoRow
    todoRow.appendChild(todoCheckboxDiv);
    todoRow.appendChild(todoNameCell);
    todoRow.appendChild(todoDateAddedCell);
    todoRow.appendChild(todoDueDateCell);
    todoRow.appendChild(removeTodoCell);

    todoOutputList.appendChild(todoRow);
  });
}

// Function to toggle the completion of a todo item
function toggleTodoCompletion(index) {
  const todos = getTodosFromLocalStorage();
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}

// Function to remove a todo from local storage
function removeTodoFromLocalStorage(index) {
  const todos = getTodosFromLocalStorage();
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
  showAlert("To-do successfully removed.", "error");
}

// Event listener to add a new todo when the button is clicked
addTodoBtn.addEventListener("click", function () {
  const todoNameValue = todoName.value.trim();
  const todoDueDateValue = todoDate.value;
  
  // Get today's date, in local time, formatted as YYYY-MM-DD
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight to avoid time comparison issues
  const todayString = today.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format

  if (!todoNameValue || !todoDueDateValue) {
    showAlert("Please enter both a to-do name and a due date.", "error");
    return;
  }

  if (new Date(todoDueDateValue) < new Date(todayString)) {
    showAlert("Please enter a valid due date (future date).", "error");
    return;
  }

  const newTodo = {
    name: todoNameValue,
    dateAdded: todayString,
    dueDate: todoDueDateValue,
    completed: false,
  };

  saveTodoToLocalStorage(newTodo);
  displayTodos();
  showAlert("To-do successfully added.", "success");
  todoName.value = "";
  todoDate.value = "";
});

// Function to display alerts
function showAlert(message, type = "success", duration = 2000) {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("alert-message");

  alertMessage.textContent = message;

  if (type === "success") {
    alertBox.style.backgroundColor = "#4caf50";
    alertBox.style.color = "white";
  } else if (type === "error") {
    alertBox.style.backgroundColor = "#dc3545";
    alertBox.style.color = "white";
  }

  alertBox.classList.remove("hidden");
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("hidden");
  }, duration);
}

// Display todos on page load
displayTodos();
