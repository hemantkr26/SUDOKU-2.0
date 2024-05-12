function goToDifficultySelection() {
    window.location.href = "difficulty_selection.html";
}

function startGame(difficulty) {
    window.location.href = "sudoku_board.html?difficulty=" + difficulty;
}

function goToHomePage() {
    window.location.href = "index.html";
}

function goBack() {
    window.history.back();
}

var numSelected = null;
var tileSelected = null;
var errors = 0;
var solutionToUse; // Declare solutionToUse as a global variable

window.onload = function () {
    // Check if the difficulty level is passed from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');
    if (difficulty) {
        setGame(difficulty);
    } else {
        // Default to easy difficulty if no difficulty level is provided
        setGame("easy");
    }
}

function setGame(difficulty) {
    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";
    document.getElementById("errors").innerText = "0";

    let boardToUse;
    switch (difficulty) {
        case "easy":
            boardToUse = [
                "4-2---38-",
                "1-96-74--",
                "--83--1-6",
                "-9--3---4",
                "-2396471-",
                "8---1--6-",
                "9-7--65--",
                "--58-96-2",
                "-46---8-9",
            ];
            solutionToUse = [
                "462591387",
                "139687425",
                "758342196",
                "691738254",
                "523964718",
                "874215963",
                "987426531",
                "315879642",
                "246153879",
            ];
            break;
        case "medium":
            boardToUse = [
                "---5----6",
                "---87-3-2",
                "27-3---81",
                "----349--",
                "793-5-614",
                "--879----",
                "92---3-57",
                "5-6-87---",
                "3----5---",
            ];
            solutionToUse = [
                "834512796",
                "615879342",
                "279346581",
                "152634978",
                "793258614",
                "468791235",
                "921463857",
                "546987123",
                "387125469",
            ];
            break;
        case "hard":
            boardToUse = [
                "2---3--4-",
                "-3-6----7",
                "--9--71-8",
                "--4-72---",
                "-25-819--",
                "1-3--6--5",
                "----2-4--",
                "4-68---7-",
                "5--9--3--",
            ];
            solutionToUse = [
                "257138649",
                "831649257",
                "649257138",
                "914572813",
                "725381964",
                "183496725",
                "318725496",
                "496813572",
                "572964381",
            ];
            break;
        default:
            boardToUse = [
                "4-2---38-",
                "1-96-74--",
                "--83--1-6",
                "-9--3---4",
                "-2396471-",
                "8---1--6-",
                "9-7--65--",
                "--58-96-2",
                "-46---8-9",
            ];
            solutionToUse = [
                "462591387",
                "139687425",
                "758342196",
                "691738254",
                "523964718",
                "874215963",
                "987426531",
                "315879642",
                "246153879",
            ];
            break;
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (boardToUse[r][c] != "-") {
                tile.innerText = boardToUse[r][c];
                tile.classList.add("tile-start");
            }
            if(r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if(c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    for (i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        
        // Convert the character to a string before comparison
        if (solutionToUse[r][c] === numSelected.id.toString()) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}


// // Timer functionality
// let timerInterval;
// let seconds = 0;
// let minutes = 0;
// let hours = 0;

// function startTimer() {
//     timerInterval = setInterval(updateTimer, 1000);
// }

// function updateTimer() {
//     seconds++;
//     if (seconds === 60) {
//         seconds = 0;
//         minutes++;
//         if (minutes === 60) {
//             minutes = 0;
//             hours++;
//         }
//     }
//     let displayHours = padZero(hours);
//     let displayMinutes = padZero(minutes);
//     let displaySeconds = padZero(seconds);
//     document.getElementById("timer").innerText = displayHours + ":" + displayMinutes + ":" + displaySeconds;
// }

// function stopTimer() {
//     clearInterval(timerInterval);
// }

// // Utility function to pad single digits with leading zeros
// function padZero(num) {
//     return num < 10 ? "0" + num : num;
// }

// // Call startTimer() when the game starts
// startGame("easy");
// startTimer();

// let timerRunning = false;

// function startTimer() {
//     if (!timerRunning) {
//         timerInterval = setInterval(updateTimer, 1000);
//         timerRunning = true;
//     }
// }
