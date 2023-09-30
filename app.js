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
  { name: "black", color: "rgb(0, 0, 0)" },
  { name: "random", color: randomColor },
  { name: "darken", color: darkenColor },
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
    box.setAttribute("style", "background-color: rgb(250, 235, 215)")
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

function randomColor(square) {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
};

function eraseColor(square) {
  // console.log(currentMode, square)
  if (square.className === "box" && currentMode === "eraser") {
    square.style.backgroundColor = "rgb(250, 235, 215)";
  }
}

function darkenColor(square) {
  let rgb = square.style.backgroundColor;
  let pattern = /(\d{1,3})/gm;
  let matches = rgb.match(pattern);
  const [initialRed, initialGreen, initialBlue] = matches.map(Number);

  let currentRed = initialRed;
  let currentGreen = initialGreen;
  let currentBlue = initialBlue;

  square.addEventListener('click', (e) => {    // Calculate the new color values based on the percentage reduction
 
      let percentageValue = 10;
      currentRed -= currentRed >= 0 ? initialRed * (percentageValue / 100) : 0; // reduce currentRed value with 10% of the initial color if currentRed greater than or equal 0, otherwise reduce it with 0;
      currentGreen -= currentGreen >= 0 ? initialGreen * (percentageValue / 100) : 0;
      currentBlue -= currentBlue >= 0 ? initialBlue * (percentageValue / 100) : 0;
      console.log(`${Math.round(currentRed)}, ${Math.round(currentGreen)}, ${Math.round(currentBlue)}`);
      square.style.backgroundColor = `rgb(${Math.round(currentRed)}, ${Math.round(currentGreen)}, ${Math.round(currentBlue)})`;
  });
}












