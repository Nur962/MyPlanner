// script.js

// --- 1. Data Model (JavaScript Representation) ---
const moonaWellData = {
    // Stores daily schedules, indexed by dayOfWeek
    // 'Sunday' will be the template, others can be copied/modified
    schedules: {
        Sunday: {
            dayOfWeek: "Sunday",
            malayName: "Ahad",
            tasks: [
                {
                    id: "s_task_1",
                    type: "prayer",
                    title: "BANGUN & SOLAT SUBUH",
                    startTime: "05:30",
                    endTime: "06:00",
                    notes: "Bangun pagi, terus bersiap untuk solat Subuh. Ambil masa sekejap untuk muhasabah diri.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                },
                {
                    id: "s_task_2",
                    type: "health",
                    title: "RUTIN PAGI & 'BOOST' METABOLISME",
                    startTime: "06:00",
                    endTime: "07:00",
                    notes: null,
                    rationale: "'Bangunkan' otot.",
                    isCompleted: false,
                    isVCO: true, // Main task can be flagged as VCO for overall section
                    subTasks: [
                        {
                            id: "s_subtask_2_1",
                            title: "Moona's VCO Oral Intake",
                            details: "1 sudu besar Moona's Minyak Kelapa Dara Asli terus dari botol.",
                            vcoBenefit: "Ini 'kickstart' metabolisme untuk bakar lemak, bagi tenaga. MCTs cepat tukar jadi tenaga!",
                            isCompleted: false,
                            isVCO: true
                        },
                        {
                            id: "s_subtask_2_2",
                            title: "Air Kosong: Minum segelas besar.",
                            details: null,
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false
                        },
                        {
                            id: "s_subtask_2_3",
                            title: "Pergerakan Ringkas: 5-10 minit regangan/senaman ringan.",
                            details: "Kenapa: 'Bangunkan' otot.",
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false
                        }
                    ]
                },
                {
                    id: "s_task_3",
                    type: "health",
                    title: "OIL PULLING & MANDI",
                    startTime: "07:00",
                    endTime: "08:00",
                    notes: null,
                    rationale: null,
                    isCompleted: false,
                    isVCO: true,
                    subTasks: [
                        {
                            id: "s_subtask_3_1",
                            title: "Oil Pulling (Pilihan)",
                            details: "1 sudu besar Moona's VCO, kumur 10-15 minit. Ludahkan ke tong sampah.",
                            vcoBenefit: "Bagus untuk detoks, kesihatan mulut, bantu kulit muka.",
                            isCompleted: false,
                            isVCO: true
                        },
                        {
                            id: "s_subtask_3_2",
                            title: "Mandi dan bersiap untuk kerja.",
                            details: null,
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false
                        }
                    ]
                },
                {
                    id: "s_task_4",
                    type: "meal",
                    title: "SARAPAN SIHAT",
                    startTime: "08:00",
                    endTime: "09:00",
                    notes: null,
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    mealDetails: {
                        description: "Tinggi protein & lemak sihat, rendah karbohidrat halus.",
                        examples: "Telur hancur (dimasak dengan Moona's VCO), 1/2 avocado, sayur hijau. Kopi O tanpa gula / kopi + Moona's VCO.",
                        avoid: "Roti putih, kuih manis, bijirin bergula.",
                        usesVCO: true
                    },
                    subTasks: []
                },
                {
                    id: "s_task_5",
                    type: "productivity",
                    title: "SESI KERJA FOKUS",
                    startTime: "09:00",
                    endTime: "13:00",
                    notes: "Fokus pada kerja freelance. Reminder: Minum air secara konsisten. Elak Snek: Jauhi snek tinggi gula/karbohidrat. Pilih buah atau kekacang.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                },
                {
                    id: "s_task_6",
                    type: "prayer",
                    title: "SOLAT ZOHOR & MAKAN TENGAH HARI",
                    startTime: "13:00",
                    endTime: "14:00",
                    notes: null,
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: [
                        {
                            id: "s_subtask_6_1",
                            title: "Rehat & Solat Zohor.",
                            details: null,
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false
                        },
                        {
                            id: "s_subtask_6_2",
                            title: "Makan Tengah Hari:",
                            details: "Protein (ayam/ikan/telur), banyak sayur kukus/salad. Nasi perang/putih terkawal (masak lauk dengan Moona's VCO jika boleh). Elak: Makanan bergoreng (minyak biasa), mi/pasta berlebihan.",
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false,
                            mealDetails: {
                                description: "Protein (ayam/ikan/telur), banyak sayur kukus/salad.",
                                examples: "Nasi perang/putih terkawal (masak lauk dengan Moona's VCO jika boleh).",
                                avoid: "Makanan bergoreng (minyak biasa), mi/pasta berlebihan.",
                                usesVCO: true
                            }
                        }
                    ]
                },
                {
                    id: "s_task_7",
                    type: "productivity",
                    title: "SAMBUNG KERJA",
                    startTime: "14:00",
                    endTime: "16:00",
                    notes: "Tenaga masih stabil.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                },
                {
                    id: "s_task_8",
                    type: "prayer",
                    title: "TAMAT KERJA & SOLAT ASAR",
                    startTime: "16:00",
                    endTime: "16:30",
                    notes: "Selesai kerja! Rehat & Solat Asar.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                },
                {
                    id: "s_task_9",
                    type: "health",
                    title: "RIADAH RINGKAS/ME TIME",
                    startTime: "16:30",
                    endTime: "18:00",
                    notes: "Jalan-jalan (15-20 min) atau regangan.",
                    rationale: "Elak sedentari, bantu metabolisme.",
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                },
                {
                    id: "s_task_10",
                    type: "prayer",
                    title: "MAKAN MALAM SIHAT & SOLAT MAGHRIB",
                    startTime: "19:00",
                    endTime: "20:30",
                    notes: "User can adjust order or split if Maghrib is earlier.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: [
                        {
                            id: "s_subtask_10_1",
                            title: "Solat Maghrib (if not yet performed).",
                            details: null,
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false
                        },
                        {
                            id: "s_subtask_10_2",
                            title: "Makan Malam:",
                            details: "Lauk ringkas (masak dengan Moona's VCO). Cth: Tumis sayur campur, sup ikan, lauk telur. Elak: Karbohidrat berat berlebihan. Fokus protein & sayur.",
                            vcoBenefit: null,
                            isCompleted: false,
                            isVCO: false,
                            mealDetails: {
                                description: "Lauk ringkas (masak dengan Moona's VCO).",
                                examples: "Cth: Tumis sayur campur, sup ikan, lauk telur.",
                                avoid: "Karbohidrat berat berlebihan. Fokus protein & sayur.",
                                usesVCO: true
                            }
                        }
                    ]
                },
                {
                    id: "s_task_11",
                    type: "prayer",
                    title: "SOLAT ISYAK & RUTIN KECANTIKAN DIRI",
                    startTime: "20:30",
                    endTime: "21:30",
                    notes: "Tunaikan solat Isyak.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: true,
                    subTasks: [
                        {
                            id: "s_subtask_11_1",
                            title: "Moona's VCO untuk Kulit (Wajah & Jerawat)",
                            details: "Selepas cuci muka, sapu nipis Moona's VCO di muka, terutama jerawat. Urut lembut.",
                            vcoBenefit: "Anti-bakteria, pelembap semulajadi, tak sumbat pori, bagus untuk jerawat.",
                            isCompleted: false,
                            isVCO: true
                        }
                    ]
                },
                {
                    id: "s_task_12",
                    type: "general",
                    title: "MASA REHAT & PREP UNTUK ESOK",
                    startTime: "21:30",
                    endTime: "22:30",
                    notes: "Baca buku, layan keluarga/kawan, rancang kerja esok.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                },
                {
                    id: "s_task_13",
                    type: "health",
                    title: "BERSEDIA UNTUK TIDUR",
                    startTime: "22:30",
                    endTime: "23:00",
                    notes: "Pastikan tidur cukup & berkualiti untuk pemulihan badan dan kulit.",
                    rationale: null,
                    isCompleted: false,
                    isVCO: false,
                    subTasks: []
                }
            ]
        },
        // Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday will be empty initially,
        // then copied from Sunday or loaded from localStorage
        Monday: { dayOfWeek: "Monday", malayName: "Isnin", tasks: [] },
        Tuesday: { dayOfWeek: "Tuesday", malayName: "Selasa", tasks: [] },
        Wednesday: { dayOfWeek: "Wednesday", malayName: "Rabu", tasks: [] },
        Thursday: { dayOfWeek: "Thursday", malayName: "Khamis", tasks: [] },
        Friday: { dayOfWeek: "Friday", malayName: "Jumaat", tasks: [] },
        Saturday: { dayOfWeek: "Saturday", malayName: "Sabtu", tasks: [] },
    },
    drCoconutTips: [
        "MCTs dalam VCO cepat tukar jadi tenaga, bagus untuk 'kickstart' metabolisme!",
        "Oil pulling dengan VCO bantu detoks mulut dan segarkan nafas.",
        "Moona's VCO adalah pelembap semulajadi yang bagus untuk kulit dan rambut.",
        "Guna Moona's VCO dalam masakan untuk lemak sihat dan rasa yang unik.",
        "Moona's VCO punya sifat anti-bakteria dan anti-kulat yang hebat!",
        "Amalkan Moona's VCO setiap hari untuk sistem imun yang lebih kuat.",
        "Cuba sapu Moona's VCO pada gigitan serangga untuk melegakan gatal."
    ],
};

// --- Global state variables ---
// Determine current day based on user's local time for initial load
const today = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = daysOfWeek[today.getDay()]; // Sets initial currentDay based on actual day
let currentPrayerTimes = null; // Will store today's prayer times

// --- 2. DOM Element References ---
const dailyScheduleContainer = document.getElementById('dailySchedule');
const currentDayElement = document.getElementById('currentDay');
const prayerTimeInfoElement = document.getElementById('prayerTimeInfo');
const navButtons = document.querySelectorAll('.nav-button');
const copyFromSundayBtn = document.getElementById('copyFromSundayBtn');
const resetDayBtn = document.getElementById('resetDayBtn');
const deleteDayScheduleBtn = document.getElementById('deleteDayScheduleBtn');
const resetSundayCheckboxesBtn = document.getElementById('resetSundayCheckboxesBtn');

const vcoBenefitsSection = document.getElementById('vcoBenefits');
const vcoBenefitTitle = document.getElementById('vcoBenefitTitle');
const vcoBenefitText = document.getElementById('vcoBenefitText');
const closePopupButton = document.querySelector('.close-popup-button'); // Ensure this selector is correct

const drCoconutTipElement = document.getElementById('drCoconutTip');

// --- 3. Functions to Load and Save Data ---

// Load data from localStorage or use default
function loadAppData() {
    const savedData = localStorage.getItem('moonaWellPlannerData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        for (const day in moonaWellData.schedules) {
            if (parsedData.schedules[day]) {
                moonaWellData.schedules[day] = parsedData.schedules[day];
            } else {
                // If a day is new in the data model, initialize it as empty tasks
                moonaWellData.schedules[day].tasks = [];
            }
        }
        console.log("App data loaded from localStorage.");
    } else {
        // Initial setup for all weekdays as empty, except Sunday (which has default tasks)
        for (const day in moonaWellData.schedules) {
            if (day !== 'Sunday') {
                moonaWellData.schedules[day].tasks = [];
            }
        }
        console.log("No saved data found, using default schedules (Sunday template, others empty).");
    }
}


// Save data to localStorage
function saveAppData() {
    localStorage.setItem('moonaWellPlannerData', JSON.stringify(moonaWellData));
    console.log("App data saved to localStorage.");
}

// --- 4. Function to Display Dr. Coconut Tip ---
function displayDrCoconutTip() {
    if (moonaWellData.drCoconutTips.length > 0) {
        const randomIndex = Math.floor(Math.random() * moonaWellData.drCoconutTips.length);
        drCoconutTipElement.textContent = moonaWellData.drCoconutTips[randomIndex];
    } else {
        drCoconutTipElement.textContent = "No tips available.";
    }
}


// --- 5. Prayer Time Integration (Using Waktu Solat API) ---

async function getPrayerTimes() {
    const zone = 'TRG02'; // Besut, Setiu prayer times

    const today = new Date();
    const currentDayOfMonth = today.getDate(); // This will be a number, e.g., 29
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // e.g., '05' for May

    // The API endpoint for current day's prayer times for a zone.
    const apiUrl = `https://api.waktusolat.app/v2/solat/${zone}`;

    const prayerTimeInfoElement = document.getElementById('prayerTimeInfo');
    if (!prayerTimeInfoElement) {
        console.error('Error: prayerTimeInfo element not found in HTML.');
        return;
    }

    prayerTimeInfoElement.textContent = "Loading prayer times..."; // User feedback

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Waktu Solat API Raw Data (Updated):', data); // Inspect the full response here

        if (data && Array.isArray(data.prayers)) {
            const todayPrayerData = data.prayers.find(prayerEntry => {
                return prayerEntry.day === currentDayOfMonth;
            });

            if (todayPrayerData) {
                const convertTimestampToTime = (timestamp) => {
                    if (!timestamp) return 'N/A';
                    const date = new Date(timestamp * 1000);
                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                };

                const fajrTime = convertTimestampToTime(todayPrayerData.fajr);
                const dhuhrTime = convertTimestampToTime(todayPrayerData.dhuhr);
                const asrTime = convertTimestampToTime(todayPrayerData.asr);
                const maghribTime = convertTimestampToTime(todayPrayerData.maghrib);
                const ishaTime = convertTimestampToTime(todayPrayerData.isha);

                const hijriDate = todayPrayerData.hijri || 'N/A';

                // --- NEW: Construct the Gregorian date string ---
                const displayGregorianDate = `${year}-${month}-${currentDayOfMonth.toString().padStart(2, '0')}`;
                // --- END NEW ---

                // Update the HTML element
                prayerTimeInfoElement.innerHTML = `
                    Waktu Solat Hari Ini (${displayGregorianDate} / ${hijriDate}):<br>
                    Subuh: ${fajrTime} &bull; Zohor: ${dhuhrTime} &bull; Asar: ${asrTime} &bull; Maghrib: ${maghribTime} &bull; Isyak: ${ishaTime}
                `;
                console.log('Prayer times updated successfully for today.');

            } else {
                prayerTimeInfoElement.textContent = "Prayer times data for today not found in the monthly list.";
                console.warn("Could not find prayer data for day", currentDayOfMonth, "in the API response for this month.");
            }
        } else {
            prayerTimeInfoElement.textContent = "Invalid API response structure for prayer times. 'prayers' array not found.";
            console.error("API response does not contain expected 'prayers' array:", data);
        }

    } catch (error) {
        console.error('Error fetching prayer times:', error);
        prayerTimeInfoElement.textContent = `Failed to load prayer times: ${error.message}. Please check your internet connection or try again later.`;
    }
}



// --- 6. Function to Render the Daily Schedule ---

function renderDailySchedule(day) {
    dailyScheduleContainer.innerHTML = ''; // Clear previous schedule

    const schedule = moonaWellData.schedules[day];
    if (!schedule) {
        dailyScheduleContainer.innerHTML = `<p class="loading-message">Error: Schedule data not found for ${day}.</p>`;
        // Hide all action buttons if schedule data is missing
        copyFromSundayBtn.style.display = 'none';
        resetDayBtn.style.display = 'none';
        deleteDayScheduleBtn.style.display = 'none';
        resetSundayCheckboxesBtn.style.display = 'none';
        return;
    }

    const isEmptySchedule = schedule.tasks.length === 0;

    // Control visibility of action buttons based on the day
    if (day === 'Sunday') {
        copyFromSundayBtn.style.display = 'none'; // Sunday is the source, no copying to itself
        resetDayBtn.style.display = 'none'; // Reset button for Sunday now handles checkboxes only
        deleteDayScheduleBtn.style.display = 'none'; // Cannot delete Sunday template
        resetSundayCheckboxesBtn.style.display = 'inline-block'; // Show reset checkboxes for Sunday
    } else {
        // For Monday to Saturday
        resetSundayCheckboxesBtn.style.display = 'none'; // Only Sunday has this button

        if (isEmptySchedule) {
            copyFromSundayBtn.style.display = 'inline-block';
            resetDayBtn.style.display = 'none'; // No tasks to reset yet
            deleteDayScheduleBtn.style.display = 'none'; // No copied schedule to delete
            dailyScheduleContainer.innerHTML = `
                <p class="loading-message">No schedule found for ${schedule.malayName}.</p>
                <p class="loading-message">Click "Copy Sunday Schedule" to get started with a default plan.</p>
            `;
            return; // Exit function if schedule is empty
        } else {
            // Schedule is not empty for Mon-Sat
            copyFromSundayBtn.style.display = 'none';
            resetDayBtn.style.display = 'inline-block'; // Allow resetting to Sunday template
            deleteDayScheduleBtn.style.display = 'inline-block'; // Allow deleting copied schedule
        }
    }

    // If schedule is not empty, proceed to render tasks
    schedule.tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.isCompleted) {
            taskItem.classList.add('completed');
        }

        let subTasksHtml = '';
        if (task.subTasks && task.subTasks.length > 0) {
            subTasksHtml = task.subTasks.map(subTask => `
                <div class="task-notes">
                    <input type="checkbox" class="task-checkbox sub-task-checkbox" data-task-id="${task.id}" data-subtask-id="${subTask.id}" ${subTask.isCompleted ? 'checked' : ''}>
                    ${subTask.isVCO ? `<span class="vco-tag" data-vco-benefit="${subTask.vcoBenefit}">${subTask.title}</span>` : subTask.title}
                    ${subTask.details ? `<p><strong>Details:</strong> ${subTask.details}</p>` : ''}
                    ${subTask.mealDetails ? `
                        <div class="meal-details">
                            <p><strong>Description:</strong> ${subTask.mealDetails.description}</p>
                            <p><strong>Examples:</strong> ${subTask.mealDetails.examples}</p>
                            <p><strong>Avoid:</strong> ${subTask.mealDetails.avoid}</p>
                            ${subTask.mealDetails.usesVCO ? '<p class="vco-usage">Uses Moona\'s VCO in cooking!</p>' : ''}
                        </div>
                    ` : ''}
                </div>
            `).join('');
        }

        let mealDetailsHtml = '';
        if (task.mealDetails) {
            mealDetailsHtml = `
                <div class="meal-details">
                    <p><strong>Description:</strong> ${task.mealDetails.description}</p>
                    <p><strong>Examples:</strong> ${task.mealDetails.examples}</p>
                    <p><strong>Avoid:</strong> ${task.mealDetails.avoid}</p>
                    ${task.mealDetails.usesVCO ? '<p class="vco-usage">Uses Moona\'s VCO in cooking!</p>' : ''}
                </div>
            `;
        }


        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox main-task-checkbox" data-task-id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
            <div class="task-content">
                <div class="task-time">${task.startTime} - ${task.endTime}</div>
                <div class="task-title ${task.isCompleted ? 'completed' : ''}">
                    ${task.title}
                    ${task.isVCO && !task.subTasks.length ? `<span class="vco-tag" data-vco-benefit="${task.rationale || 'No specific benefit provided.'}">VCO</span>` : ''}
                </div>
                ${task.notes ? `<p class="task-notes"><strong>Notes:</strong> ${task.notes}</p>` : ''}
                ${task.rationale && !task.isVCO ? `<p class="task-notes"><strong>Kenapa:</strong> ${task.rationale}</p>` : ''}
                ${mealDetailsHtml}
                ${subTasksHtml}
            </div>
        `;
        dailyScheduleContainer.appendChild(taskItem);
    });

    // Add event listeners for checkboxes and VCO tags AFTER rendering
    addEventListenersToTasks();
}

// --- 7. Event Listener Helpers ---

function addEventListenersToTasks() {
    document.querySelectorAll('.main-task-checkbox').forEach(checkbox => {
        checkbox.onchange = (event) => {
            const taskId = event.target.dataset.taskId;
            const isChecked = event.target.checked;
            toggleTaskCompletion(currentDay, taskId, isChecked);
        };
    });

    document.querySelectorAll('.sub-task-checkbox').forEach(checkbox => {
        checkbox.onchange = (event) => {
            const taskId = event.target.dataset.taskId;
            const subTaskId = event.target.dataset.subtaskId;
            const isChecked = event.target.checked;
            toggleSubTaskCompletion(currentDay, taskId, subTaskId, isChecked);
        };
    });

    document.querySelectorAll('.vco-tag').forEach(tag => {
        tag.onclick = (event) => {
            const benefit = event.target.dataset.vcoBenefit;
            const taskElement = event.target.closest('.task-item');
            let title = 'VCO Benefit';
            if (taskElement) {
                const mainTaskTitleElement = taskElement.querySelector('.task-title');
                if (mainTaskTitleElement && !event.target.classList.contains('sub-task-checkbox')) {
                    title = mainTaskTitleElement.textContent.replace('VCO', '').trim();
                }
            }
            if (event.target.tagName === 'SPAN' && event.target.classList.contains('vco-tag')) {
                title = event.target.textContent;
            }

            displayVCOBenefit(title, benefit);
        };
    });
}

function toggleTaskCompletion(day, taskId, isCompleted) {
    const schedule = moonaWellData.schedules[day];
    if (schedule) {
        const task = schedule.tasks.find(t => t.id === taskId);
        if (task) {
            task.isCompleted = isCompleted;
            if (task.subTasks) {
                task.subTasks.forEach(sub => sub.isCompleted = isCompleted);
            }
            saveAppData();
            renderDailySchedule(day);
        }
    }
}

function toggleSubTaskCompletion(day, taskId, subTaskId, isCompleted) {
    const schedule = moonaWellData.schedules[day];
    if (schedule) {
        const task = schedule.tasks.find(t => t.id === taskId);
        if (task && task.subTasks) {
            const subTask = task.subTasks.find(st => st.id === subTaskId);
            if (subTask) {
                subTask.isCompleted = isCompleted;
                const allSubTasksCompleted = task.subTasks.every(st => st.isCompleted);
                task.isCompleted = allSubTasksCompleted; // Mark main task complete if all subtasks are
                saveAppData();
                renderDailySchedule(day);
            }
        }
    }
}

function displayVCOBenefit(title, benefit) {
    vcoBenefitTitle.textContent = title;
    vcoBenefitText.textContent = benefit || "No specific benefit provided for this VCO task.";
    vcoBenefitsSection.style.display = 'flex';
}

closePopupButton.onclick = () => {
    vcoBenefitsSection.style.display = 'none';
};

// --- 8. Schedule Management Functions ---

function copySundaySchedule(targetDay) {
    if (targetDay === 'Sunday') {
        alert("You cannot copy Sunday's schedule to Sunday itself.");
        return;
    }

    if (confirm(`Are you sure you want to copy Sunday's schedule to ${targetDay}? This will overwrite the current schedule for ${targetDay}.`)) {
        const sundaySchedule = moonaWellData.schedules.Sunday;
        moonaWellData.schedules[targetDay].tasks = JSON.parse(JSON.stringify(sundaySchedule.tasks));

        // After copying, explicitly reset all tasks and subtasks to not completed
        moonaWellData.schedules[targetDay].tasks.forEach(task => {
            task.isCompleted = false;
            if (task.subTasks) {
                task.subTasks.forEach(subTask => {
                    subTask.isCompleted = false;
                });
            }
        });

        saveAppData();
        renderDailySchedule(targetDay);
        alert(`Sunday's schedule copied to ${targetDay} successfully!`);
    }
}

