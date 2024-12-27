// Save constant elements
const siteName = document.getElementById("siteName");
const siteUrl = document.getElementById("siteURL");
const addSiteBtn = document.getElementById("add-site");
const siteOutputList = document.querySelector(".site-output-list");

// Store site data in localStorage
function saveSiteToLocalStorage(siteData) {
    const sites = getSitesFromLocalStorage();
    sites.push(siteData);
    localStorage.setItem('sites', JSON.stringify(sites));
}

// Get stored sites from localStorage
function getSitesFromLocalStorage() {
    const sites = localStorage.getItem('sites');
    return sites ? JSON.parse(sites) : [];
}

// Display sites in the DOM
function displaySites() {
    const sites = getSitesFromLocalStorage();
    const siteOutputList = document.querySelector('.site-output-list');
    siteOutputList.innerHTML = '';
    
    sites.forEach((site, index) => {
        const siteRow = document.createElement('div');
        siteRow.classList.add('site-row');
        
        const siteName = document.createElement('div');
        siteName.classList.add('site-name');
        siteName.textContent = site.name;
        
        const siteUrl = document.createElement('div');
        siteUrl.classList.add('site-url');
        const link = document.createElement('a');
        link.href = site.url;
        link.textContent = site.url;
        link.target = '_blank'; // Open the link in a new tab
        siteUrl.appendChild(link);

        const removeSite = document.createElement('div');
        removeSite.classList.add('remove-site');
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove Site';
        removeButton.onclick = () => removeSiteFromLocalStorage(index);

        removeSite.appendChild(removeButton);

        // Add the site elements (name, URL, and remove button) to the site row
        siteRow.appendChild(siteName);
        siteRow.appendChild(siteUrl);
        siteRow.appendChild(removeSite);

        siteOutputList.appendChild(siteRow);
    });
}

// Remove site from localStorage
function removeSiteFromLocalStorage(index) {
    const sites = getSitesFromLocalStorage();
    sites.splice(index, 1);
    localStorage.setItem('sites', JSON.stringify(sites));
    displaySites();
    showAlert('Site Removed Successfully.', 'error')
}

// Handle form submission to add a new site
document.getElementById('add-site').addEventListener('click', function() {
    const siteName = document.getElementById('siteName').value;
    const siteURL = document.getElementById('siteURL').value;
    
    // Regular expression to validate the URL
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-]*)*$/;

    // Check if site name and URL are valid
    if (!siteName || !siteURL) {
        showAlert('Please enter both site name and URL.', 'error');
        return;
    }

    if (!urlPattern.test(siteURL)) {
        showAlert('Please enter a valid URL.', 'error');
        siteUrl.value = "";
        return;
    }

    const newSite = { name: siteName, url: siteURL };
    saveSiteToLocalStorage(newSite);
    displaySites(); // Display the updated list
    showAlert('Site added successfully!', 'success');
    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';
});

// Show alert message
function showAlert(message, type = 'success', duration = 2000) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    
    alertMessage.textContent = message;

    if (type === 'success') {
        alertBox.style.backgroundColor = '#4caf50';
        alertBox.style.color = 'white';
    } else if (type === 'error') {
        alertBox.style.backgroundColor = '#dc3545';
        alertBox.style.color = 'white';
    }

    alertBox.classList.remove('hidden');
    alertBox.classList.add('show');
    
    setTimeout(() => {
        alertBox.classList.remove('show');
        alertBox.classList.add('hidden');
    }, duration);
}

// Initial render when the page loads
displaySites();
