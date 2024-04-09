//Daniel Lin Create Task

let stateArray;
var gridDiv = document.getElementById('GridColumn');
let resolution;
let columns;
let rows;
let temp;
let len;
let GamePaused = false;
let canvas;
var canvasWidth;
var canvasHeight;


function setup() {
  frameRate(10);

  resolution = 10;
  canvasWidth = 800;
  canvasHeight = 600;

  columns = canvasWidth / resolution;
  rows = canvasHeight / resolution;
  console.log(rows);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("GridColumn");

  stateArray = CreateStarting2dArray(columns, rows);
}

function draw() {

  background(0);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (stateArray[i][j].cellState == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  if (GamePaused) {
    onClick();
    resume(true);
  } else {
    onClick();
    resume(false);
  }

}

function resume(isPaused) {
  frameRate(10);
  let NextArray = CreateEmpty2dArray(columns, rows);
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

function tallyNeighbors(grid, currentCPosition, currentRPosition) {
  let neighborCount = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let columnPosition = (currentCPosition + i + columns) % columns;
      let rowPosition = (currentRPosition + j + rows) % rows;
      neighborCount += grid[columnPosition][rowPosition].cellState;
    }
  }
  neighborCount -= grid[currentCPosition][currentRPosition].cellState;
  return neighborCount;
}


function CreateStarting2dArray(columns, rows) {
  let randomizedArray = new Array(columns);
  for (let i = 0; i < randomizedArray.length; i++) {
    randomizedArray[i] = new Array(rows);
    for (let j = 0; j < randomizedArray[i].length; j++) {
      randomizedArray[i][j] = new Cell(floor(random(2)));
    }
  }
  return randomizedArray;
}

function CreateEmpty2dArray(columns, rows) {
  let emptyArray = new Array(columns);
  for (let i = 0; i < emptyArray.length; i++) {
    emptyArray[i] = new Array(rows);
    for (let j = 0; j < emptyArray[i].length; j++) {
      emptyArray[i][j] = new Cell(null);
    }
  }
  return emptyArray;
}

class Cell {
  cellState = 0;
  constructor(state) {

    this.cellState = state;
  }

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

function togglePause() {
  if (GamePaused) {
    GamePaused = false;
  } else {
    GamePaused = true;
  }
}

function onClick() {
    if (mouseIsPressed) {
      x = floor(mouseX / resolution);
      y = floor(mouseY / resolution);
      console.log(floor(x / resolution));
      console.log(floor(y / resolution));
      if (x <= columns && y <= rows) {
        if (stateArray[x][y].cellState == 1) {
          stateArray[x][y].setState(0);
        } else {
          stateArray[x][y].setState(1);
        }
      }  
    }
}

