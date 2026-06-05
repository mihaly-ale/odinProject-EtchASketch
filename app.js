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
let initialGridSize = slider.value;
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

// when the slider clicked, the gameGrid gets the new size
slider.addEventListener('click', (e) => {
	newGridSize = e.target.value;
	gameGrid.style.setProperty('--cssGridSize', newGridSize);
	gameGrid.innerHTML = '';
	sliderLabelSpan.textContent = `${newGridSize} x ${newGridSize}`;
	drawGrid(newGridSize);
});

const buttons = document.querySelectorAll('.color-button');

colorPicker.addEventListener('input', (e) => {
	if (currentMode != 'color-button') {
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
gameGrid.addEventListener('mouseover', drawLine);
function drawLine(e) {
	const square = e.target;
	const setColor = getColor(currentMode);
	setColor(square);
}

// return the function from the colorButtons array
function getColor(currentMode) {
	if (currentMode !== 'color-button') {
		for (let i = 1; i < colorButtons.length; i++) {
			if (currentMode === colorButtons[i].id) {
				return colorButtons[i].mode;
			}
		}
	}
	return colorButtons[0].mode;
}

function pickColor(square) {
	square.style.backgroundColor = colorPicker.value;
}

function randomColor(square) {
	r = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
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
	const [initialRed, initialGreen, initialBlue] = matches.map(Number);

	let currentRed = initialRed;
	let currentGreen = initialGreen;
	let currentBlue = initialBlue;

	square.addEventListener('click', (e) => {
		// Calculate the new color values based on the percentage reduction
		let percentageValue = 10;
		currentRed -= currentRed >= 0 ? initialRed * (percentageValue / 100) : 0; // reduce currentRed value with 10% of the initial color if currentRed greater than or equal 0, otherwise reduce it with 0;
		currentGreen -=
			currentGreen >= 0 ? initialGreen * (percentageValue / 100) : 0;
		currentBlue -= currentBlue >= 0 ? initialBlue * (percentageValue / 100) : 0;
		square.style.backgroundColor = `rgb(${Math.round(currentRed)}, ${Math.round(currentGreen)}, ${Math.round(currentBlue)})`;
	});
}

function clearGrid() {
	console.log('here');
	gameGrid.innerHTML = '';
	const newGridSize = slider.value;
	gameGrid.style.setProperty('--cssGridSize', newGridSize);
	drawGrid(newGridSize);
	sliderLabelSpan.textContent = `${newGridSize} x ${newGridSize}`;
}

const footer = document.createElement('div');
footer.setAttribute('class', 'footer');
const footerPara = document.createElement('p');
footerPara.innerHTML = `Made by <a href="https://www.linkedin.com/in/mihaly-ale">Mihaly Ale</a> for <a href="https://www.theodinproject.com/">TOP</a> Etch-A-Sketch.`;
footer.appendChild(footerPara);
gameContainer.parentNode.insertBefore(footer, gameContainer.nextSibling);
