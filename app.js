//create h1
const h1 = document.createElement("h1");
h1.textContent = "Etch A Sketch";
h1.classList.add("h1");
document.body.appendChild(h1);

// create slider for drawGrid input paramter
const gridSizerContainer = document.createElement("div");
document.body.appendChild(gridSizerContainer);
gridSizerContainer.setAttribute("id", "grid-sizer-container");
gridSizerContainer.setAttribute("class", "grid-sizer-container");
const gridSizer = document.createElement("input");
gridSizer.setAttribute("type", "range");
gridSizer.setAttribute("min", "2");
gridSizer.setAttribute("max", "16");
gridSizer.setAttribute("id", "grid-sizer");
gridSizer.setAttribute("class", "grid-sizer");
gridSizer.setAttribute("value", "4");
const gridSizerLabel = document.createElement('label');
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

//create initial grid for game
document.addEventListener('DOMContentLoaded', drawGrid)
const gameGrid = document.createElement("section");
function drawGrid(){
  const initialGridSize = gridSizer.value;
  gameGrid.style.setProperty("--cssGridSize", initialGridSize);
  gameGrid.classList.add("game-grid");
  let totalBoxesCount = initialGridSize * initialGridSize;
  for (let i = 1; i <= totalBoxesCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    gameGrid.appendChild(box);
  }
  gameContainer.appendChild(gameGrid);
}





// draw lines in the grid
function drawLine(e) {
  const elem = e.target;
  if (elem )
  console.log(elem, elem.style);
  // elem.style.backgroundColor = yellow;
}

// create game settings section
const gameSettings = document.createElement("section");
gameSettings.classList.add('game-settings');
gameContainer.insertBefore(gameSettings, gameGrid);

// create buttons to choose colors for drawLine function
const colorSettings = ["black", "random", "lighten", "eraser", "dark-mode"]
for (let i = 0; i < colorSettings.length; i++) {
  const elem = document.createElement("button");
  elem.textContent = colorSettings[i];
  elem.classList.add(colorSettings[i], "color-setting");
  elem.setAttribute("id", colorSettings[i])
  gameSettings.appendChild(elem);
}


function getColor(r, g, b) {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  // console.log(r, g, b);
  return `rgb(${r}, ${g}, ${b})`
}









