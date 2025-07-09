import { gameBoard } from "./gameBoard.js";
import { gameController } from "./gameController.js";

const scoresContainer = document.getElementById("scores");
const gameboardContainer = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const gameFinishedButtons = document.getElementById("gameFinishedButtons");
const playAgainBtn = document.getElementById("playAgainBtn");
const resetGameBtn = document.getElementById("resetGameBtn");
const playerNamesForm = document.getElementById("playerNamesForm");
const gameResult = document.getElementById("gameResultContainer");
const playerTurnContainer = document.getElementById("playerTurnContainer");

const winningLines = {
  "top-row": [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  "middle-row": [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  "bottom-row": [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  "left-col": [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  "middle-col": [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  "right-col": [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  "diagonal-top-left": [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  "diagonal-top-right": [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
};

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
          box.classList.remove("playerOneWinningLine");
          box.classList.remove("playerTwoWinningLine");
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

  const displayPlayerTurn = (player) => {
    const playerNameParagraph = document.getElementById("playerName");
    const playerMarkerParagraph = document.getElementById("playerMarker");

    playerNameParagraph.innerHTML = "Turn:";
    playerMarkerParagraph.innerHTML = "Marker:";
    const playerTurnName = document.createElement("span");
    const playerTurnMarker = document.createElement("span");
    playerTurnName.textContent = ` ${player.name}`;
    playerTurnMarker.textContent = ` ${player.marker}`;

    if (player.marker === "X") {
      playerTurnName.style.color = "#ff007f";
      playerTurnMarker.style.color = "#ff007f";
    } else {
      playerTurnName.style.color = "#00f6ff";
      playerTurnMarker.style.color = "#00f6ff";
    }

    playerNameParagraph.appendChild(playerTurnName);
    playerMarkerParagraph.appendChild(playerTurnMarker);
    showPlayerTurn(playerTurnContainer, "block");
  };

  const displayWinningLine = (marker, winningLine) => {
    const winningIndexes = winningLines[winningLine];

    if (!winningIndexes) return;

    winningIndexes.forEach(([rowIndex, colIndex]) => {
      const box = document.querySelector(
        `.box[data-row="${rowIndex}"][data-column="${colIndex}"]`
      );
      console.log(box);
      if (!box) {
        console.warn(`Box not found at ${rowIndex}, ${colIndex}`);
        return;
      }
      if (marker === "X") {
        box.classList.add("playerOneWinningLine");
      } else if (marker === "O") {
        box.classList.add("playerTwoWinningLine");
      }
    });
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

  const showGameResult = () => {
    displayElement(gameResult, "block");
  };
  const hideGameResult = () => {
    gameResult.innerHTML = "";
    displayElement(gameResult, "none");
  };

  const showPlayerTurn = () => {
    displayElement(playerTurnContainer, "block");
  };
  const hidePlayerTurn = () => {
    displayElement(playerTurnContainer, "none");
  };

  const displayGameResult = (outcome, player = {}) => {
    let result = document.createElement("p");
    if (!outcome.draw) {
      result.textContent = `${player.name} wins!`;
      if (outcome.marker === "X") {
        result.style.color = "#ff007f";
      } else if (outcome.marker === "O") {
        result.style.color = "#00f6ff";
      }
    } else if (outcome.draw) {
      result.textContent = "It's a draw!";
    }

    gameResult.append(result);
    showGameResult();
  };

  return {
    displayBoard,
    displayScores,
    displayElement,
    displayGameResult,
    displayPlayerTurn,
    displayWinningLine,
    showGameFinishedButtons,
    hideGameFinishedButtons,
    showPlayerNamesForm,
    hideScores,
    hideGameBoard,
    hideGameResult,
    hidePlayerTurn,
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
