// Rover Object
let rover = {
  direction: "N",
  x: 0,
  y: 0
};

// Add an array to track the rover's moves after the object is declared
rover.travelLog = [];

// Create the 10 x 10 grid
let grid = [];

for(let r = 0; r < 10; r++){
  grid[r] = [];
  for(let c = 0; c < 10; c++){
    grid[r][c] = "";
  }
}

// Create 6 random obstacles (X) on the grid
function generateObstacle(grid) {
  let obstacles = 0;
  while (obstacles < 6) {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
  
    if (!grid[randomX][randomY]) {
      grid[randomX][randomY] = "X";
    } 
    obstacles++;
  }
}

// Turn left
function turnLeft(rover) {
  switch(rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
  console.log(`Rover turned left and is facing ${rover.direction}`);
}

// Turn right
function turnRight(rover){
  switch(rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log(`Rover turned right and is facing ${rover.direction}`);
}

// Move forward
function moveForward(rover) {
  let prevX = rover.x;
  let prevY = rover.y;
  console.log("Rover moved forward");
  
  switch(rover.direction) {
    case "N":
      rover.y--;
      break;
    case "E":
      rover.x++;
      break;
    case "S":
      rover.y++;
      break;
    case "W":
      rover.x--;
      break;
  }
  
  if (detectCollision(grid,rover)) {
    rover.x = prevX;
    rover.y = prevY;
    console.log(`Current Position x:${rover.x} y:${rover.y}`);
  } else {
    console.log(`New Position x:${rover.x} y:${rover.y}`);
  }
}

// Move backward
function moveBackward(rover) {
  let prevX = rover.x;
  let prevY = rover.y;
  console.log("Rover moved backward");
  
  switch(rover.direction) {
    case "N":
      rover.y++;
      break;
    case "E":
      rover.x--;
      break;
    case "S":
      rover.y--;
      break;
    case "W":
      rover.x++;
      break;
  }
  
  if (detectCollision(grid, rover)) {
    rover.x = prevX;
    rover.y = prevY;
    console.log(`Current Position x:${rover.x} y:${rover.y}`);
  } else {
    console.log(`New Position x:${rover.x} y:${rover.y}`);
  } 
}

function detectCollision(grid, rover){
  if (typeof grid[rover.x][rover.y] === "undefined"){
    console.log("You are out of bounds!");
    return true;
  } else if (grid[rover.x][rover.y] === "X"){
    console.log("You have hit an obstacle!");
    return true;
  } else {
    return false;
  }
}

// Order of commands
function commands(command) {
  generateObstacle(grid);

  for (let i = 0; i < command.length; i++) {
    switch(command[i]) {
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      default:
        console.log(`${command[i]} is invalid! You must enter one of the following commands: r, l, f, b`);
        break;
    }
    let newTravelLog = {x:rover.x, y:rover.y};
    rover.travelLog.push(newTravelLog);
  }
}

commands("rffrfflfrff");

console.log("Travel log: ", rover.travelLog);
console.log("Grid: ", grid);