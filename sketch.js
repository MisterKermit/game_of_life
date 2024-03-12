//Daniel Lin Create Task

let array;

let resolution = 10;
let columns;
let rows;
 
function setup() {
    frameRate(6);
    createCanvas(1200, 800);
    columns = width / resolution;
    rows = height / resolution;
    array = Create2dArray(columns, rows);
}

function draw() {
    background(0);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (array[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }
    resume();
}

function resume() {
   let NextArray = Create2dArray(columns, rows);
   for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        var state = array[i][j];

        var neighbors = tallyNeighbors(array, i, j);

        if (state == 0 && neighbors == 3) {
            NextArray[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
            NextArray[i][j] = 0;
        } else {
            NextArray[i][j] = state;
        }
    }
   } 
   array = NextArray;
}

function tallyNeighbors(grid, currentCPosition, currentRPosition) {
    let neighborCount = 0;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let columnPosition = (currentCPosition + j + columns) % columns;
            let rowPosition = (currentRPosition + j + rows) % rows;
            neighborCount += grid[columnPosition][rowPosition];
        }
    }
    sum -= grid[currentCPosition][currentRPosition];
    return neighborCount;
}


function Create2dArray(columns, rows) {
    columnArray = Array.from(Array(rows), () => new Array(columns).fill(floor(random(2))));
    return columnArray;
}