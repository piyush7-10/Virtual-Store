// GAME LOGIC

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

export function createBoard(boardSize, numberofMines) {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberofMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      const tile = {
        element,
        x,
        y,
        mine: minePositions.some((p) => positionMatch(p, { x, y })),
        get status() {
          return element.dataset.status;
        },

        set status(value) {
          this.element.dataset.status = value;
        },
      };

      row.push(tile);
    }

    board.push(row);
  }

  return board;
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

export function markTile(tile) {
  // Checking if the tile is hidden and marked .

  // If tile is not hidden , and also not marked then it is either revealed or a mine .

  if (
    tile.status != TILE_STATUSES.HIDDEN &&
    tile.status != TILE_STATUSES.MARKED
  ) {
    return;
  }

  if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN;
  } else {
    tile.status = TILE_STATUSES.MARKED;
  }
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return; // don't reveal the tiles that are already revealed or marked .
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }

  tile.status = TILE_STATUSES.NUMBER;
  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((t) => t.mine);
  if (mines.length === 0) {
    // If there are no mines , we recursively reveal all the nearbuy tiles

    adjacentTiles.forEach((tile) => {
      revealTile(board, tile);
    });
  } else {
    tile.element.textContent = mines.length;
  }
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];

  for (let xoffset = -1; xoffset <= 1; xoffset++) {
    for (let yoffset = -1; yoffset <= 1; yoffset++) {
      if (isValid(x + xoffset, y + yoffset, board.length)) {
        const tile = board[x + xoffset][y + yoffset];

        tiles.push(tile);
      }
    }
  }

  return tiles;
}

// this is to make sure we dont't check for out of board items in our nearby function
function isValid(x, y, sz) {
  if (x < 0 || y < 0 || x >= sz || y >= sz) return false;

  return true;
}
