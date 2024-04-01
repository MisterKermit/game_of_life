//Daniel Lin Create Task

let stateArray;
var gridDiv = document.getElementById('GridColumn');
let resolution = 10;
let columns;
let rows;
let GamePaused = false;
let canvas;
var canvasWidth = gridDiv.offsetWidth;
var canvasHeight = gridDiv.offsetHeight;


function setup() {
    frameRate(10);
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("GridColumn");
    columns = width / resolution;
    rows = height / resolution;
    stateArray = CreateStarting2dArray(columns, rows);
}

function draw() {

    background(0);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (stateArray[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }
    if (!GamePaused)
    {
        resume();
    }

}

function resume() {
    frameRate(10);
    let NextArray = CreateEmpty2dArray(columns, rows);
   for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        let state = stateArray[i][j].state;

        let neighbors = tallyNeighbors(stateArray, i, j);

        if (state == 0 && neighbors == 3) {
            NextArray[i][j].state = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            NextArray[i][j].state = 0;
        } else {
            NextArray[i][j].state = state;
        }
    }
   } 
   stateArray = NextArray;
}

function tallyNeighbors(grid, currentCPosition, currentRPosition) {
    let neighborCount = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let columnPosition = (currentCPosition + i + columns) % columns;
            let rowPosition = (currentRPosition + j + rows) % rows;
            neighborCount += grid[columnPosition][rowPosition].state;
        }
    }
    neighborCount -= grid[currentCPosition][currentRPosition].state;
    return neighborCount;
}


function CreateStarting2dArray(columns, rows) {
  let randomizedArray = new Array(columns);
  for (let i = 0; i < randomizedArray.length; i++) {
    randomizedArray[i] = new Array(rows);
    for (let j = 0; j < randomizedArray[i].length; j++) {
      randomizedArray[i][j] = new Cell(i, j, floor(random(2)));
    }
  }
  return randomizedArray;
}

function CreateEmpty2dArray(columns, rows) {
    let emptyArray = new Array(columns);
    for (let i = 0; i < emptyArray.length; i++) {
        emptyArray[i] = new Array(rows);

    }
    return emptyArray;
}

class Cell {
    
    constructor(xPosition, yPosition, state) {
        this.xPosition = xPosition;
        this.yPosition = yPosition; 
        this.count = 0;
        this.state = state
    }


}

function togglePause() {
  if (GamePaused) {
    GamePaused = false;
    frameRate(10);
  } else {
    GamePaused = true;
    frameRate(0);
  }
}
function onClick() {
  if (mouseIsPressed) {
    x = (mouseX / canvasWidth);
    y = (mouseY / canvasHeight);
    stateArray[x][y].state = 1;
  }
}
