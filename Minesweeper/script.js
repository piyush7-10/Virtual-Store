// DISPLAY /UI

import {
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLoose,
  TILE_STATUSES,
} from "./Minesweeper.js";

const BOARD_SIZE = 10;

const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const minesLeftText = document.querySelector("[data-mine-count]");
const boardElement = document.querySelector(".board");
const messageText = document.querySelector(".subtext");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd(); // check our result everytime we reveal a tile
    });

    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const loose = checkLoose(board);

  if (win || loose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
  }

  if (loose) {
    messageText.textContent = "You Loose";
    board.forEach((row) => {
      row.forEach((tile) => {
        // This handles the case to show mines which we marked once you loose
        if (tile.status === TILE_STATUSES.MARKED) {
          markTile(tile);
        }
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation(); // way to stop a user from playing further
  alert("Refresh the Page to Restart the Game ");
}
