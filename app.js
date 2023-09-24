// add grid container for boxes
const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);


// add boxes
let verticalBoxesCount = 16;
let horizontalBoxesCount = 16;

function drawGrid(verticalBoxesCount, horizontalBoxesCount) {
    let totalBoxesCount = verticalBoxesCount * horizontalBoxesCount;
    for (let i = 1; i <= totalBoxesCount; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        container.appendChild(box);
    }
}

drawGrid(verticalBoxesCount, horizontalBoxesCount);


