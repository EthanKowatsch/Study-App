// Get references to DOM elements
const notesInput = document.getElementById("notes-input");  
const saveNotesBtn = document.getElementById("save-notes"); 
const clearBtn = document.getElementById("clear-notes");    
const notesMessage = document.getElementById("notes-message"); 
const lastInput = document.getElementById("lastUpdated");   

// Load notes from local storage
let notes = localStorage.getItem("notes") || "";            
// Set the textarea value to the retrieved notes
notesInput.value = notes;                                   

// Load last action timestamp from local storage
let lastAction = localStorage.getItem("lastAction");        
// If a last action time exists, display it in the lastInput element
if (lastAction) {                                           
  lastInput.textContent = `Last Action: ${lastAction}`;     
}

// Event listener for the save button
saveNotesBtn.addEventListener("click", () => {
  // Get the current value of the notes input
  notes = notesInput.value;                                 
  // Save the notes to local storage
  localStorage.setItem("notes", notes);                     
  // Show a "Notes Saved" message and update the last action time
  showMessage("Notes Saved.");                              
});

// Event listener for the clear button
clearBtn.addEventListener("click", () => {
  // Clear the notes input and reset the local variable
  notes = notesInput.value = "";                            
  // Save the cleared state to local storage
  localStorage.setItem("notes", notes);                     
  // Show a "Notes Cleared" message and update the last action time
  showMessage("Notes Cleared.");                            
});

// Display a message and the last action time
function showMessage(text) {
  // Set the message text and make the message visible
  notesMessage.textContent = text;                          
  notesMessage.style.display = "block";                     

  // Get the current date and time, format it, and update the lastInput element
  const currentTime = formatDate(new Date());               
  lastInput.textContent = `Last Action: ${currentTime}`;    
  
  // Save the current time to local storage
  localStorage.setItem("lastAction", currentTime);          

  // Hide the message after 2 seconds
  setTimeout(function () {                                   
    notesMessage.style.display = "none";                    
  }, 2000);
}

// Format the current date and time
function formatDate(date) {
  // Get hours and minutes, and determine AM/PM
  const hours = date.getHours();                            
  const minutes = date.getMinutes();                        
  const ampm = hours >= 12 ? 'pm' : 'am';                   
  const formattedHours = hours % 12 || 12;                  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  // Format the time as "hh:mm am/pm"
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  
  // Format the date as "YYYY-MM-DD" using local time
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  // Return the formatted time and date
  return `${formattedTime} on ${formattedDate}`;            
}