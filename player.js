export function createPlayer(name, marker, playerNumber) {
  let score = 0;

  const updateScore = () => score++;
  const getScore = () => score;
  const resetScore = () => (score = 0);
  return { name, marker, playerNumber, updateScore, getScore, resetScore };
}
