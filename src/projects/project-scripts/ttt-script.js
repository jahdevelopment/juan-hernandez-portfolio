const statusDisplay = document.querySelector('.game-info');

const gameState = ['','','','','','','','',''];

const winnings = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const winnerMessage = () => `The ${currentPlayerName} has won!!`;
const drawMessage = () => `Draw!`;
const playerTurn = () => `Is the turn of: ${currentPlayerName}`;

// Variables:

let gameActive = true;
let currentPlayerSign = 'X';
let currentPlayerName = 'Player 1';

// Functions:

function main() {
    handleStatusDisplay(playerTurn());
    listeners();
}

main();

// To show the current state of the game:

function handleStatusDisplay(message) {
    statusDisplay.innerHTML = message;
}

// Actions in each turn of the player:

function listeners() {
    document.querySelector('.grid').addEventListener('click',handleBoxClick);
    document.querySelector('.game-restart').addEventListener('click',handleRestartGame)
}

// To select a box when the player makes click on it:

function handleBoxClick(clickedEvent) {
    // saves the etiquet HTMl on which has clicked
    const clickedBox = clickedEvent.target;
    // detect the box clicked:
    if (clickedBox.classList.contains('box')) {
        const clickedBoxIndex = Array.from(clickedBox.parentNode.children).indexOf(clickedBox);
        console.log(clickedBoxIndex);
        if (gameState[clickedBoxIndex] !== '' || !gameActive) {
            return;
        }
        handleBoxPlayed(clickedBox, clickedBoxIndex);
        handleResultValidation();
    }
    console.log(clickedBox);
}

function handleRestartGame() {
    gameActive = true;
    currentPlayerName = 'Player 1';
    currentPlayerSign = 'X';
    restartGameState();
    handleStatusDisplay(playerTurn());
    document.querySelectorAll('.box').forEach(box => box.innerHTML = '') 
}

function restartGameState() {
    let i = gameState.length;
    while (i--){
        gameState[i] = '';
    }
}

function handleBoxPlayed(clickedBox, clickedBoxIndex) {
    gameState[clickedBoxIndex] = currentPlayerName;
    clickedBox.innerHTML = currentPlayerSign;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winnings.length; i++) {
        const winCondition = winnings[i];
        let position1 = gameState[winCondition[0]];
        let position2 = gameState[winCondition[1]];
        let position3 = gameState[winCondition[2]];
        if (position1 === '' || position2 === '' || position3 === '') {
            continue;
        }
        if (position1 === position2 && position2 === position3) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        handleStatusDisplay(winnerMessage());
        gameActive = false;
        return;
    }
    
    let roundDraw = !gameState.includes('');
    
    if (roundDraw) {
        handleStatusDisplay(drawMessage());
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayerSign = (currentPlayerSign === 'X') ? 'O' : 'X';
    currentPlayerName = (currentPlayerName === 'Player 1') ? 'Player 2' : 'Player 1';
    handleStatusDisplay(playerTurn());
}