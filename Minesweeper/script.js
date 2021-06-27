// DISPLAY /UI

import { createBoard } from "./Minesweeper.js";

const BOARD_SIZE = 10;

const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

const minesLeftText = document.querySelector("[data-mine-count]");

console.log(board);

const boardElement = document.querySelector(".board");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;
