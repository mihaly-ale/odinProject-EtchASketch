//create h1
const h1 = document.createElement("h1");
h1.textContent = "Etch A Sketch";
h1.classList.add("h1");
document.body.appendChild(h1);

//create layout for game (children: inputSection, gameSettings, gameGrid)
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
document.body.appendChild(gameContainer);

//create inputSection (children: labelForInput, gridSizeInput, drawGridBtn)
const inputSection = document.createElement("section");
inputSection.classList.add("input-section");
gameContainer.appendChild(inputSection);

// label for the input element
const labelForInput = document.createElement("label");
labelForInput.innerHTML = "Type in your grid size:";
labelForInput.setAttribute("for", "gridSizeInput");
labelForInput.classList.add("label-for-input");
inputSection.appendChild(labelForInput);

// getting grid sizes from customer input
const gridSizeInput = document.createElement("input");
gridSizeInput.classList.add("input-grid-size")
gridSizeInput.setAttribute("id", "gridSizeInput")
inputSection.appendChild(gridSizeInput);
// updating css custom prop for grid
let cssGridSize = 0;
gridSizeInput.addEventListener('input', (e) => {
  cssGridSize = parseInt(e.target.value);
});

//add button to draw the grid
const drawGridBtn = document.createElement("button");
drawGridBtn.innerText = "draw grid";
drawGridBtn.classList.add("draw-grid-button")
inputSection.appendChild(drawGridBtn);
drawGridBtn.addEventListener('click', () => {
  const gridSize = gridSizeInput.value;
  drawGrid(gridSize);
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
  gameGrid.style.setProperty("--cssGridSize", cssGridSize);
  gameGrid.innerHTML = ""; //clear previous grid
  let totalBoxesCount = gridSize * gridSize; 
    for (let i = 1; i <= totalBoxesCount; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      gameGrid.appendChild(box);
    } 
}




