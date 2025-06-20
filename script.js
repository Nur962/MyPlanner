// Function to format time with leading zeros
function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Function to show a generic notification with a custom message and duration
function showCustomNotification(message, duration = 3000) {
    const notificationPopup = document.getElementById('notification-popup');
    const notificationMessage = document.getElementById('notification-message');

    // Basic check to ensure elements exist before trying to use them
    if (!notificationPopup || !notificationMessage) {
        console.error("Notification elements not found! Make sure 'notification-popup' and 'notification-message' IDs exist in your HTML.");
        return;
    }

    // Set message and make it visible
    notificationMessage.textContent = message;
    notificationPopup.classList.add('show');

    // Automatically hide after the specified duration
    setTimeout(() => {
        notificationPopup.classList.remove('show');
    }, duration);
}

// Function to show the initial welcome notification
function showWelcomeNotification() {
    const now = new Date();
    const currentTime = formatTime(now);
    showCustomNotification(`Now is ${currentTime}.`, 3000); // Reuse the generic function
}

// --- API Keys and Coordinates (REPLACE YOUR_OPENWEATHERMAP_API_KEY) ---
const OPENWEATHER_API_KEY = '26ad67bd0ea90049bd51aba0b6845230'; // Get your API key from openweathermap.org
const JERTEH_LAT = 5.75; // Approximate latitude for Jerteh, Terengganu
const JERTEH_LON = 102.5833; // Approximate longitude for Jerteh, Terengganu
const MALAYSIA_COUNTRY_CODE = 'MY'; // Country code for Malaysia

// --- DOM Elements ---
const currentDaySpan = document.getElementById('current-day');
const masihiDateSpan = document.getElementById('masihi-date');
const hijriDateSpan = document.getElementById('hijri-date'); // This is the element we're targeting
const prayerTimesSection = document.getElementById('prayer-times');
const weatherForecastSpan = document.getElementById('weather-forecast');
const clearTasksBtn = document.getElementById('clear-tasks-btn');