function resetDaySchedule(day) {
    if (day === 'Sunday') {
        alert("Use the 'Reset Sunday Checkboxes' button to uncheck all tasks on Sunday.");
        return;
    }
    if (confirm(`Are you sure you want to reset ${day}'s schedule? This will revert it to the default Sunday template (and uncheck all tasks).`)) {
        moonaWellData.schedules[day].tasks = JSON.parse(JSON.stringify(moonaWellData.schedules.Sunday.tasks));

        // After copying, explicitly reset all tasks and subtasks to not completed
        moonaWellData.schedules[day].tasks.forEach(task => {
            task.isCompleted = false;
            if (task.subTasks) {
                task.subTasks.forEach(subTask => {
                    subTask.isCompleted = false;
                });
            }
        });

        saveAppData();
        renderDailySchedule(day);
        alert(`${day}'s schedule has been reset.`);
    }
}

// Delete schedule for a specific day (Mon-Sat)
function deleteDaySchedule(day) {
    if (day === 'Sunday') {
        alert("You cannot delete Sunday's template. It's the base schedule.");
        return;
    }
    if (confirm(`Are you sure you want to DELETE the schedule for ${day}? This cannot be undone!`)) {
        // Clear the tasks array for the current day
        moonaWellData.schedules[day].tasks = [];
        saveAppData();
        renderDailySchedule(day); // Re-render to show empty state
        alert(`${day}'s schedule has been deleted.`);
    }
}

