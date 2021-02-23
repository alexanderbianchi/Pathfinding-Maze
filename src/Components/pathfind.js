import React, { useState, useEffect } from "react";
import Node from "./Node.js";
import "./Pathfind.css";
import dijkstra from "../Algorithms/dijkstras.js";
import Rmaze from "../Algorithms/Prims Algorithm.js";

const rows = Math.round(window.innerHeight / 34);
const cols = Math.round(window.innerWidth / 27);

let hasStart = true;
let hasEnd = true;
let nodeStartRow = 2;
let nodeStartCol = 2;
let nodeEndRow = rows - 3;
let nodeEndCol = cols - 3;
let visualized = false;
let visualizing = false;

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  const createSpot = (Grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        Grid[i][j] = new Spot(i, j);
      }
    }
  };

  const initializeGrid = () => {
    const Grid1 = new Array(rows);

    for (let i = 0; i < rows; i++) {
      Grid1[i] = new Array(cols);
    }
    createSpot(Grid1);

    setGrid(() => Grid1);
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.mazeStatus = undefined;
    this.wallNeighbors = [];
    this.isWall = false;
    this.connections = [];
    this.addWallNeighbors = function (grid) {
      let i = this.x;
      let j = this.y;

      if (i > 1) {
        this.wallNeighbors.push(grid[i - 2][j]);
      }
      if (i < rows - 2) {
        this.wallNeighbors.push(grid[i + 2][j]);
      }
      if (j > 1) {
        this.wallNeighbors.push(grid[i][j - 2]);
      }
      if (j < cols - 2) {
        this.wallNeighbors.push(grid[i][j + 2]);
      }
    };

    this.visited = false;
    this.isStart = this.x === nodeStartRow && this.y === nodeStartCol;
    this.isEnd = this.x === nodeEndRow && this.y === nodeEndCol;
    this.neighbors = [];
    this.previous = undefined;
    this.addNeighbors = function (grid) {
      let i = this.x;
      let j = this.y;
      let rows = grid.length;
      let cols = grid[1].length;

      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (i < rows - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
      if (j < cols - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }

      if (i > 0 && j > 0 && !(grid[i - 1][j].isWall && grid[i][j - 1].isWall)) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
      if (
        j < cols - 1 &&
        i < rows - 1 &&
        grid[i + 1][j].isWall == false &&
        grid[i][j + 1].isWall == false
      ) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }

      if (
        j < cols - 1 &&
        i > 0 &&
        !(grid[i - 1][j].isWall && grid[i][j + 1].isWall)
      ) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }

      if (
        j > 0 &&
        i < rows - 1 &&
        !(grid[i + 1][j].isWall && grid[i][j - 1].isWall)
      ) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }
    };
  }

  const addNeighbors = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }
  };

  const [isDown, setDown] = useState(false);

  const OnDown = (x, y) => {
    if (visualizing) {
      return;
    }
    setDown(() => true);
    wallUp(x, y);
  };

  const OnUp = () => {
    setDown(() => false);
  };

  const OnEnter = (x, y) => {
    if (!isDown) {
      return;
    }

    wallUp(x, y);
  };

  const Reset = () => {
    if (visualizing) {
      return;
    }

    for (let i = 0; i < Grid.length; i++) {
      for (let j = 0; j < Grid[i].length; j++) {
        const node = Grid[i][j];
        node.isWall = false;
        node.neighbors = [];
        node.class = node.isStart
          ? "node-start"
          : node.isEnd
          ? "node-end"
          : node.isWall
          ? "wall"
          : "";
        document.getElementById(
          `node-${node.x}-${node.y}`
        ).className = `Node ${node.class}`;
        node.f = 0;
        node.h = 0;
        node.g = 0;
        node.visited = false;
        node.neighbors = [];
        node.previous = undefined;
      }
    }

    visualized = false;
    setGrid(() => Grid);
  };
  const wallUp = (x, y) => {
    if (visualized) {
      Reset();
    }
    let Grid1 = [...Grid];

    if (!hasStart && !Grid1[x][y].isEnd) {
      nodeStartRow = x;
      nodeStartCol = y;
      hasStart = true;
      Grid1[x][y].isStart = true;
    } else if (!hasEnd && !Grid1[x][y].isStart) {
      nodeEndRow = x;
      nodeEndCol = y;
      hasEnd = true;
      Grid1[x][y].isEnd = true;
    } else if (Grid1[x][y].isEnd || Grid1[x][y].isStart || Grid1[x][y].isWall) {
      if (Grid1[x][y].isEnd) {
        nodeEndRow = null;
        nodeEndCol = null;
        hasEnd = false;
        Grid1[x][y].isEnd = false;
      }
      if (Grid1[x][y].isStart) {
        nodeStartRow = null;
        nodeStartCol = null;
        hasStart = false;
        Grid1[x][y].isStart = false;
      }
      if (Grid1[x][y].isWall) {
        Grid1[x][y].isWall = false;
      }
    } else {
      Grid1[x][y].isWall = true;
    }

    setGrid(() => Grid1);
  };

  const gridwithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  OnEnter={OnEnter}
                  OnDown={OnDown}
                  isWall={isWall}
                  OnUp={OnUp}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const shortestPath = (shortestPathNodes, startNode, endNode) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        if (node !== startNode && node !== endNode) {
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "Node node-shortest";
        }
      }, 5 * i);
    }
  };

  function visualizePath() {
    if (!hasStart || !hasEnd) {
      return;
    }
    if (visualized) {
      Reset();
      return;
    }
    addNeighbors(Grid);
    setGrid(() => Grid);

    const startNode = Grid[nodeStartRow][nodeStartCol];
    const endNode = Grid[nodeEndRow][nodeEndCol];

    let path = dijkstra(startNode, endNode);

    let Path = path.path;

    let Visited = path.visitedNodes;

    visualizing = true;

    for (let i = 0; i <= Visited.length; i++) {
      if (i === Visited.length) {
        setTimeout(() => {
          shortestPath(Path, startNode, endNode);
          visualizing = false;
        }, 16 * i);
      } else {
        setTimeout(() => {
          const node = Visited[i];
          if (node !== startNode && node !== endNode) {
            document.getElementById(`node-${node.x}-${node.y}`).className =
              "Node node-visited";
          }
        }, 15 * i);
      }
    }
    visualized = true;
  }

  const randomWalls = () => {
    if (visualizing) {
      return;
    }

    Reset();

    for (let i = 0; i < Grid.length; i++) {
      for (let j = 0; j < Grid[i].length; j++) {
        if (Grid[i][j].isEnd || Grid[i][j].isStart) {
        } else if (Math.random(1) < 0.2) {
          Grid[i][j].isWall = true;
          document.getElementById(`node-${i}-${j}`).className = "Node wall";
        } else {
          Grid[i][j].isWall = false;
        }
      }
    }

    setGrid(() => Grid);
  };

  function generateMaze() {
    if (!hasStart || !hasEnd || visualizing) {
      return;
    }

    setGrid(() => Rmaze(Grid));
    visualizing = true;
    for (let i = 0; i < Grid.length; i++) {
      setTimeout(() => {
        for (let j = 0; j < Grid[i].length; j++) {
          setTimeout(() => {
            const node = Grid[i][j];
            if (!node.isStart && !node.IsEnd && node.isWall) {
              document.getElementById(`node-${node.x}-${node.y}`).className =
                "Node wall";
            } else if (!node.isStart && !node.isEnd && !node.isWall) {
              document.getElementById(`node-${node.x}-${node.y}`).className =
                "Node";
            }
            if (j == Grid[i].length - 1 && i == Grid.length - 1) {
              visualizing = false;
            }
          }, 0 * j);
        }
      }, 0 * i);
    }
    visualized = false;
  }
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Pathfinding Visualizer</h1>
      </div>
      <div className="header">
        <p>
          click and drag to create walls - replace start and end nodes with
          click
        </p>
      </div>
      <div className="row">
        <div className="col-sm">
          <button onClick={visualizePath}>Vizualize Path (A*)</button>
        </div>

        <div className="col-sm">
          <button onClick={randomWalls}>Random Walls</button>
        </div>
        <div className="col-sm">
          <button onClick={Reset}>Reset</button>
        </div>
        <div className="col-sm">
          <button onClick={generateMaze}>
            Generate Maze (Prim's Algorithm)
          </button>
        </div>
      </div>
      {gridwithNode}
    </div>
  );
};
export default Pathfind;
