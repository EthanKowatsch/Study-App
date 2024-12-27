// Function to format text inside the contenteditable div
function formatText(command) {
  document.execCommand(command, false, null);
}

// Toggle between numbered list and plain text
function toggleNumberedList() {
  document.execCommand("insertOrderedList", false, null);
}

// Add behavior for pressing Enter
const notesEditor = document.getElementById("notes-editor");

// Load notes from localStorage when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedNotes = localStorage.getItem("notes");
  const lastAction = localStorage.getItem("lastAction");

  if (savedNotes) {
    notesEditor.innerHTML = savedNotes;
  }

  if (lastAction) {
    document.getElementById("lastUpdated").textContent = `Last Action: ${lastAction}`;
  }
});

// Event listener for save and clear
document.getElementById("save-notes").addEventListener("click", () => {
  const notes = notesEditor.innerHTML;
  localStorage.setItem("notes", notes);
  showAlert("Notes successfully saved.", "success");
  updateLastAction();
});

document.getElementById("clear-notes").addEventListener("click", () => {
  notesEditor.innerHTML = "";
  localStorage.setItem("notes", "");
  showAlert("Notes successfully cleared.", "error");
  updateLastAction();
});

// Update the last action timestamp
function updateLastAction() {
  const currentTime = formatDate(new Date());
  document.getElementById("lastUpdated").textContent = `Last Action: ${currentTime}`;
  localStorage.setItem("lastAction", currentTime);
}

// Format date and time
function formatDate(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return `${formattedTime} on ${formattedDate}`;
}

// Function to show a custom alert with a color based on the type
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

// Add behavior for tab key to indent list items
notesEditor.addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    e.preventDefault(); // Prevent default tab behavior
    
    // Get the current selection in the editor
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const currentNode = range.startContainer;

    // Only indent if the current node is a list item (dot jot)
    if (currentNode.nodeName === "LI" && currentNode !== currentNode.closest("ol, ul").firstElementChild) {
      // Add the tab (indent) by modifying the margin or padding of the list item
      currentNode.style.marginLeft = "20px";
    }
  }
});

// Initial render when the page loads
displaySites();