// Reset all checkboxes for Sunday
function resetSundayCheckboxes() {
    const day = 'Sunday';
    if (confirm(`Are you sure you want to uncheck all tasks and subtasks for Sunday?`)) {
        const sundaySchedule = moonaWellData.schedules.Sunday;
        sundaySchedule.tasks.forEach(task => {
            task.isCompleted = false;
            if (task.subTasks) {
                task.subTasks.forEach(subTask => {
                    subTask.isCompleted = false;
                });
            }
        });
        saveAppData();
        renderDailySchedule(day);
        alert(`All tasks on Sunday have been unchecked.`);
    }
}


// --- 9. Initialization ---

function init() {
    loadAppData();
    displayDrCoconutTip();

    navButtons.forEach(button => {
        if (button.dataset.day === currentDay) {
            button.classList.add('active');
            currentDayElement.textContent = `Today: ${moonaWellData.schedules[currentDay].malayName} (${currentDay})`;
        }
    });

    renderDailySchedule(currentDay);

    // Call the real prayer time API function here
    getPrayerTimes();

    // Event Listeners for Navigation Buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentDay = button.dataset.day;
            currentDayElement.textContent = `Today: ${moonaWellData.schedules[currentDay].malayName} (${currentDay})`;
            renderDailySchedule(currentDay);
            // Prayer times are generally for 'today', so no need to re-fetch on day navigation
        });
    });

    // Event Listeners for Action Buttons
    copyFromSundayBtn.addEventListener('click', () => copySundaySchedule(currentDay));
    resetDayBtn.addEventListener('click', () => resetDaySchedule(currentDay));
    deleteDayScheduleBtn.addEventListener('click', () => deleteDaySchedule(currentDay));
    resetSundayCheckboxesBtn.addEventListener('click', () => resetSundayCheckboxes());
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// --- 10. Register the Service Worker ---

// At the end of script.js or in init()
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js') // Path to your service worker file
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

