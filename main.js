import { gameController } from "./gameController.js";

let playerNamesForm = document.getElementById("playerNamesForm");
let playerOneName = "";
let playerTwoName = "";

playerNamesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  playerOneName = document.getElementById("playerOneName").value.trim();
  playerTwoName = document.getElementById("playerTwoName").value.trim();

  if (playerOneName !== "" && playerTwoName !== "") {
    gameController.startGame(playerOneName, playerTwoName);
  }
});
