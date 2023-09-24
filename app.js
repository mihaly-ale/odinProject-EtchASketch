// add grid container for boxes
const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

// getting grid sizes from customer input
let gridSize = 0;
const gridSizeInput = document.createElement("input");
gridSizeInput.classList.add("input-grid-size")
gridSizeInput.setAttribute("id", "gridSizeInput")
document.body.insertBefore(gridSizeInput, container);
gridSizeInput.addEventListener('keyup', (e) => {  
   gridSize = parseInt(e.target.value);
   container.style.setProperty("--gridSize", gridSize)
});

const labelForInput =  document.createElement("label");
labelForInput.innerHTML= "Type in your grid size:";
labelForInput.setAttribute("for", "gridSizeInput")
document.body.insertBefore(labelForInput, gridSizeInput);



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