// --- Functions to get and display date ---
function displayCurrentDate() {
    const today = new Date();
    const optionsDay = { weekday: 'long' };
    const optionsDateMasihi = { year: 'numeric', month: 'long', day: 'numeric' };

    // Set Masihi (Gregorian) dates
    if (currentDaySpan) {
        currentDaySpan.textContent = today.toLocaleDateString('en-US', optionsDay);
    } else {
        console.warn("Element with ID 'current-day' not found.");
    }
    if (masihiDateSpan) {
        masihiDateSpan.textContent = today.toLocaleDateString('en-US', optionsDateMasihi);
    } else {
        console.warn("Element with ID 'masihi-date' not found.");
    }

    // Fetch Hijri date using a free API (IslamicFinder or similar)
    if (!hijriDateSpan) {
        console.error("Element with ID 'hijri-date' not found. Cannot fetch Hijri date.");
        return; // Exit if the element isn't there
    }

    // FIX: Changed HTTP to HTTPS in the API URL to resolve Mixed Content error
    fetch('https://api.aladhan.com/v1/gToH')
        .then(response => {
            console.log('Aladhan API Request URL:', response.url); // Log the actual URL
            console.log('Aladhan API Response Status:', response.status); // Log status
            if (!response.ok) { // Check for HTTP errors (e.g., 404, 500, 403)
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Aladhan API Raw Data:', data); // Log the full data object
            if (data.data && data.data.hijri) {
                const hijriDate = data.data.hijri;
                console.log('Parsed Hijri Date object:', hijriDate); // Log the hijri object
                console.log('Hijri Day:', hijriDate.day);
                console.log('Hijri Month (en):', hijriDate.month.en);
                console.log('Hijri Year:', hijriDate.year);

                hijriDateSpan.textContent = `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`;
                console.log('Hijri date successfully set to:', hijriDateSpan.textContent); // Confirm what was set
            } else {
                console.warn('Aladhan API did not return expected data.data.hijri structure.');
                hijriDateSpan.textContent = 'N/A (Could not fetch Hijri date)';
            }
        })
        .catch(error => {
            console.error('Error fetching Hijri date:', error);
            hijriDateSpan.textContent = `N/A (Error: ${error.message || error})`;
        });
}

// --- Function to fetch and display Prayer Times ---
async function fetchPrayerTimes() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is 0-indexed

    const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${JERTEH_LAT}&longitude=${JERTEH_LON}&method=3`; // Method 3 is ISNA

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const currentDayData = data.data[today.getDate() - 1]; // Get data for today
            if (currentDayData && currentDayData.timings) {
                document.getElementById('fajr').textContent = currentDayData.timings.Fajr.split(' ')[0];
                document.getElementById('dhuhr').textContent = currentDayData.timings.Dhuhr.split(' ')[0];
                document.getElementById('asr').textContent = currentDayData.timings.Asr.split(' ')[0];
                document.getElementById('maghrib').textContent = currentDayData.timings.Maghrib.split(' ')[0];
                document.getElementById('isha').textContent = currentDayData.timings.Isha.split(' ')[0];
            } else {
                if (prayerTimesSection) {
                     prayerTimesSection.innerHTML = '<p>Could not find prayer times for today.</p>';
                } else {
                    console.warn("Element with ID 'prayer-times' not found.");
                }
            }
        } else {
            if (prayerTimesSection) {
                prayerTimesSection.innerHTML = '<p>Error fetching prayer times data.</p>';
            } else {
                console.warn("Element with ID 'prayer-times' not found.");
            }
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        if (prayerTimesSection) {
            prayerTimesSection.innerHTML = '<p>Failed to load prayer times. Please check your internet connection or API key.</p>';
        } else {
             console.warn("Element with ID 'prayer-times' not found during error handling.");
        }
    }
}

// --- Function to fetch and display Raincheck Forecast ---
async function fetchWeatherForecast() {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        if (weatherForecastSpan) {
            weatherForecastSpan.textContent = 'Weather API key not configured. Please get a key from OpenWeatherMap.';
            weatherForecastSpan.style.color = '#e74c3c';
        }
        console.warn('OpenWeatherMap API key is missing or not set.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${JERTEH_LAT}&lon=${JERTEH_LON}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "200") {
            let rainExpected = false;
            let forecastDetails = '';
            const now = new Date();
            const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            for (let i = 0; i < data.list.length; i++) {
                const forecastTime = new Date(data.list[i].dt * 1000); // Convert timestamp to Date object
                if (forecastTime > now && forecastTime <= twentyFourHoursLater) {
                    const weatherMain = data.list[i].weather[0].main.toLowerCase();
                    if (weatherMain.includes('rain') || weatherMain.includes('drizzle') || weatherMain.includes('thunderstorm')) {
                        rainExpected = true;
                        const time = forecastTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                        forecastDetails += `Rain expected around ${time} (${data.list[i].weather[0].description}). `;
                        break;
                    }
                }
            }

            if (weatherForecastSpan) {
                if (rainExpected) {
                    weatherForecastSpan.textContent = `Yes! Details: ${forecastDetails}`;
                    weatherForecastSpan.style.color = '#e74c3c';
                } else {
                    weatherForecastSpan.textContent = 'Not expected in the next 24 hours. Good for gardening!';
                    weatherForecastSpan.style.color = '#28a745';
                }
            }
        } else {
            if (weatherForecastSpan) {
                weatherForecastSpan.textContent = `Error: ${data.message || 'Could not fetch weather data.'}`;
                weatherForecastSpan.style.color = '#e74c3c';
            }
        }
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        if (weatherForecastSpan) {
            weatherForecastSpan.textContent = 'Failed to load weather forecast. Check API key/internet.';
            weatherForecastSpan.style.color = '#e74c3c';
        }
    }
}

// --- NEW FUNCTION: Check if all tasks are completed ---
function checkAllTasksCompleted() {
    const checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    // If there are no checkboxes, consider it not "all completed" for the notification
    if (checkboxes.length === 0) {
        return;
    }
    const allCompleted = Array.from(checkboxes).every(checkbox => checkbox.checked);

    if (allCompleted) {
        showCustomNotification("Well done! All tasks completed! 🎉", 4000); // Show for 4 seconds
    }
    // No 'else' needed here, as the notification will self-hide.
}

// --- Functions for Checkboxes and Local Storage ---

// Function to save checkbox states to local storage
function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    const states = {};
    checkboxes.forEach(checkbox => {
        states[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem('taskCheckStates', JSON.stringify(states));
}

// Function to load checkbox states from local storage
function loadCheckboxStates() {
    const savedStates = localStorage.getItem('taskCheckStates');
    if (savedStates) {
        const states = JSON.parse(savedStates);
        for (const id in states) {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = states[id];
                // Also apply 'completed' class if checked
                if (checkbox.checked) {
                    checkbox.closest('li').classList.add('completed');
                }
            }
        }
    }
}

// Function to attach event listeners to checkboxes
function setupCheckboxes() {
    document.querySelectorAll('.task-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Toggle 'completed' class on the parent li
            if (this.checked) {
                this.closest('li').classList.add('completed');
            } else {
                this.closest('li').classList.remove('completed');
            }
            saveCheckboxStates(); // Save state whenever a checkbox changes
            checkAllTasksCompleted(); // <--- IMPORTANT: Call this after every change!
        });
    });
}

// Function to clear all checkboxes and local storage
function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks? This will uncheck all boxes.")) {
        document.querySelectorAll('.task-list input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('li').classList.remove('completed'); // Remove completed class
        });
        localStorage.removeItem('taskCheckStates'); // Clear from local storage
        // After clearing all tasks, we should check completion again.
        // This will ensure the "Well done!" message is hidden if it was showing,
        // or prevent it from showing if tasks are now incomplete.
        checkAllTasksCompleted();
    }
}

// --- Initialize the Planner on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeNotification(); // This replaces your old showNotification call

    displayCurrentDate();
    fetchPrayerTimes();
    fetchWeatherForecast();
    loadCheckboxStates(); // Load states when the page loads
    setupCheckboxes(); // Attach listeners after loading states

    // Event listener for the clear button
    if (clearTasksBtn) {
        clearTasksBtn.addEventListener('click', () => {
            clearAllTasks();
            // You might want to re-check completion here, though clearAllTasks already does.
            // It's good to keep it consistent.
        });
    } else {
        console.warn("Element with ID 'clear-tasks-btn' not found.");
    }

    // Initial check for completed tasks in case all were already completed from local storage
    checkAllTasksCompleted();
});
