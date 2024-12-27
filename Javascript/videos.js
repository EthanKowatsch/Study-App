// Get elements
const videoInput = document.getElementById("videoURL");
const addButton = document.getElementById("add-video");
const videoRow = document.getElementById("video-row");

// Retrieve video list from localStorage (if it exists)
let videoList = JSON.parse(localStorage.getItem("videoList")) || [];

// Initialize UI with existing videos
function displayVideos() {
    // Clear current video display
    videoRow.innerHTML = "";

    // Display each video as an iframe
    videoList.forEach((videoURL) => {
        createVideoElement(videoURL);
    });
}

// Function to show custom alert
function showAlert(message, type = 'success', duration = 2000) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
  
    // Set the message
    alertMessage.textContent = message;
  
    // Update the alert box color based on type
    if (type === 'success') {
        alertBox.style.backgroundColor = '#4caf50'; // Green for success
        alertBox.style.color = 'white';
    } else if (type === 'error') {
        alertBox.style.backgroundColor = '#dc3545'; // Red for error
        alertBox.style.color = 'white';
    }
  
    // Show the alert box
    alertBox.classList.remove('hidden'); // Ensure it's not hidden
    alertBox.classList.add('show');
  
    // Hide the alert box after the specified duration
    setTimeout(() => {
        alertBox.classList.remove('show');
        alertBox.classList.add('hidden'); // Add hidden class back after hiding
    }, duration);
}

// Add event listener for the "Add Video" button
addButton.addEventListener("click", () => {
    const videoURL = videoInput.value.trim();
    videoInput.value = "";

    if (!videoURL) {
        showAlert('Please enter a valid video link.', 'error');
        return;
    }

    // Extract video ID from the URL
    const videoId = extractVideoId(videoURL);
    if (!videoId) {
        showAlert('Please enter a valid video link.', 'error');
        return;
    }

    // Convert to embed URL format
    const embedURL = `https://www.youtube.com/embed/${videoId}`;

    // Check for duplicates
    if (videoList.includes(embedURL)) {
        showAlert('This is a duplicate video link.', 'error');
        return;
    }

    // Add to video list
    videoList.push(embedURL);

    // Save to localStorage
    localStorage.setItem("videoList", JSON.stringify(videoList));

    // Alert user video was added successfully
    showAlert('Video successfully updated.', 'success');

    // Display the new video
    createVideoElement(embedURL);
});

// Extract video ID from YouTube URL
function extractVideoId(link) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
}

// Create and append video iframe with remove button
function createVideoElement(videoURL) {
    // Create container for the video and button
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.src = videoURL;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.classList.add("responsive-iframe");

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.classList.add("remove-button");

    // Append iframe and button to the container
    videoContainer.appendChild(iframe);
    videoContainer.appendChild(removeButton);

    // Add the container to the video row
    videoRow.appendChild(videoContainer);

    // Add event listener for the remove button
    removeButton.addEventListener("click", () => removeVideo(videoURL, videoContainer));
}

// Function to remove video
function removeVideo(videoURL, videoContainer) {
    videoList = videoList.filter((url) => url !== videoURL);
    localStorage.setItem("videoList", JSON.stringify(videoList));
    videoRow.removeChild(videoContainer);
    showAlert('Video successfully removed.', 'error');
}

// Load and display videos on page load
window.onload = displayVideos;
