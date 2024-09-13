// Wait for the DOM content to be fully loaded before running the loadTodos function
document.addEventListener("DOMContentLoaded", loadTodos);

// Add a click event listener to the "add-todo" button that calls the addTodo function when clicked
document.getElementById("add-todo").addEventListener("click", addTodo);

// Function to add a new to-do item
function addTodo() {
  // Get the input element where the user types the new to-do text
  var todoInput = document.getElementById("new-todo");

  // Retrieve the value from the input field and trim any leading/trailing whitespace
  var todoText = todoInput.value.trim();

  // Check if the trimmed text is not empty
  if (todoText !== "") {
    // Get the current date and format it to only show the date (without time)
    var currentDate = new Date().toLocaleDateString();

    // Add the new to-do item to the DOM and set it as not completed
    addTodoItemToDOM(todoText, false, currentDate);

    // Save the new to-do item to local storage
    saveTodoToLocal(todoText, false, currentDate);

    // Clear the input field after adding the to-do
    todoInput.value = "";
  }
}

// Function to add a to-do item to the DOM
function addTodoItemToDOM(todoText, completed, dateAdded) {
  // Get the unordered list element where to-do items are listed
  var todoList = document.getElementById("todo-list");

  // Create a new list item element
  var listItem = document.createElement("li");
  // Assign a class name for styling purposes
  listItem.className = "todo-item";

  // Create a checkbox input element for marking the to-do as completed
  var checkbox = document.createElement("input");
  // Set the checkbox type to 'checkbox'
  checkbox.type = "checkbox";
  // Set the checkbox state based on whether the task is completed
  checkbox.checked = completed;
  // Add an event listener to toggle completion state when the checkbox changes
  checkbox.addEventListener("change", function () {
    toggleComplete(this);
  });

  // Create a span element to display the to-do text
  var span = document.createElement("span");
  // Set the text content of the span to the provided to-do text
  span.textContent = todoText;
  // Apply the appropriate style based on whether the task is completed
  updateTodoStyle(span, completed);

  // Create a span element to display the date when the task was added
  var dateSpan = document.createElement("span");
  // Set the text content to the formatted date
  dateSpan.textContent = dateAdded;
  // Apply styles to the date span for color and italics
  dateSpan.style.color = "grey";
  dateSpan.style.fontStyle = "italic";
  // Assign a class name for styling and responsive behavior
  dateSpan.className = "todo-date";

  // Create a button element to remove the to-do item
  var removeButton = document.createElement("button");
  // Set the button text to "X"
  removeButton.textContent = "X";
  // Add an event listener to remove the to-do item when the button is clicked
  removeButton.addEventListener("click", function () {
    removeTodoItem(this);
  });

  // Append the checkbox and text span to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(span);

  // Append the date span and remove button next to each other
  var rightSideContainer = document.createElement("div");
  rightSideContainer.className = "right-side-container";
  rightSideContainer.appendChild(dateSpan);
  rightSideContainer.appendChild(removeButton);

  // Append the right side container to the list item
  listItem.appendChild(rightSideContainer);

  // Append the list item to the to-do list in the DOM
  todoList.appendChild(listItem);
}

// Function to remove a to-do item from the DOM and local storage
function removeTodoItem(button) {
  // Get the parent list item of the clicked remove button
  var listItem = button.parentElement.parentElement;

  // Get the text content of the to-do item
  var todoText = listItem.querySelector("span").textContent;

  // Remove the list item from the DOM
  listItem.remove();

  // Remove the to-do item from local storage
  removeTodoFromLocal(todoText);
}

// Function to toggle the completion state of a to-do item
function toggleComplete(checkbox) {
  // Get the parent list item of the checkbox
  var listItem = checkbox.parentElement;

  // Get the span element containing the to-do text
  var span = listItem.querySelector("span");

  // Determine the completion state based on the checkbox state
  var completed = checkbox.checked;

  // Update the style of the to-do item based on its completion state
  updateTodoStyle(span, completed);

  // Update the completion state of the to-do item in local storage
  updateTodoCompletionInLocal(span.textContent, completed);
}

// Function to update the style of a to-do item based on its completion state
function updateTodoStyle(span, completed) {
  // If the to-do item is completed, apply a line-through decoration and gray color
  if (completed) {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
  } else {
    // Otherwise, remove the line-through decoration and set the color to black
    span.style.textDecoration = "none";
    span.style.color = "black";
  }
}

// Function to save a to-do item to local storage
function saveTodoToLocal(todoText, completed, dateAdded) {
  // Retrieve existing to-dos from local storage, or initialize an empty array
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Add the new to-do item with its text, completion state, and date to the array
  todos.push({ text: todoText, completed: completed, date: dateAdded });

  // Save the updated array back to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to remove a to-do item from local storage
function removeTodoFromLocal(todoText) {
  // Retrieve existing to-dos from local storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Filter out the to-do item that matches the provided text
  todos = todos.filter((todo) => todo.text !== todoText);

  // Save the updated array back to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to update the completion state of a to-do item in local storage
function updateTodoCompletionInLocal(todoText, completed) {
  // Retrieve existing to-dos from local storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Update the completion state of the to-do item that matches the provided text
  todos = todos.map((todo) =>
    todo.text === todoText ? { ...todo, completed: completed } : todo
  );

  // Save the updated array back to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load all to-do items from local storage when the page loads
function loadTodos() {
  // Retrieve existing to-dos from local storage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  // For each to-do item, add it to the DOM with the correct completion state and date
  todos.forEach((todo) => {
    // Ensure only valid to-dos with a text property are processed
    if (typeof todo.text === "string") {
      addTodoItemToDOM(todo.text, todo.completed, todo.date);
    }
  });
}
