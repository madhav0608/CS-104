// Retrieve the size parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const boardSize = parseInt(urlParams.get('size'));

// Variables
let gameBoard = document.getElementById('game-board');
let playerScore = 0;
let fielderCount = 11;
let highScore = 0;
let a = boardSize*boardSize;


// Game Initialization
createGameBoard(boardSize, boardSize);
placeFielders(fielderCount);



// Function to create the game board
function createGameBoard(rows, columns) {
    gameBoard.innerHTML = '';

    // Create the table element
    let table = document.createElement('table');

    // Generate the cells for the game board
    for (let i = 0; i < rows; i++) {
        // Create a table row
        let row = document.createElement('tr');

        

        for (let j = 0; j < columns; j++) {
            // Create a table cell
            let cell = document.createElement('td');
            cell.classList.add('cell', 'hidden');
            
            // Attach event listener to the cell
            cell.addEventListener('click', revealCell);

            // Append the cell to the row
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    }

    // Append the table to the container
    gameBoard.appendChild(table);

    let scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: 0`;

    highScore = localStorage.getItem('highScore') || 0;
    var heading = document.getElementById('highScore');
    heading.textContent = `High Score: ${highScore}`;


}


// Function to place fielders randomly
function placeFielders(fielderCount) {
    let availableCells = Array.from(document.getElementsByClassName('cell'));
    shuffleArray(availableCells);
    for (let q = 0; q < fielderCount; q++) {
        let cell = availableCells[q];
        cell.classList.add('fielder');
    }

    let availableCells2 = availableCells.filter(cell => !cell.classList.contains('fielder'));
    shuffleArray(availableCells2);
    for (let w = 0; w < 5; w++) {
        let cell = availableCells2[w];
        cell.classList.add('score-6');
    }

    let availableCells3 = availableCells2.filter(cell => !cell.classList.contains('score-6'));
    shuffleArray(availableCells3);
    for (let e = 0; e < 5; e++) {
        let cell = availableCells3[e];
        cell.classList.add('score-4');
    }

    let availableCells4 = availableCells3.filter(cell => !cell.classList.contains('score-4'));
    shuffleArray(availableCells4);
    for (let r = 0; r < 5; r++) {
        let cell = availableCells4[r];
        cell.classList.add('score-3');
    }

    let availableCells5 = availableCells4.filter(cell => !cell.classList.contains('score-3'));
    shuffleArray(availableCells5);
    for (let t = 0; t < 5 ; t++) {
        let cell = availableCells5[t];
        cell.classList.add('score-2');
    }

    let availableCells6 = availableCells5.filter(cell => !cell.classList.contains('score-2'));
    for (let y= 0; y< a-31 ;y++) {
        let cell = availableCells6[y];
        cell.classList.add('score-1');
    }
}



function revealCell(event) {
    let cell = event.target;
    cell.classList.remove('hidden');
    cell.removeEventListener('click', revealCell);

    if (cell.classList.contains('fielder')) {
        cell.style.backgroundColor = 'red';
        cell.classList.add('revealed');
        gameOver();
    } else {
        if (cell.classList.contains('score-4')) {
            playerScore += 4;
        } else if (cell.classList.contains('score-6')) {
            playerScore += 6;
        } else if (cell.classList.contains('score-1')) {
            playerScore += 1;
        } else if (cell.classList.contains('score-2')) {
            playerScore += 2;
        } else {
            playerScore += 3;
        }
        updateScore();
        checkWin();
    }
    cell.removeEventListener('click', revealCell);
}

function checkWin() {
    let remainingCells = Array.from(document.getElementsByClassName('cell hidden'));
    if (remainingCells.length === fielderCount) {
        gameWon();
    }
}

function updateScore() {
    let scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${playerScore}`;
}

function updatehighScore() {
    let highScoreElement = document.getElementById('highScore');
    highScoreElement.textContent = `highScore: ${highScore}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function gameOver() {
    if (playerScore > highScore) {
        highScore = playerScore;
        updatehighScore();
        localStorage.setItem('highScore', highScore);
        alert(`Congratulations! You achieved a new high score of ${highScore}!`);
    } else {
        alert(`Game Over! Your final score is ${playerScore}`);
    }

    resetGame();
    window.location.href = '1.html';
}

function gameWon() {
    if (playerScore > highScore) {
        highScore = playerScore;
        updatehighScore();
        alert(`Congratulations! You achieved a new high score of ${highScore}!`);
    } else {
        alert(`Congratulations! You won the game with a score of ${playerScore}`);
    }
    resetGame();
}

function resetGame() {
    // Clear the game board
    gameBoard.innerHTML = '';

    let scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: 0`;
    playerScore = 0;
    fielderCount = 11;
}
