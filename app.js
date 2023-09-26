//create base layout

//game (control, gameGrid)
const h1 = document.createElement("h1");
h1.textContent = "Etch A Sketch";
h1.classList.add("h1");
document.body.appendChild(h1);

//create layout for game 
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
document.body.appendChild(gameContainer);


const inputSection =  document.createElement("section");
inputSection.classList.add("input-section");
gameContainer.appendChild(inputSection);
// label for the input element
const labelForInput =  document.createElement("label");
labelForInput.innerHTML= "Type in your grid size:";
labelForInput.setAttribute("for", "gridSizeInput")
inputSection.appendChild(labelForInput);

// getting grid sizes from customer input
let gridSize = 0;
const gridSizeInput = document.createElement("input");
gridSizeInput.classList.add("input-grid-size")
gridSizeInput.setAttribute("id", "gridSizeInput")
inputSection.appendChild(gridSizeInput);
// gridSizeInput.addEventListener('keyup', (e) => {  
//    gridSize = parseInt(e.target.value);
//    gameGrid.style.setProperty("--gridSize", gridSize)
// }); error, move down

//add button to draw the grid
const drawGridBtn = document.createElement("button");
drawGridBtn.innerText = "draw grid";
drawGridBtn.classList.add("make-grid-button")
inputSection.appendChild(drawGridBtn);
drawGridBtn.addEventListener('click', () =>{
  drawGrid(gridSize)
});


const gameSettings = document.createElement("section");
gameSettings.classList.add('game-settings')
const gameGrid = document.createElement("section");
gameGrid.classList.add("game-grid");
gameContainer.appendChild(inputSection);
gameContainer.appendChild(gameSettings);
gameContainer.appendChild(gameGrid);



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

