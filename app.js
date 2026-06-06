let newGridSize = '0';
let currentMode = 'color-button';
const CANVAS_COLOR = 'rgb(250, 235, 215)';
const CURRENT_COLOR = 'rgb(128, 0, 128)';

//add buttons to choose color
const colorButtons = [
	{ id: 'color-button', mode: pickColor },
	{ id: 'random', mode: randomColor },
	{ id: 'darken', mode: darkenColor },
	{ id: 'eraser', mode: eraseColor },
	{ id: 'clear', mode: clearGrid },
];

//create h1
const h1 = document.createElement('h1');
h1.textContent = 'Etch A Sketch';
h1.classList.add('h1');
document.body.appendChild(h1);

// create slider for drawGrid input paramter
const sliderContainer = document.createElement('div');
document.body.appendChild(sliderContainer);
sliderContainer.setAttribute('id', 'slider-container');
sliderContainer.setAttribute('class', 'slider-container');
const slider = document.createElement('input');
slider.setAttribute('type', 'range');
slider.setAttribute('min', '2');
slider.setAttribute('max', '30');
slider.setAttribute('id', 'slider');
slider.setAttribute('class', 'slider');
slider.setAttribute('value', '3');
const sliderLabel = document.createElement('label');
sliderLabel.setAttribute('for', 'slider');
sliderLabel.setAttribute('id', 'slider-label');
sliderLabel.classList.add('slider-label');
const sliderLabelSpan = document.createElement('span');
sliderLabelSpan.textContent = `${slider.value} x ${slider.value}`;
sliderLabel.appendChild(sliderLabelSpan);
sliderContainer.appendChild(slider);
sliderContainer.appendChild(sliderLabel);

//create layout for game (children: gameSettings, gameGrid)
const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
document.body.appendChild(gameContainer);

// create game settings section
const gameSettings = document.createElement('section');
gameSettings.classList.add('game-settings');
gameContainer.appendChild(gameSettings);

// create color picker
const colorPicker = document.createElement('input');
colorPicker.setAttribute('type', 'color');
colorPicker.setAttribute('value', `${CURRENT_COLOR}`);
colorPicker.setAttribute('class', 'color-picker');
colorPicker.setAttribute('id', `${colorButtons[0].id}`);
gameSettings.appendChild(colorPicker);

// create color picking buttons
for (let i = 1; i < colorButtons.length; i++) {
	const elem = document.createElement('button');
	elem.textContent = colorButtons[i].id;
	elem.classList.add('color-button');
	elem.setAttribute('id', colorButtons[i].id);
	gameSettings.appendChild(elem);
}

//create initial grid for game
const gameGrid = document.createElement('section');
const initialGridSize = slider.value;
gameGrid.style.setProperty('--cssGridSize', initialGridSize);
gameGrid.classList.add('game-grid');

function drawGrid(initialGridSize) {
	let totalBoxesCount = initialGridSize * initialGridSize;
	for (let i = 1; i <= totalBoxesCount; i++) {
		const box = document.createElement('div');
		box.classList.add('box');
		box.setAttribute('style', `background-color:${CANVAS_COLOR}`);
		gameGrid.appendChild(box);
	}
}
drawGrid(initialGridSize);
gameContainer.appendChild(gameGrid);

// when the slider is interacted with, the gameGrid gets the new size
slider.addEventListener('input', (e) => {
	newGridSize = e.target.value;
	gameGrid.style.setProperty('--cssGridSize', newGridSize);
	gameGrid.innerHTML = '';
	sliderLabelSpan.textContent = `${newGridSize} x ${newGridSize}`;
	drawGrid(newGridSize);
});

const buttons = document.querySelectorAll('.color-button');

colorPicker.addEventListener('input', (e) => {
	if (currentMode !== 'color-button') {
		currentMode = 'color-button';
		buttons.forEach((button) => button.classList.remove('active'));
	}
});

buttons.forEach((button) =>
	button.addEventListener('click', (e) => {
		currentMode = button.id;
		if (!button.classList.contains('active')) {
			buttons.forEach((otherButton) => otherButton.classList.remove('active'));
			button.classList.add('active');
		}
		if (e.target.id === 'clear') {
			clearGrid(initialGridSize, newGridSize);
		}
	}),
);

// draw lines in the grid
['mouseover', 'pointerdown'].forEach((ev) =>
	gameGrid.addEventListener(ev, paintSquare),
);
function paintSquare(e) {
	const square = e.target;
	const btn = colorButtons.find((b) => b.id === currentMode) || colorButtons[0];
	//btnMode matches a function name
	btn.mode(square);
}

function pickColor(square) {
	square.style.backgroundColor = colorPicker.value;
}

function randomColor(square) {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function eraseColor(square) {
	if (square.className === 'box' && currentMode === 'eraser') {
		square.style.backgroundColor = `${CANVAS_COLOR}`;
	}
}

function darkenColor(square) {
	let rgb = square.style.backgroundColor;
	let pattern = /(\d{1,3})/gm;
	let matches = rgb.match(pattern);
	const [red, green, blue] = matches.map(Number);
	const factor = 0.9;
	square.style.backgroundColor = `rgb(${Math.round(red * factor)}, ${Math.round(green * factor)}, ${Math.round(blue * factor)})`;
}

function clearGrid() {
	document.querySelectorAll('.box').forEach((box) => {
		box.style.backgroundColor = `${CANVAS_COLOR}`;
	});
}

const footer = document.createElement('div');
footer.setAttribute('class', 'footer');
const footerPara = document.createElement('p');
footerPara.innerHTML = `Made by <a href="https://www.linkedin.com/in/mihaly-ale">Mihaly Ale</a> for <a href="https://www.theodinproject.com/">TOP</a> Etch-A-Sketch.`;
footer.appendChild(footerPara);
gameContainer.parentNode.insertBefore(footer, gameContainer.nextSibling);
