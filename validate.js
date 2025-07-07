import { gameBoard } from "./gameBoard.js";

export const validator = (function () {
  const validateCell = (row, column) => {
    const board = gameBoard.getBoard();
    return board[row][column] === "_";
  };

  return { validateCell };
})();
