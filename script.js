const X_CLASS = "x";
const O_CLASS = "o";
let xTurn;
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winnerText = document.querySelector("[data-winning-message-text]");
const winningMessage = document.getElementById("winning-message");
const restartBtn = document.getElementById("restartButton");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();
restartBtn.addEventListener("click", () => startGame());

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.addEventListener("click", handleClick, { once: true });
  });

  xTurn = true;
  hoverEffect(xTurn);
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;

  const mark = xTurn ? X_CLASS : O_CLASS;

  placeMark(cell, mark);
  checkWin(mark);
  checkDraw();

  changeTurn();
  hoverEffect(xTurn);
}

function placeMark(cell, mark) {
  cell.classList.add(mark);
}

function changeTurn() {
  xTurn = !xTurn;
}

function hoverEffect(Xs) {
  if (Xs) {
    board.classList.remove("o");
    board.classList.add("x");
  } else {
    board.classList.remove("x");
    board.classList.add("o");
  }
}

function checkWin(currentMark) {
  for (const combination of WINNING_COMBINATIONS) {
    let present = true;
    for (const cell of combination) {
      if (!cellElements[cell].classList.contains(currentMark)) {
        present = false;
        break;
      }
    }

    if (present) {
      endGame(false);
      break;
    }
  }
}

function checkDraw() {
  let draw = true;

  for (const cell of cellElements) {
    if (
      !cell.classList.contains(X_CLASS) &&
      !cell.classList.contains(O_CLASS)
    ) {
      draw = false;
    }
  }

  if (draw) {
    endGame(draw);
  }
}

function endGame(isDraw) {
  if (isDraw) {
    winnerText.innerText = "Draw!";
  } else {
    winnerText.innerText = (xTurn ? "X" : "O") + " Wins!";
  }
  winningMessage.classList.add("show");
}
