import { gameBoard } from "./gameBoard.js";
import { gameController } from "./gameController.js";

const scoresContainer = document.getElementById("scores");
const gameboardContainer = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const gameFinishedButtons = document.getElementById("gameFinishedButtons");
const playAgainBtn = document.getElementById("playAgainBtn");
const resetGameBtn = document.getElementById("resetGameBtn");
const playerNamesForm = document.getElementById("playerNamesForm");

// DisplayController IIFE
export const displayController = (function () {
  const displayBoard = () => {
    const board = gameBoard.getBoard();
    board.forEach((row, rowIndex) => {
      row.forEach((marker, colIndex) => {
        const box = document.querySelector(
          `.box[data-row="${rowIndex}"][data-column="${colIndex}"]`
        );
        if (box) {
          box.textContent = marker;
        }

        switch (marker) {
          case "X":
            box.style.color = "#ff007f"; // hot pink
            break;
          case "O":
            box.style.color = "#00f6ff"; // cyan
            break;
          case "_":
            box.style.color = "#ffcc00"; // arcade yellow
            break;
          default:
            box.style.color = "#ffffff"; // fallback (optional)
        }
      });
    });
    showGameBoard();
  };

  const displayScores = (playerOne, playerTwo) => {
    // Clear previous content to avoid duplicates if showScores is called multiple times
    scoresContainer.innerHTML = "";

    // Helper to create player display elements
    function createPlayerDisplay(player) {
      const nameEl = document.createElement("h2");
      nameEl.textContent = `${player.name}`;

      const scoreEl = document.createElement("p");
      scoreEl.textContent = `${player.getScore()}`;

      if (player.playerNumber === 1) {
        nameEl.classList.add("player1-score-header");
      } else if (player.playerNumber === 2) {
        nameEl.classList.add("player2-score-header");
      }

      scoreEl.classList.add("score");

      return [nameEl, scoreEl];
    }

    const [playerOneNameEl, playerOneScoreEl] = createPlayerDisplay(playerOne);
    const [playerTwoNameEl, playerTwoScoreEl] = createPlayerDisplay(playerTwo);

    scoresContainer.append(
      playerOneNameEl,
      playerOneScoreEl,
      playerTwoNameEl,
      playerTwoScoreEl
    );

    showScores();
    hidePlayerNamesForm();
  };

  const displayElement = (element, style) => {
    element.style.display = style;
  };

  const showGameBoard = () => {
    displayElement(gameboardContainer, "flex");
  };
  const hideGameBoard = () => {
    displayElement(gameboardContainer, "none");
  };

  const showScores = () => {
    displayElement(scoresContainer, "flex");
  };
  const hideScores = () => {
    displayElement(scoresContainer, "none");
  };

  const showPlayerNamesForm = () => {
    playerNamesForm.reset();
    displayElement(playerNamesForm, "block");
  };
  const hidePlayerNamesForm = () => {
    displayElement(playerNamesForm, "none");
  };

  const showGameFinishedButtons = () => {
    displayElement(gameFinishedButtons, "block");
  };
  const hideGameFinishedButtons = () => {
    displayElement(gameFinishedButtons, "none");
  };

  return {
    displayBoard,
    displayScores,
    displayElement,
    showGameFinishedButtons,
    hideGameFinishedButtons,
    showPlayerNamesForm,
    hideScores,
    hideGameBoard,
  };
})();

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const row = parseInt(box.dataset.row, 10);
    const column = parseInt(box.dataset.column, 10);
    gameController.handlePlayerMove(row, column);
  });
});

playAgainBtn.addEventListener("click", () => {
  gameController.resetGame();
});

resetGameBtn.addEventListener("click", () => {
  gameController.totalReset();
});
