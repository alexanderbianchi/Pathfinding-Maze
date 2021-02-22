function shuffleArray(array) {
  if (array.length == 0) {
    return;
  }
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array[0];
}
function getRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}
function Rmaze(grid) {
  const WallSetup = (grid) => {
    let uniqueSet = new Set();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (i % 2 == 0 && j % 2 == 0) {
          grid[i][j].addWallNeighbors(grid);

          shuffleArray(grid[i][j].wallNeighbors);

          grid[i][j].isWall = false;
          uniqueSet.add(grid[i][j]);
        } else {
          if (!grid[i][j].isStart && !grid[i][j].isEnd) {
            grid[i][j].isWall = true;
          }
        }
        grid[i][j].mazeStatus = "unvisited";
      }
    }
    return uniqueSet;
  };
  let frontier = new Set();
  let visited = new Set();

  let start = getRandomItem(WallSetup(grid));
  frontier.add(start);
  visited.add(start);
  let current = start;
  current.mazeStatus = "visited";

  function Recurse(grid) {
    frontier.delete(current);

    let curN = current.wallNeighbors;

    for (let i = 0; i < curN.length; i++) {
      if (curN[i].mazeStatus == "unvisited") {
        frontier.add(curN[i]);
        //curN[i].connections.push(current);
      } else if (curN[i].mazeStatus === "frontier") {
        //curN[i].connections.push(current);
      }
    }

    if (frontier.size == 0) {
      return;
    }
    current = getRandomItem(frontier);
    visited.add(current);
    current.mazeStatus = "visited";

    let adj = [];
    for (let i = 0; i < current.wallNeighbors.length; i++) {
      if (current.wallNeighbors[i].mazeStatus == "visited") {
        adj.push(current.wallNeighbors[i]);
      }
    }
    let rand = shuffleArray(adj);

    grid[(rand.x + 1 + current.x + 1) / 2 - 1][
      (rand.y + 1 + current.y + 1) / 2 - 1
    ].isWall = false;

    if (frontier.size > 0) {
      Recurse(grid);
    }
  }
  Recurse(grid);

  return grid;
}
export default Rmaze;
