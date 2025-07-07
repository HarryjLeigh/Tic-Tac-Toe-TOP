// GameBoard IIFE
export const gameBoard = (function () {
  let board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  const applyMove = (playerMarker, playerRow, playerColumn) => {
    const row = playerRow;
    const col = playerColumn;
    board[row][col] = playerMarker;
  };
  const getBoard = () => board.map((row) => [...row]);

  const checkGameOutcome = () => {
    let outcome;
    // top row win
    if (
      board[0][0] !== "_" &&
      board[0][0] === board[0][1] &&
      board[0][0] === board[0][2]
    ) {
      return { gameOver: true, marker: board[0][0], draw: false };
    }

    // Left column win
    if (
      board[0][0] !== "_" &&
      board[0][0] === board[1][0] &&
      board[0][0] === board[2][0]
    ) {
      return { gameOver: true, marker: board[0][0], draw: false };
    }

    // Right column win
    if (
      board[0][2] !== "_" &&
      board[0][2] === board[1][2] &&
      board[0][2] === board[2][2]
    ) {
      return { gameOver: true, marker: board[0][2], draw: false };
    }

    // Middle Column win
    if (
      board[0][1] !== "_" &&
      board[0][1] === board[1][1] &&
      board[0][1] === board[2][1]
    ) {
      return { gameOver: true, marker: board[0][1], draw: false };
    }

    // Middle row win
    if (
      board[1][0] !== "_" &&
      board[1][0] === board[1][1] &&
      board[1][0] === board[1][2]
    ) {
      return { gameOver: true, marker: board[1][0], draw: false };
    }
    // Bottom row win
    if (
      board[2][0] !== "_" &&
      board[2][0] === board[2][1] &&
      board[2][0] === board[2][2]
    ) {
      return { gameOver: true, marker: board[2][0], draw: false };
    }

    // Diagonal top-left to bottom-right
    if (
      board[0][0] !== "_" &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      return { gameOver: true, marker: board[0][0], draw: false };
    }

    // Diagonal bottom-left to top-right
    if (
      board[2][0] !== "_" &&
      board[2][0] === board[1][1] &&
      board[2][0] === board[0][2]
    ) {
      return { gameOver: true, marker: board[2][0], draw: false };
    }

    if (isBoardFull())
      return (outcome = { gameOver: true, marker: null, draw: true });

    return (outcome = { gameOver: false, marker: null, draw: false });
  };

  const isBoardFull = () => {
    let isBoardFull = true;
    board.forEach((row) => {
      row.forEach((marker) => {
        if (marker === "_") isBoardFull = false;
      });
    });
    return isBoardFull;
  };

  const resetBoard = () => {
    board = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
  };
  return { applyMove, getBoard, checkGameOutcome, resetBoard };
})();
