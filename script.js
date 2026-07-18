
// Sidebar declarations
const listButton = document.getElementById("ListButton");
const sidebar = document.getElementById("stretchSidebar");
const closeSidebarButton = document.getElementById("closeSidebarButton");


// Start/stop timer declerations
const startButton = document.getElementById("StartButton");
const restartButton = document.getElementById("RestartButton");


// Sidebar inputs and list declarations
const stretchInput = document.getElementById("stretchInput");
const addStretchButton = document.getElementById("addStretchButton");
const stretchList = document.getElementById("stretchList");

// timer and restart declarations
const currentStretchDisplay = document.getElementById("CurrentStretch");
const timerDisplay = document.getElementById("timerDisplay");
const progressBar = document.getElementById("progressBar");
const timerPopup = document.querySelector(".timer-popup");

let stretches = [];
let currentStretchIndex = 0;
let timeLeft = 30;
let timerInterval = null;


listButton.addEventListener("click", function () {
    sidebar.classList.toggle("open");
});

closeSidebarButton.addEventListener("click", function () {
    sidebar.classList.remove("open");
});


// adding stretches logic

addStretchButton.addEventListener("click", function () {
    const stretchName = stretchInput.value.trim();

    if (stretchName === "") {
        return;
    }

    stretches.push(stretchName);

    
    const template = document.getElementById("stretchItemTemplate");
    const clone = template.content.cloneNode(true);

    
    const textSpan = clone.querySelector(".stretch-text");
    textSpan.textContent = stretchName;

    
    const removeButton = clone.querySelector(".remove-stretch-btn");
    removeButton.addEventListener("click", function (event) {
        
        const index = stretches.indexOf(stretchName);
        if (index > -1) {
            stretches.splice(index, 1);
        }
        
        
        event.target.closest(".stretch-item").remove();
    });

    
    stretchList.appendChild(clone);

    stretchInput.value = "";
});




// starting timer
startButton.addEventListener("click", function () {
    startTimer();
});

function startTimer() {
    if (stretches.length === 0) {
        document.getElementById('myCustomAlert').showModal();
        return;
    }

    if (timerInterval !== null) {
        return;
    }



    timerPopup.classList.add("show");

    currentStretchIndex = 0;
    timeLeft = 30;

    currentStretchDisplay.textContent =
        stretches[currentStretchIndex];

    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(function () {
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            currentStretchIndex++;

            if (currentStretchIndex >= stretches.length) {
                clearInterval(timerInterval);
                timerInterval = null;

                currentStretchDisplay.textContent =
                    "All stretches complete!";

                timerDisplay.textContent = "Done!";

                setTimeout(function () {
                    timerPopup.classList.remove("show");
                }, 2000);

                return;
            }

            timeLeft = 30;

            currentStretchDisplay.textContent =
                stretches[currentStretchIndex];

            timerDisplay.textContent = timeLeft;
        }
    }, 1000);
}

function moveToNextStretch() {
    currentStretchIndex++;

    if (currentStretchIndex >= stretches.length) {
        finishWorkout();
        return;
    }

    timeLeft = 30;

    currentStretchDisplay.textContent =
        stretches[currentStretchIndex];

    timerDisplay.textContent = timeLeft;

    updateProgressBar();
}

// stopping exercises logic
function finishWorkout() {
    clearInterval(timerInterval);

    timerInterval = null;

    currentStretchDisplay.textContent =
        "All stretches complete!";

    timerDisplay.textContent = "0";

    progressBar.style.width = "100%";
}

// restart logic
restartButton.addEventListener("click", function () {
    restartTimer();
});

function restartTimer() {
    clearInterval(timerInterval);
    timerPopup.classList.remove("show");

    timerInterval = null;
    currentStretchIndex = 0;
    timeLeft = 30;

    timerDisplay.textContent = timeLeft;
    progressBar.style.width = "0%";

    if (stretches.length > 0) {
        currentStretchDisplay.textContent = stretches[0];
    } else {
        currentStretchDisplay.textContent =
            "No stretch selected";
    }
}

// progress bar
function updateProgressBar() {
    const totalSeconds = stretches.length * 30;

    const completedSeconds =
        currentStretchIndex * 30 + (30 - timeLeft);

    const progressPercentage =
        (completedSeconds / totalSeconds) * 100;

    progressBar.style.width =
        progressPercentage + "%";
}



