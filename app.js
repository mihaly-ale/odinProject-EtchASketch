//create h1
const h1 = document.createElement("h1");
h1.textContent = "Etch A Sketch";
h1.classList.add("h1");
document.body.appendChild(h1);


const gridSizerContainer =  document.createElement("div");
document.body.appendChild(gridSizerContainer);
gridSizerContainer.setAttribute("id", "grid-sizer-container")
const gridSizer = document.createElement("input");
gridSizer.setAttribute("type", "range");
gridSizer.setAttribute("min", "2");
gridSizer.setAttribute("max", "16");
gridSizer.setAttribute("id", "grid-sizer");
gridSizer.setAttribute("value", "8"); 
const gridSizerLabel =  document.createElement('label');
gridSizerLabel.setAttribute("for", "grid-sizer");
gridSizerLabel.setAttribute("id", "grid-sizer-label");
gridSizerLabel.classList.add("space-between")
const spanMin = document.createElement("span");
const spanMax = document.createElement("span");
gridSizerLabel.appendChild(spanMin);
spanMin.textContent = "2"
gridSizerLabel.appendChild(spanMax);
spanMax.textContent = "16";

gridSizerContainer.appendChild(gridSizer);
gridSizerContainer.appendChild(gridSizerLabel);

// //add button to draw the grid
// const drawGridBtn = document.createElement("button");
// drawGridBtn.innerText = "draw grid";
// drawGridBtn.classList.add("draw-grid-button")
// inputSection.appendChild(drawGridBtn);
// drawGridBtn.addEventListener('click', () => {
//   const gridSize = gridSizeInput.value;
//   drawGrid(gridSize);
// });

//create layout for game (children: inputSection, gameSettings, gameGrid)
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
document.body.appendChild(gameContainer);


gridSizer.addEventListener("click", (e) => {
  const gridSize = e.target.value;
  drawGrid(gridSize);
});


function drawGrid(gridSize) {  
  gameGrid.style.setProperty("--cssGridSize", gridSize);
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










