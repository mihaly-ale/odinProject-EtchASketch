//create h1
const h1 = document.createElement("h1");
h1.textContent = "Etch A Sketch";
h1.classList.add("h1");
document.body.appendChild(h1);

// create slider for drawGrid input paramter
const gridSizerContainer =  document.createElement("div");
document.body.appendChild(gridSizerContainer);
gridSizerContainer.setAttribute("id", "grid-sizer-container");
gridSizerContainer.setAttribute("class", "grid-sizer-container");
const gridSizer = document.createElement("input");
gridSizer.setAttribute("type", "range");
gridSizer.setAttribute("min", "2");
gridSizer.setAttribute("max", "16");
gridSizer.setAttribute("id", "grid-sizer");
gridSizer.setAttribute("class", "grid-sizer");
gridSizer.setAttribute("value", "10"); 
const gridSizerLabel =  document.createElement('label');
gridSizerLabel.setAttribute("for", "grid-sizer");
gridSizerLabel.setAttribute("id", "grid-sizer-label");
gridSizerLabel.classList.add("grid-sizer-label")
const span = document.createElement("span");
span.textContent = `${gridSizer.value} x ${gridSizer.value}`;
gridSizerLabel.appendChild(span);
gridSizerContainer.appendChild(gridSizer);
gridSizerContainer.appendChild(gridSizerLabel);

//create layout for game (children: gameSettings, gameGrid)
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
document.body.appendChild(gameContainer);

//create initial game grid
const gameGrid = document.createElement("section");
const initialGridSize = gridSizer.value;
gameGrid.style.setProperty("--cssGridSize", initialGridSize);
let totalBoxesCount = initialGridSize * initialGridSize; 
for (let i = 1; i <= totalBoxesCount; i++) {
  const box = document.createElement("div");
  gameGrid.appendChild(box);
  box.classList.add("box");
}
gameGrid.classList.add("game-grid");
gameGrid.classList.add("grid-size-default"); // 
gameContainer.appendChild(gameGrid);

// event listener to trigger drawGrid
gridSizer.addEventListener("click", (e) => {
  const gridSize = e.target.value;
  drawGrid(gridSize);
});

// draw the grid, create child gameGrid
function drawGrid(gridSize) {  
  // gameGrid.style.setProperty("--cssGridSize", gridSize);
  gameGrid.classList.replace("grid-size-default", "grid-size-updated");
  gameGrid.innerHTML = ""; //clear previous grid  
    for (let i = 1; i <= totalBoxesCount; i++) {
      const box = document.createElement("div");
      box.innerText = i;     
      gameGrid.appendChild(box);
    } 
}



// draw lines in the grid
gameGrid.addEventListener('mouseover', drawLine);
function drawLine(e, color) {
  const elem = e.target;
  color = getColor();  
  elem.style.backgroundColor = color;
}

// create game settings section
const gameSettings = document.createElement("section");
gameSettings.classList.add('game-settings');
gameContainer.insertBefore(gameSettings, gameGrid);

function getColor(r, g, b) {
  r = Math.floor(Math.random()*255);
  g = Math.floor(Math.random()*255);
  b = Math.floor(Math.random()*255);
  // console.log(r, g, b);
  return `rgb(${r}, ${g}, ${b})`
}

const colorSettings = ["black", "random", "lighten", "eraser", "dark-mode"]
for(let i = 0; i < colorSettings.length; i++) {
  const elem = document.createElement("button");
  elem.textContent = colorSettings[i];
  elem.classList.add(colorSettings[i]);
  elem.setAttribute("id", colorSettings[i])
  gameSettings.appendChild(elem);
}










