
fetch('nav.html')
.then(response => response.text())
.then(data => document.getElementById('navbarr').innerHTML = data);
fetch('navv.html')
.then(response => response.text())
.then(data => document.getElementById('navbaar').innerHTML = data);



// Existing code search bar
const voiceSearchButton = document.getElementById('voice-search-button');
const clearButton = document.getElementById('clear-button'); // Cross button
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultsContainer = document.getElementById('search-results-container');

// Function to load and display search results
function loadSearchResults() {
    // Use AJAX to fetch the content of the search-results.html file
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'search-results.html', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const searchResults = xhr.responseText;

            // Split the search results into an array of items
            const resultItems = searchResults.split('<li class="search-result">');

            // Filter the search results based on the search term (whole word match at the start)
            const filteredResults = resultItems
                .filter(result => {
                    const resultText = result.toLowerCase();
                    return resultText.startsWith(searchTerm) || resultText.includes(` ${searchTerm}`);
                })
                .map(result => `<li class="search-result">${result}`);

            // Update the search results container with the filtered content
            searchResultsContainer.innerHTML = `<li id="search-results">${filteredResults.join('')}`;
        }
    };

    xhr.send();
}

// Function to handle search and redirect to result-page.html
function performSearch() {
    const searchTerm = encodeURIComponent(searchInput.value.trim());
    if (searchTerm) {
        window.location.href = `result-page.html?query=${searchTerm}`;
    }
}

// Function to show/hide search results based on user input
function showSearchResults() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
        loadSearchResults(); // Fetch and display the search results
        searchResultsContainer.style.display = 'block'; // Display the container
        clearButton.style.display = 'block'; // Show the clear button
    } else {
        searchResultsContainer.style.display = 'none'; // Hide the container if the search term is empty
        clearButton.style.display = 'none'; // Hide the clear button
    }
}

// Clear the search input when the clear button is clicked
clearButton.addEventListener('click', function() {
    searchInput.value = '';
    clearButton.style.display = 'none'; // Hide the clear button
    searchResultsContainer.style.display = 'none'; // Hide the search results
    searchInput.placeholder = "Search..."; // Reset the placeholder
});

// Add event listeners to the search input and button
searchInput.addEventListener('input', showSearchResults);
searchButton.addEventListener('click', performSearch); // Redirect to result-page.html

// Handle Enter key press in search input
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if inside a form
        performSearch(); // Redirect to result-page.html
    }
});

// Close search results when clicking outside the container
document.addEventListener('click', function(event) {
    if (!searchResultsContainer.contains(event.target)) {
        searchResultsContainer.style.display = 'none';
        searchInput.placeholder = "Search..."; // Reset the placeholder when clicking outside
        clearButton.style.display = 'none'; // Hide the clear button
    }
});

// Voice search functionality
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language if needed

    recognition.onstart = function() {
        searchInput.placeholder = "Listening..."; // Show "Listening..." in placeholder
        console.log("Voice recognition started");
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        showSearchResults(); // Trigger search results display after voice input
        searchInput.placeholder = "Search your library"; // Reset the placeholder
        clearButton.style.display = 'block'; // Show the clear button after input
    };

    recognition.onspeechend = function() {
        recognition.stop();
        console.log("Voice recognition ended");
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        alert("An error occurred during voice recognition: " + event.error);
    };

    voiceSearchButton.addEventListener('click', function(event) {
        recognition.start();
        event.stopPropagation(); // Prevent the event from propagating to document
    });
} else {
    alert("Voice recognition is not supported by this browser.");
}

// Remove "Listening..." from placeholder when clicking elsewhere on the document
document.addEventListener('click', function(event) {
    if (!voiceSearchButton.contains(event.target)) {
        searchInput.placeholder = "Search..."; // Reset the placeholder
    }
});







/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// Function to toggle the dropdown menu
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Attach event listener to the dropdown button
document.querySelector('.dropbtn').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click from immediately closing the dropdown
    toggleDropdown();
});


//slider

let slideIndex = 0;
let numSlidesToShow = 3; // Number of slides to display at once by default
let numSlidesToMove = 3; // Number of slides to move forward/backward by default

// Function to update the number of slides to show and move based on the window width
function updateNumSlides() {
    if (window.matchMedia("(max-width: 600px)").matches) {
        numSlidesToShow = 2; // Display two slides on smaller screens
        numSlidesToMove = 2; // Move two slides forward/backward on smaller screens
    } else {
        numSlidesToShow = 3; // Display three slides on larger screens
        numSlidesToMove = 3; // Move three slides forward/backward on larger screens
    }
}

// Function to show the current slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');

    // Update the number of slides to show and move based on the window width
    updateNumSlides();

    // Ensure the index stays within valid bounds
    if (index >= slides.length - numSlidesToShow + 1) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - numSlidesToShow;
    }

    const slideWidth = slides[0].clientWidth;
    const offset = -slideIndex * slideWidth;
    document.querySelector('.slider').style.transform = `translateX(${offset}px)`;
}

// Function to go to the next slide
function nextSlide() {
    slideIndex += numSlidesToMove; // Move forward by the number of slides to move
    showSlide(slideIndex);
}

// Function to go to the previous slide
function prevSlide() {
    slideIndex -= numSlidesToMove; // Move backward by the number of slides to move
    showSlide(slideIndex);
}

// Initialize the slider
showSlide(slideIndex);



// Separate code for touch event handling
let touchStartX = 0;

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;

    if (touchDiff > 50) {
        prevSlide();
    } else if (touchDiff < -50) {
        nextSlide();
    }
}

// Add event listeners for touch events
const slider = document.querySelector(".slider");
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchend", handleTouchEnd);


//function to show slides
let slideIndex1 = 0;
let slideIndex2 = 0;
showSlides1();
showSlides2();

function showSlides1() {
    let slides = document.querySelectorAll('.banner101:first-child .slide102');
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "previous");
    }
    slideIndex1++;
    if (slideIndex1 > slides.length) {slideIndex1 = 1}
    
    slides[slideIndex1 - 1].classList.add("active");

    let previousSlideIndex = slideIndex1 - 2 < 0 ? slides.length - 1 : slideIndex1 - 2;
    slides[previousSlideIndex].classList.add("previous");

    setTimeout(showSlides1, 3500); // Change image every 4 seconds
}

function showSlides2() {
    let slides = document.querySelectorAll('.banner101:last-child .slide102');
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "previous");
    }
    slideIndex2++;
    if (slideIndex2 > slides.length) {slideIndex2 = 1}

    slides[slideIndex2 - 1].classList.add("active");

    let previousSlideIndex = slideIndex2 - 2 < 0 ? slides.length - 1 : slideIndex2 - 2;
    slides[previousSlideIndex].classList.add("previous");

    setTimeout(showSlides2, 3500); // Change image every 4 seconds
}
