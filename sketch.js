//Daniel Lin Create Task

//initialize the grid array
let stateArray;

//parent div tag
var gridDiv = document.getElementById('GridColumn');

let resolution;
let columns;
let rows;
let temp;
let len;
let GamePaused = false;

//initialize canvas
let canvas;

//canvas dimensions
var canvasWidth;
var canvasHeight;

//setup the sketch
function setup() {
  //set framerate to 10
  frameRate(10);

  resolution = 10;

  //canvas dimensions (size of div)
  canvasWidth = document.getElementById("GridColumn").offsetWidth;
  canvasHeight = document.getElementById("GridColumn").offsetHeight;

  //compute number of columns and rows
  columns = floor(canvasWidth / resolution);
  rows = floor(canvasHeight / resolution);

  //create canvas using previously declared dimensions
  canvas = createCanvas(canvasWidth, canvasHeight);

  //set the canvas as a child of the parent div to fit into div
  canvas.parent("GridColumn");

  //create the grid array
  stateArray = Construct2dArray(columns, rows, false);
}

//update sketch every frame
function draw() {
  //set background to black
  background(0);
  //loop through every cell in the grid
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      //color cell white if state is alive
      if (stateArray[i][j].cellState == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  
  //run click function 
  if (GamePaused) {

    resume(true);
  } else {
    
    resume(false);
  }

}

function resume(isPaused) {
  frameRate(10);
  onClick();
  let NextArray = Construct2dArray(columns, rows, true);
  if (!isPaused) {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          let state = stateArray[i][j].cellState;
          let neighbors = tallyNeighbors(stateArray, i, j);

          if (state == 0 && neighbors == 3) {
            NextArray[i][j].setState(1);
          } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            NextArray[i][j].setState(0);
          } else {
            NextArray[i][j].setState(state);
          }
        }
      }
  } else { 
    NextArray = stateArray;
  }
  stateArray = NextArray;
}

//Count the neighbors
function tallyNeighbors(grid, currentCPosition, currentRPosition) {
  let neighborCount = 0;

  //loop through each adjacent cell (including self)
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // set selected cell x position to current cell position + position modifier + number of colunns/rows modulo columns/rows to account for edges
      let columnPosition = (currentCPosition + i + columns) % columns;
      let rowPosition = (currentRPosition + j + rows) % rows;
      //add the state to the neighborCount (either 1 or 0)
      neighborCount += grid[columnPosition][rowPosition].cellState;
    }
  }
  //subtract own state from total count because it was accounted for in original loop
  neighborCount -= grid[currentCPosition][currentRPosition].cellState;
  //return the neighbor count
  return neighborCount;
}

//Create 2d Array (take in boolean as parameter to decide whether cell states are randomized)
function Construct2dArray(columns, rows, isEmpty) {
  let TwoDArray = new Array(columns);
  for (let i = 0; i < TwoDArray.length; i++) {
    TwoDArray[i] = new Array(rows);
    for (let j = 0; j < TwoDArray[i].length; j++) {
      if (isEmpty) {
        TwoDArray[i][j] = new Cell(null);
      } else {
        TwoDArray[i][j] = new Cell(floor(random(2)));
      }
    }
  }
  return TwoDArray;
}


//cell class
class Cell {
  //declare the cell's state
  cellState = 0;
  
  //constructor to initialize the state of cell
  constructor(state) {
    this.cellState = state;
  }

  //change the cell state to the "setState" parameters
  setState(setState) {
    if (setState == 0) {
      this.cellState = 0;
    } else if (setState == 1) {
      this.cellState = 1;
    } else {
      this.cellState = this.cellState;
    }

  }
}

//Pause function for toggle button
function togglePause() {
  if (GamePaused) {
    GamePaused = false;
  } else {
    GamePaused = true;
  }
}

//mouse click cell function
function onClick() {
    if (mouseIsPressed) {
      //mouse position (x and y)
      x = floor(mouseX / resolution);
      y = floor(mouseY / resolution);

      if (x < columns && y < rows) {
        if (stateArray[x][y].cellState == 1) {
          stateArray[x][y].setState(0);
        } else {
          stateArray[x][y].setState(1);
        }
      }  
    }
}

//clear the grid (set states to 0)
function clearGrid() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      stateArray[i][j].setState(0);
    }
  }
}

//randomize grid states
function startRandom() {
  for (let i = 0; i < columns; i++) {
    for (j = 0; j < rows; j++) {
      stateArray[i][j].setState(floor(random(2)));
    }
  }
}

