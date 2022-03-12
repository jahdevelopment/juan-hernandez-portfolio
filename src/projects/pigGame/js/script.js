const player1Panel = document.getElementsByClassName("player-0-panel")[0];
const player2Panel = document.getElementsByClassName("player-1-panel")[0];

const player1TotalScoreElement = document.getElementById("score-0");
const player2TotalScoreElement = document.getElementById("score-1");

const player1RoundScoreElement = document.getElementById("current-0");
const player2RoundScoreElement = document.getElementById("current-1");

const newGameButtonElement = document.getElementById("btn-new");
const rollDiceButtonElement = document.getElementById("btn-roll");
const holdButtonElement = document.getElementById("btn-hold");

const dieImage1Element = document.getElementById("dice1");
const dieImage2Element = document.getElementById("dice2");

let isPlayer1Turn = true;

let player1TotalScore = 0;
let player2TotalScore = 0;
let player1RoundScore = 0;
let player2RoundScore = 0;

reset();

newGameButtonElement.addEventListener("click", (event) => reset());

rollDiceButtonElement.addEventListener("click", (event) => {
  const die1Number = getRandomInt(1, 6);
  const die2Nubmer = getRandomInt(1, 6);

  if (die1Number === 1 || die2Nubmer === 1) {
    player1RoundScore = 0;
    player2RoundScore = 0;
    alert("You rolled a 1!");
    turn();
  } else {
    if (isPlayer1Turn) {
      player1RoundScore += die1Number + die2Nubmer;
    } else {
      player2RoundScore += die1Number + die2Nubmer;
    }
  }

  dieImage1Element.src = `PigGameimg/dice-${die1Number}.png`;
  dieImage2Element.src = `PigGameimg/dice-${die2Nubmer}.png`;
  player1RoundScoreElement.textContent = player1RoundScore;
  player2RoundScoreElement.textContent = player2RoundScore;
});

holdButtonElement.addEventListener("click", (event) => {
  if (isPlayer1Turn) {
    player1TotalScore += player1RoundScore;
    player1RoundScore = 0;
  } else {
    player2TotalScore += player2RoundScore;
    player2RoundScore = 0;
  }

  if (player1TotalScore >= 100 || player2TotalScore >= 100) {
    alert(`Player ${isPlayer1Turn ? "1" : "2"} Wins!`);
    reset();
  } else {
    turn();
  }

  player1RoundScoreElement.textContent = player1RoundScore;
  player2RoundScoreElement.textContent = player2RoundScore;
  player1TotalScoreElement.textContent = player1TotalScore;
  player2TotalScoreElement.textContent = player2TotalScore;
});

function reset() {
  isPlayer1Turn = true;

  player1TotalScore = 0;
  player2TotalScore = 0;
  player1RoundScore = 0;
  player2RoundScore = 0;

  player1TotalScoreElement.textContent = player1TotalScore;
  player2TotalScoreElement.textContent = player2TotalScore;
  player1RoundScoreElement.textContent = player1RoundScore;
  player2RoundScoreElement.textContent = player2RoundScore;

  dieImage1Element.src = `PigGameimg/dice-1.png`;
  dieImage2Element.src = `PigGameimg/dice-1.png`;

  isPlayer1Turn = true;
  player1Panel.classList.add("active");
  player2Panel.classList.remove("active");
}

function turn() {
  isPlayer1Turn = !isPlayer1Turn;
  if (isPlayer1Turn) {
    player1Panel.classList.add("active");
    player2Panel.classList.remove("active");
  } else {
    player2Panel.classList.add("active");
    player1Panel.classList.remove("active");
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
