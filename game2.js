// Retrieve the size parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const boardSize = parseInt(urlParams.get('size2'));

// Variables
let gameBoard = document.getElementById('game-board');
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let fielderCount = 11;
resetGame();



function resetGame() {
    fielderCount = 11;
    createGameBoard(boardSize, boardSize);
    if (currentPlayer === 1) {
        alert('Player 2 has to set the fielders');
    }
    else {
        alert('Player 1 has to set the fielders');
    }
}

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
            cell.addEventListener('click', setFielder);

            // Append the cell to the row
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    }

    // Append the table to the container
    gameBoard.appendChild(table);

}

// Event handler for setting fielders
function setFielder(event) {
    let cell = event.target;

    if (!cell.classList.contains('fielder')) {
        cell.classList.add('fielder');
        cell.style.backgroundColor = 'blue';
        fielderCount--;
        // Check if all fielders are set
        if (fielderCount === 0) {
            let fielders = document.getElementsByClassName('fielder');
            for (let i = 0; i < fielders.length; i++) {
                fielders[i].style.backgroundColor = 'grey';
            }
            let cells = document.getElementsByClassName('cell');
            for (let j = 0; j < cells.length; j++) {
                cells[j].removeEventListener('click', setFielder);
                cells[j].addEventListener('click', revealCell);
            }

            if (currentPlayer === 1) {
                alert('Player 1 has to play the game');
            }
            else {
                alert('Player 2 has to play the game');
            }
        }
    }
    else {
        cell.classList.remove('fielder');
        fielderCount++;
        cell.style.backgroundColor = 'grey'
    }
}

// Event handler for revealing cells
function revealCell(event) {
    let cell = event.target;
    cell.classList.remove('hidden');
    cell.removeEventListener('click', revealCell);

    if (cell.classList.contains('fielder')) {
        cell.style.backgroundColor = 'red';
        cell.classList.add('revealed');
        gameOver();
    } else {
        cell.style.backgroundColor = 'white';
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
            if (player1Score < player2Score) {
                gameOver();
            }
        }
        updateScores();
    }

    // Function to update player scores
    function updateScores() {
        let scoreElement1 = document.getElementById('score1');
        let scoreElement2 = document.getElementById('score2');
        scoreElement1.textContent = `Player 1 Score: ${player1Score}`;
        scoreElement2.textContent = `Player 2 Score: ${player2Score}`;
    }

    // Function called when the game is over
    function gameOver() {
        if (currentPlayer === 1) {
            alert(`Game Over! Player 1 final score is ${player1Score}`);
            currentPlayer = 2;
            resetGame();
        } else {
            if (player1Score > player2Score) {
                let diff = player1Score - player2Score;
                alert(`Game Over! Player 1 has won by ${diff} runs.`);
            } else if (player1Score === player2Score) {
                alert(`Game Over! The game has tied.`);
            } else {
                alert(`Game Over! Player 2 has won the game by one wicket.`);
            }
            window.location.href = '1.html';
            

        }
        
    }

}
