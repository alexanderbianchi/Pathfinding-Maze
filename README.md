# A* Pathfinding Algorithm and Maze Generator with Prims Algorithm.

The project is built in React.Js using state hooks and a funcional programming design.

Users have the ability to draw their own obstacles onto the grid or randomly generate them.

Maze generation with Prims Algorithm was tricky, instead of treating the entire grid as block to be carved into, I had to create a checkerboard pattern of walls and break the barrier in bettween open nodes as the algorithm runs.

Pathfinding is done with the manhattan distance heuristic and suppports diagnal movement so it will solve the grid fast if there are no obstacles. 

CSS animations on each node disable the ability for the user to interact with it, so the grid is user protected whenever an algorithm is being preformed.

An older version,however live,version can be found here https://alexanderbianchi.github.io/Pathfinding-Maze/


