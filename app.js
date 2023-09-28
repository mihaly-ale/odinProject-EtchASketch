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

// create gameSettings buttons for color drawLines
// const colorSettings = [
//   {name: "black", value: "black"},
//   {name: "random", value: randomColor()},
//   {name: "lighten", value: lightenColor()},
//   {name: "eraser", value: eraseColor()},
//   {name: "dark-mode", value: switchMode()},
// ]
const colorSettings = [
  { name: "black", setColor: "black" },
  { name: "random", setColor: "yellow" },
  { name: "lighten", setColor: "red" },
  { name: "eraser", setColor: "brown" },
  { name: "dark-mode", setColor: "blue" },
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
  drawGrid(newGridSize);
})

// draw lines in the grid
gameGrid.addEventListener('mouseover', drawLine);
function drawLine(e) {
  const elem = e.target;
  const value = getColor(buttonName);
  elem.style.backgroundColor = value;
}

// create buttonName variable
const buttons = document.querySelectorAll(".color-setting")
let buttonName = "";
buttons.forEach((button) => button.addEventListener('click', () => {
  buttonName = button.id;
  getColor(buttonName);
}))

function getColor(buttonName) {
  for (let i = 0; i < colorSettings.length; i++) {
    ;
    if (buttonName == colorSettings[i].name) {
      // if button clicked equals the colorSetting array name, then it will return setColor value, which is a function
      const setColor = colorSettings[i].setColor;
      return setColor;
    }
  }
}

function randomColor(r, g, b) {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  // console.log(r, g, b);
  return `rgb(${r}, ${g}, ${b})`
}









