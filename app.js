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

// draw the grid
function drawGrid(gridSize) {
  gameGrid.style.setProperty("--cssGridSize", cssGridSize);
  gameGrid.innerHTML = ""; //clear previous grid
  let totalBoxesCount = gridSize * gridSize; 
    for (let i = 1; i <= totalBoxesCount; i++) {
      const box = document.createElement("div");
      box.innerText = i;
      box.classList.add("box");
      gameGrid.appendChild(box);
    } 
}

// draw lines
const gameGrid = document.createElement("section");
gameGrid.classList.add("game-grid");
gameContainer.appendChild(gameGrid);
gameGrid.addEventListener('mouseover', drawLine);
function drawLine(e, color) {
  const elem = e.target;
  color = getColor();  
  elem.style.backgroundColor = color;
}

function getColor(r, g, b) {
  r = Math.floor(Math.random()*255);
  g = Math.floor(Math.random()*255);
  b = Math.floor(Math.random()*255);
  console.log(r, g, b);
  return `rgb(${r}, ${g}, ${b})`
}

const gameSettings = document.createElement("section");
gameSettings.classList.add('game-settings')
gameContainer.appendChild(gameSettings);

const colorSettings = ["black", "random", "lighten", "eraser", "dark-mode"]
for(let i = 0; i < colorSettings.length; i++) {
  const elem = document.createElement("button");
  elem.textContent = colorSettings[i];
  elem.classList.add(colorSettings[i])
  gameSettings.appendChild(elem);
}





