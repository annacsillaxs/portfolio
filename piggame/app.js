/*
GAME RULES:

- The game has 2 players, playing in rounds
- The players can choose at the beginning of the game if they want to play with 1 die or 2 dice (1 die is the default)
- The players can set the winning score (the default is 100)
- When the game has started, the winning score cannot be changed
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his CURRENT score
- BUT, if the player rolls a 1 (any of the die), all his CURRENT score gets lost. After that, it's the next player's turn
- IF the player rolls 6 two times in a row with the same die, lose ALL the GLOBAL score and the next player rolls
- The player can choose to 'Hold', which means that his CURRENT score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,
  roundScore,
  activePlayer,
  gamePlaying,
  prevDice,
  prevDice1,
  prevDice2,
  winningNum,
  dice;

init();
showRules();

document.querySelector(".btn-set").addEventListener("click", function () {
  saveScore();
  setDisable(true);
});

document.querySelector(".btn-roll").addEventListener("click", () => {
  setDisable(true);
});

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number
    dice = randomDice();

    // 2. Display the result
    displayDice();

    // 3. If dice is 1, the next player rolls
    if (dice === 1) {
      rolledOne();
      setTimeout(function () {
        nextPlayer();
      }, 2000);
      // setTimeout(nextPlayer(), 2000);
    } else {
      // If the actual dice AND the previous dice is 6, actual player lose all the points and the other player rolls
      if (dice === 6 && prevDice === 6) {
        rolledSixTwice();
        document.querySelector("#score-" + activePlayer).textContent = 0;
        setTimeout(function () {
          nextPlayer();
        }, 2000);
      } else {
        // Add up the roundscore with the diced score
        roundScore += dice; // roundScore = roundScore + dice
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      }
      prevDice = dice;
    }
  }
  console.log(dice);
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningNum) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.getElementById("name-0").textContent = "Player 1";
  // document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".rolled-msg--1").style.display = "none";
  document.querySelector(".rolled-msg--6").style.display = "none";
  // document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  prevDice = 0;
  winningNum = 100;

  document.getElementById("winning-score").value = winningNum;
  setDisable(false);

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".game-1-set").style.display = "none";
  document.querySelector(".game-2-set").style.display = "none";
  document.querySelector(".rolled-msg--1").style.display = "none";
  document.querySelector(".rolled-msg--6").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function showRules() {
  document.querySelector(".rules").style.display = "block";
}

function saveScore() {
  winningNum = document.getElementById("winning-score").value;
}

function setDisable(disabled) {
  document.getElementById("winning-score").style.border = `1px solid ${
    disabled ? "#555" : "#eb4d4d"
  }`;
  document.querySelector(".btn-set").disabled = disabled ? true : false;
  document.querySelector("#winning-score").disabled = disabled ? true : false;

  if (disabled) {
    document.querySelector("#winning-score").classList.add("disable");
    document.querySelector(".btn-set").classList.add("disable");
  } else {
    document.querySelector("#winning-score").classList.remove("disable");
    document.querySelector(".btn-set").classList.remove("disable");
  }
}

function randomDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function displayDice() {
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";
  return diceDOM;
}

document.querySelector(".btn-rules").addEventListener("click", function () {
  document.querySelector(".rules").style.display = "block";
});

document.querySelector(".btn-exit").addEventListener("click", function () {
  document.querySelector(".rules").style.display = "none";
});

function rolledOne() {
  document.querySelector(".rolled-msg--1").style.display = "inline-block";
}

function rolledSixTwice() {
  document.querySelector(".rolled-msg--6").style.display = "inline-block";
}
