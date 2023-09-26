// add container for boxes
const gameGrid = document.createElement("div");
gameGrid.classList.add("game-grid");
document.body.appendChild(gameGrid);

// getting grid sizes from customer input
let gridSize = 0;
const gridSizeInput = document.createElement("input");
gridSizeInput.classList.add("input-grid-size")
gridSizeInput.setAttribute("id", "gridSizeInput")
document.body.insertBefore(gridSizeInput, gameGrid);
gridSizeInput.addEventListener('keyup', (e) => {  
   gridSize = parseInt(e.target.value);
   gameGrid.style.setProperty("--gridSize", gridSize)
});

// label for the input element
const labelForInput =  document.createElement("label");
labelForInput.innerHTML= "Type in your grid size:";
labelForInput.setAttribute("for", "gridSizeInput")
document.body.insertBefore(labelForInput, gridSizeInput);


//add button to draw the grid
const drawGridBtn = document.createElement("button");
drawGridBtn.innerText = "draw grid";
drawGridBtn.classList.add("make-grid-button")
document.body.insertBefore(drawGridBtn, gameGrid);
drawGridBtn.addEventListener('click', () =>{
  drawGrid(gridSize)
});

// draw the grid
function drawGrid(gridSize) {
  console.log(gridSize)
    let totalBoxesCount = gridSize * gridSize;
    for (let i = 1; i <= totalBoxesCount; i++) {
        const box = document.createElement("div");
        box.innerText = i;
        box.classList.add("box");
        gameGrid.appendChild(box);
    }
}


// todos:

// clear grid when creating new
// after TOP

