// add grid container for boxes
const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

// getting grid sizes from customer input
let gridSize = 0;
const gridSizeInput = document.createElement("input");
document.body.insertBefore(gridSizeInput, container);
gridSizeInput.addEventListener('keyup', (e) => {  
   gridSize = parseIint(e.target.value);
   container.style.setProperty("--gridSize", gridSize)
});


// draw the grid
function drawGrid(gridSize) {
  console.log(gridSize)
    let totalBoxesCount = gridSize * gridSize;
    for (let i = 1; i <= totalBoxesCount; i++) {
        const box = document.createElement("div");
        box.innerText = i;
        box.classList.add("box");
        container.appendChild(box);
    }
}

drawGrid(gridSize);


