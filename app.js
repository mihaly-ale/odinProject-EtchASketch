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
gridSizer.setAttribute("value", "3");
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

// create game settings section
const gameSettings = document.createElement("section");
gameSettings.classList.add('game-settings');
gameContainer.appendChild(gameSettings);

//add buttons to choose color
const colorSettings = [
  { name: "black", color: "black" },
  { name: "random", color: randomColor },
  { name: "lighten", color: "red" },
  { name: "eraser", color: eraseColor },
  { name: "dark-mode", color: "blue" },
]
for (let i = 0; i < colorSettings.length; i++) {
  const elem = document.createElement("button");
  elem.textContent = colorSettings[i].name;
  elem.classList.add(colorSettings[i].name, "color-setting");
  elem.setAttribute("id", colorSettings[i].name)
  gameSettings.appendChild(elem);
}

//create initial grid for game
let initialGridSize = gridSizer.value;
const gameGrid = document.createElement("section");
gameGrid.style.setProperty("--cssGridSize", initialGridSize);
gameGrid.classList.add("game-grid");

function drawGrid(initialGridSize) {
  let totalBoxesCount = initialGridSize * initialGridSize;
  for (let i = 1; i <= totalBoxesCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    gameGrid.appendChild(box);
  }
}
drawGrid(initialGridSize);
gameContainer.appendChild(gameGrid);

// when the slider clicked, the gameGrid gets the new size
gridSizer.addEventListener('click', (e) => {
  const newGridSize = e.target.value;
  gameGrid.style.setProperty("--cssGridSize", newGridSize);
  gameGrid.innerHTML = "";
  span.textContent = `${newGridSize} x ${newGridSize}`;
  drawGrid(newGridSize);
})

// create currentMode variable
const buttons = document.querySelectorAll(".color-setting")
let anyIsActive = false;
let currentMode = "";

buttons.forEach((button) => button.addEventListener('click', (e) => {
  currentMode = button.id;
  // visually distinguish currentMode by changeing button style
  if (anyIsActive) {
    buttons.forEach(otherButton => otherButton.classList.remove("active"));
    button.classList.add("active");
  } else {
    button.classList.add("active");
    anyIsActive = !anyIsActive;
  }
}))

// draw lines in the grid 
gameGrid.addEventListener('mouseover', drawLine);
function drawLine(e) {
  const square = e.target;
  const setColor = getColor(currentMode);

  if (typeof setColor === "function") {
    setColor(square);
  } else {
    square.style.backgroundColor = setColor;
  }
}

function getColor(currentMode) {
  for (let i = 0; i < colorSettings.length; i++) {
    if (currentMode == colorSettings[i].name) {
      return colorSettings[i].color;
    }
  }
}

function randomColor(r, g, b) {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  // console.log(r, g, b);
  return `rgb(${r}, ${g}, ${b})`
};

function eraseColor(square) {
  console.log(currentMode, square)
  if (square.className === "box" && currentMode === "eraser") {
    square.style.backgroundColor = "antiquewhite";
  }
}












