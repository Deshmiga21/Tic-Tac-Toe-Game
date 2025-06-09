const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let scores = { X: 0, O: 0 };

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      // Highlight winning cells
      document.querySelector(`.cell[data-index='${a}']`).classList.add("winning");
      document.querySelector(`.cell[data-index='${b}']`).classList.add("winning");
      document.querySelector(`.cell[data-index='${c}']`).classList.add("winning");

      // Update score
      scores[currentPlayer]++;
      updateScoreboard();

      return true;
    }
  }
  return false;
}

function updateScoreboard() {
  scoreX.textContent = scores["X"];
  scoreO.textContent = scores["O"];
}

function resetGame() {
  gameBoard = Array(9).fill("");
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  gameBoard = Array(9).fill("");
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase()); // <-- Add class 'x' or 'o'

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function resetGame() {
  gameBoard = Array(9).fill("");
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning", "x", "o"); // <-- remove X and O classes too
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

resetButton.addEventListener("click", resetGame);
