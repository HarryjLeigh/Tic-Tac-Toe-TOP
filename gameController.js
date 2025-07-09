import { gameBoard } from "./gameBoard.js";
import { displayController } from "./displayController.js";
import { createPlayer } from "./player.js";
import { validator } from "./validate.js";

export const gameController = (() => {
  let players = [];
  let activePlayer;
  let isGameRunning = true;

  // Start the game by getting players with name
  const startGame = (playerOneName, playerTwoName) => {
    players = createPlayers(playerOneName, playerTwoName);
    players.forEach((player) =>
      console.log(`Player: ${player.name} Marker: ${player.marker}`)
    );
    activePlayer = players[0];
    isGameRunning = true;

    displayController.displayScores(players[0], players[1]);
    displayController.displayBoard();
    displayController.displayPlayerTurn(activePlayer);
  };

  // Uses factory that creates two players
  const createPlayers = (playerOneName, playerTwoName) => {
    const playerOne = createPlayer(playerOneName, "X", 1);
    const playerTwo = createPlayer(playerTwoName, "O", 2);
    return [playerOne, playerTwo];
  };

  const handlePlayerMove = (row, column) => {
    if (!isGameRunning) return;

    if (!validator.validateCell(row, column)) {
      alert("Chosen cell is already taken");
      return;
    }

    gameBoard.applyMove(activePlayer.marker, row, column);
    displayController.displayBoard();

    const outcome = gameBoard.checkGameOutcome();

    if (outcome?.gameOver) {
      isGameRunning = false;

      if (outcome.draw) {
        displayController.hidePlayerTurn();
        displayController.displayGameResult(outcome);
        displayController.showGameFinishedButtons();
      } else {
        checkWinner(outcome);
        displayController.displayWinningLine(
          outcome.marker,
          outcome.winningLine
        );
        displayController.hidePlayerTurn();
        displayController.showGameFinishedButtons();
      }
      return;
    }
    // Change Player
    activePlayer = switchActivePlayer(activePlayer);
    displayController.displayPlayerTurn(activePlayer);
  };

  const switchActivePlayer = (activePlayer) => {
    return activePlayer.name === players[0].name ? players[1] : players[0];
  };

  const checkWinner = (outcome) => {
    if (outcome.marker === players[0].marker) {
      players[0].updateScore();
      displayController.displayGameResult(outcome, players[0]);
    } else if (outcome.marker === players[1].marker) {
      players[1].updateScore();

      displayController.displayGameResult(outcome, players[1]);
    }

    displayController.displayScores(players[0], players[1]);
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    activePlayer = players[0];
    isGameRunning = true;
    displayController.displayBoard();

    displayController.hideGameFinishedButtons();
    displayController.hideGameResult();
    displayController.hidePlayerTurn();
  };

  const totalReset = () => {
    gameBoard.resetBoard();
    displayController.hideGameFinishedButtons();
    displayController.hideScores();
    displayController.hideGameBoard();
    displayController.hideGameResult();
    displayController.showPlayerNamesForm();
    displayController.hidePlayerTurn();
  };

  return { resetGame, startGame, handlePlayerMove, totalReset };
})();
