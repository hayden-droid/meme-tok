// JavaScript for tab switching
function openTab(tabName) {
    const tabs = document.querySelectorAll('.user-posts');
    const buttons = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    buttons.forEach(button => {
        button.classList.remove('active-tab');
    });

    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = 'block';

    // Add the 'active-tab' class to the clicked tab button
    const selectedButton = document.querySelector(`button[data-tab="${tabName}"]`);
    selectedButton.classList.add('active-tab');
}

// Initialize with the "Posts" tab as active
openTab('Posts');
// Function to fetch the JSON file and create post-cards
async function populatePostGrid() {
    try {
        const response = await fetch('videos2.json'); // Replace with the actual path to your JSON file
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const postGrid = document.querySelector('.post-grid');

        data.forEach(video => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');

            // Create the video container
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');

            // Create the video element
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.innerHTML = '<source src="' + video.VideoDirectURL + '" type="video/mp4">';
            videoContainer.appendChild(videoElement);

            // Create the post details container
            const postDetails = document.createElement('div');
            postDetails.classList.add('post-details');

            // Create and set the video description (h2)
            const descriptionElement = document.createElement('h2');
            descriptionElement.textContent = video.VideoDescription;

            // Create and set the views count
            const viewsElement = document.createElement('p');
            viewsElement.textContent = 'Views: ' + video.stats.plays;

            // Append elements to the post details container
            postDetails.appendChild(descriptionElement);
            postDetails.appendChild(viewsElement);

            // Append video container and post details to the post card
            postCard.appendChild(videoContainer);
            postCard.appendChild(postDetails);

            // Append the post card to the post grid
            postGrid.appendChild(postCard);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to populate the post grid
populatePostGrid();
