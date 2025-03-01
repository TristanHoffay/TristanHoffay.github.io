/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("Layout");
const canvasParent = document.getElementById("canvasView");

canvas.width = canvasView.clientWidth;
canvas.height = canvasView.clientHeight;

const ctx = canvas.getContext("2d");

var zoom = 1;
var panx = 0;
var pany = 0;

let snap = true;
let collisions = true;

let furnColor = "green";
let furnHoverColor = "lime"
let furnSelectColor = "orange";
let furnOutlineColor = "yellow";
let wallColor = "blue";
let wallHoverColor = "aqua";
let wallSelectColor= "mediumslateblue";
let wallOutlineColor = "cyan";
let wallEditColor = "white";

let editingBackgroundColor = "rgb(34, 36, 51)";
let collisionColor = "red";
let textColor = "white";

let furnitures = [];
let walls = [];

function Line (x, y) {
    this.x = x;
    this.y = y;
}

class Wall {
    constructor(length, width, color=wallColor) {
        this.type = "Wall";
        this.width = width;
        this.length = length;
        this.x = WorldX(canvas.width/2);
        this.y = WorldY(canvas.height/2);
        this.color = color;
        this.idx = walls.length;
        walls.push(this);
    }
}

class Furniture {
    constructor(name, length, width, color=furnColor) {
        this.type = "Furniture";
        this.name = name;
        this.length = length;
        this.width = width;
        this.x = WorldX(canvas.width/2);
        this.y = WorldY(canvas.height/2);
        this.color = color;
        this.mainColor = color;
        this.idx = furnitures.length;
        this.collisions = [];
        this.wallCollisions = [];
        furnitures.push(this);
    }
}

// // Make a simple box
// var table = new Furniture("Table", 40, 240);
// furnitures.push(table);

// var table2 = new Furniture("Table2", 120, 40);
// furnitures.push(table2);

// var wall1 = new Wall(200,5);
// walls.push(wall1);

function CanvasX(x) {
    x_c = (x * zoom) + panx + canvas.width/2;
    return x_c;
}
function CanvasY(y) {
    y_c = (y * zoom) + pany + canvas.height/2;
    return y_c;
}
function WorldX(x_c) {
    let x = x_c - canvas.width/2;
    x -= panx;
    x /= zoom;
    return x;
}
function WorldY(y_c) {
    let y = y_c - canvas.height/2;
    y -= pany;
    y /= zoom;
    return y;
}

function drawWalls() {
    for (let wall of walls) {
        // Draw in furniture view
        let pointx = CanvasX(wall.x);
        let pointy = CanvasY(wall.y);
        ctx.fillStyle = (editing && wall.color == wallColor) ? wallEditColor : wall.color;
        ctx.fillRect(CanvasX(wall.x-(wall.width/2)), CanvasY(wall.y-(wall.length/2)), wall.width*zoom, wall.length*zoom);

        ctx.beginPath();
        ctx.rect(CanvasX(wall.x-(wall.width/2)), CanvasY(wall.y-(wall.length/2)), wall.width*zoom, wall.length*zoom);
        ctx.strokeStyle = wallOutlineColor;
        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillStyle = textColor;
        ctx.fillText(wall.length+"\"", CanvasX(wall.x + wall.width/2)+10, pointy);
        ctx.fillText(wall.width+"\"", pointx, CanvasY(wall.y + wall.length/2)+20);
    }
}

function drawFurnitures() {
    for (let furn of furnitures) {
        // Draw in furniture view
        let pointx = CanvasX(furn.x);
        let pointy = CanvasY(furn.y);
        ctx.fillStyle = furn.color;
        ctx.fillRect(CanvasX(furn.x-(furn.width/2)), CanvasY(furn.y-(furn.length/2)), furn.width*zoom, furn.length*zoom);

        ctx.beginPath();
        ctx.rect(CanvasX(furn.x-(furn.width/2)), CanvasY(furn.y-(furn.length/2)), furn.width*zoom, furn.length*zoom);
        ctx.strokeStyle = furnOutlineColor;
        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillStyle = textColor;
        ctx.fillText(furn.name, CanvasX(furn.x - furn.width/8), CanvasY(furn.y + furn.length/8));
        ctx.fillText(furn.length+"\"", CanvasX(furn.x + furn.width/2)+10, pointy);
        ctx.fillText(furn.width+"\"", pointx, CanvasY(furn.y + furn.length/2)+20);
    }
}



// Stuff for furniture maker
var lenSlider = document.getElementById("Length");
var widSlider = document.getElementById("Width");
var furnName = document.getElementById("furnName");

var slideContainer = document.getElementById("slidecontainer");
var useColor = document.getElementById("useColor");
var rslider = document.getElementById("rslide");
var gslider = document.getElementById("gslide");
var bslider = document.getElementById("bslide");

function updateColorPicker() {
    slideContainer.style.backgroundColor = `rgb(${rslider.value}, ${gslider.value}, ${bslider.value})`;
}
rslider.oninput = updateColorPicker;
gslider.oninput = updateColorPicker;
bslider.oninput = updateColorPicker;
updateColorPicker();


function addFurniture() {
    if (editing) {
        // Add wall to room
        console.log("Adding wall");
        let newWall = new Wall(lenSlider.value, widSlider.value, wallColor)
        drawWalls();
    }
    else {
        console.log("Adding furniture");
        var color = `rgb(${rslider.value}, ${gslider.value}, ${bslider.value})`;
        let newFurn = new Furniture(furnName.value, lenSlider.value, widSlider.value, useColor.checked ? color : furnColor);
        furnName.value = "";
        drawFurnitures();
    }
}


lenSlider.value = 12;
widSlider.value = 12;


addFurnBtn = document.getElementById("AddFurnitureBtn");
addFurnBtn.onclick = addFurniture;


// For room editing
let editing = false;
let editBtn = document.getElementById("RoomEditBtn");

function clear() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function toggleEditing() {
    editing = !editing;
    clear();
    drawWalls();
    if (editing) {
        editBtn.innerHTML = "Confirm Edits";
        addFurnBtn.innerHTML = "Add Wall/Boundary";
        canvas.style.backgroundColor = editingBackgroundColor;
    }
    else {
        editBtn.innerHTML = "Edit Room";
        addFurnBtn.innerHTML = "Add Furniture";
        canvas.style.backgroundColor = "black";
        drawFurnitures()
    }
}
editBtn.onclick = toggleEditing;

function drawRoom() {
    if (editing) {
        // draw room lines
        drawWalls();
    }
    else {
        // draw room lines
        drawWalls();
        // draw furniture
        drawFurnitures();
    }
}

let isDragging = false;
let isPanning = false;
let offsetX, offsetY;
let lastMouseX, lastMouseY;
var selectedShape;

// Mouse down event to start dragging
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    if (event.button == 1) {
        isPanning = true;
    }
    else if (event.button == 0) {
        for (let obj of editing ? walls : furnitures) {
            if (isCursorInsideShape(mouseX, mouseY, obj)) {
                isDragging = true;
                offsetX = mouseX - CanvasX(obj.x);
                offsetY = mouseY - CanvasY(obj.y);
                selectedShape = obj;
            }
        }
        if (!isDragging) isPanning = true;
        else selectedShape.color = editing ? wallSelectColor : furnSelectColor;
    }
});

// Mouse up event to stop dragging
canvas.addEventListener('mouseup', () => {
    isDragging = false;
    isPanning = false;
    if (selectedShape) selectedShape.color = editing ? wallEditColor : (selectedShape.color == furnSelectColor ? selectedShape.mainColor : selectedShape.color);
    selectedShape = null;
});

// Check if the cursor is over the shape
function isCursorInsideShape(x, y, shape) {
    return (
        x > CanvasX(shape.x-(shape.width/2)) &&
        x < CanvasX(shape.x-(shape.width/2)) + shape.width*zoom &&
        y > CanvasY(shape.y-(shape.length/2)) &&
        y < CanvasY(shape.y-(shape.length/2)) + shape.length*zoom
    );
}

function checkCollision(shape) {
    if (!collisions) return;

    for (let wall of walls) {
        let diffx = shape.x - wall.x;
        let distx = Math.abs(diffx) - shape.width/2 - wall.width/2;
        let diffy = shape.y - wall.y;
        let disty = Math.abs(diffy) - shape.length/2 - wall.length/2;
        if (distx < 0 && disty < 0) {
            if (!shape.wallCollisions.includes(wall.idx)) {
                console.log("Collision between " + shape.name + " and wall");
                shape.wallCollisions.push(wall.idx);
            }
        }
        else if (shape.wallCollisions.includes(wall.idx)) {
            shape.wallCollisions.splice(shape.wallCollisions.indexOf(wall.idx),1);
            console.log("Exited collision between " + shape.name + " and wall");
        }
    }
    for (let furn of furnitures) {
        if (furn == shape) continue;
        let diffx = shape.x - furn.x;
        let distx = Math.abs(diffx) - shape.width/2 - furn.width/2;
        let diffy = shape.y - furn.y;
        let disty = Math.abs(diffy) - shape.length/2 - furn.length/2;
        if (distx < 0 && disty < 0) {
            if (!shape.collisions.includes(furn.idx)) {
                console.log("Collision between " + shape.name + " and " + furn.name);
                furn.color = collisionColor;
                shape.collisions.push(furn.idx);
                furn.collisions.push(shape.idx);
            }
        }
        else if (shape.collisions.includes(furn.idx)) {
            shape.collisions.splice(shape.collisions.indexOf(furn.idx),1);
            furn.collisions.splice(furn.collisions.indexOf(shape.idx),1);
            console.log("Exited collision between " + shape.name + " and " + furn.name);
            if (furn.collisions.length == 0 && furn.wallCollisions.length == 0) {
                furn.color = furn.mainColor;
            }
        }
    }
    if (shape.collisions.length > 0 || shape.wallCollisions.length > 0) {
        shape.color = collisionColor;
    }
    else shape.color = (selectedShape && selectedShape == shape) ? furnSelectColor : shape.mainColor;
}

// Add listener for mouse move
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (isDragging) {
        selectedShape.x = WorldX(mouseX - offsetX);
        selectedShape.y = WorldY(mouseY - offsetY);
        // For each edge of shape, if close enough to appropriate edge of other shapes, snap
        // If overlap, change color ?
        if (snap) {
            const snapDist = 5/zoom;
            for (let wall of walls) {
                let diffx = selectedShape.x - wall.x;
                let distx = Math.abs(diffx) - selectedShape.width/2 - wall.width/2;
                let diffy = selectedShape.y - wall.y;
                let disty = Math.abs(diffy) - selectedShape.length/2 - wall.length/2;
                // If left side of shape is near or past right side of wall
                if (distx < snapDist && distx > -snapDist && disty < 0) {
                    // If right side of shape is left of left side of wall
                    if (diffx < 0) {
                        selectedShape.x = wall.x - wall.width/2 - selectedShape.width/2;
                    }
                    else {
                        selectedShape.x = wall.x + wall.width/2 + selectedShape.width/2;
                    }
                }
                if (disty < snapDist && disty > -snapDist && distx < 0) {
                    // If right side of shape is left of left side of wall
                    if (diffy < 0) {
                        selectedShape.y = wall.y - wall.length/2 - selectedShape.length/2;
                    }
                    else {
                        selectedShape.y = wall.y + wall.length/2 + selectedShape.length/2;
                    }
                }
            }
            if (!editing) {
                for (let furn of furnitures) {
                    if (furn == selectedShape) continue;
                    let diffx = selectedShape.x - furn.x;
                    let distx = Math.abs(diffx) - selectedShape.width/2 - furn.width/2;
                    let diffy = selectedShape.y - furn.y;
                    let disty = Math.abs(diffy) - selectedShape.length/2 - furn.length/2;
                    // If left side of shape is near or past right side of furn
                    if (distx < snapDist && distx > -snapDist && disty < 10) {
                        // If right side of shape is left of left side of furn
                        if (diffx < 0) {
                            selectedShape.x = furn.x - furn.width/2 - selectedShape.width/2;
                        }
                        else {
                            selectedShape.x = furn.x + furn.width/2 + selectedShape.width/2;
                        }
                    }
                    if (disty < snapDist && disty > -snapDist && distx < 10) {
                        // If right side of shape is left of left side of furn
                        if (diffy < 0) {
                            selectedShape.y = furn.y - furn.length/2 - selectedShape.length/2;
                        }
                        else {
                            selectedShape.y = furn.y + furn.length/2 + selectedShape.length/2;
                        }
                    }
                }
                checkCollision(selectedShape);
            }
        }
    }
    else if (isPanning) {
        panx += mouseX - lastMouseX;
        pany += mouseY - lastMouseY;
    }
    for (let obj of editing ? walls : furnitures){
        if (!isDragging && isCursorInsideShape(mouseX, mouseY, obj)) {
            obj.color = editing ? wallHoverColor : (obj.color == obj.mainColor ? furnHoverColor : obj.color); // Change color when hovering
        } else if (!isDragging || obj != selectedShape) {
            obj.color = editing ? wallColor : (obj.color == furnHoverColor ? obj.mainColor : obj.color); // Revert color
        }
    }
    clear();
    drawWalls();
    if (!editing) drawFurnitures();
    lastMouseX = mouseX;
    lastMouseY = mouseY;
});

canvas.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
        zoom *= 1.1;
    } else {
        zoom *= .9;
    }
    clear();
    drawWalls();
    if (!editing) drawFurnitures();
    event.preventDefault(); // Prevent page scroll
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        if (isDragging) {
            let w = selectedShape.width;
            selectedShape.width = selectedShape.length;
            selectedShape.length = w;
            clear();
            drawWalls();
            if (!editing) drawFurnitures();
        }
    }
    if (event.key === 'x' || event.key === 'X') {
        if (isDragging) {
            if (selectedShape.type == "Wall") {
                walls.splice(selectedShape.idx, 1);
                for (let i = selectedShape.idx; i < walls.length; i++) {
                    walls[i].idx -= 1;
                }
            }
            else if (selectedShape.type == "Furniture") {
                furnitures.splice(selectedShape.idx, 1);
                for (let i = selectedShape.idx; i < furnitures.length; i++) {
                    furnitures[i].idx -= 1;
                }
            }
            // Remove idx from any other furn's collisions list and decrement any idx higher
            for (let furn of furnitures) {
                for (let i = 0; i < furn.collisions; i++) {
                    let sindex = null;
                    if (furn.collisions[i] > selectedShape.idx) {
                        furn.collisions[i] -= 1;
                    }
                    else if (furn.collisions[i] == selectedShape.idx) {
                        sindex = i;
                    }
                    if (sindex) furn.collisions.splice(sindex,1);
                }
            }
            delete selectedShape;
            clear();
            drawWalls();
            if (!editing) drawFurnitures();
        }
    }
    if (event.key === 'd' || event.key === 'D') {
        if (isDragging) {
            if (selectedShape.type == "Wall") {
                let newWall = new Wall(selectedShape.length, selectedShape.width);
            }
            else if (selectedShape.type == "Furniture") {
                console.log("Duplicating " + selectedShape);
                let newFurn = new Furniture(selectedShape.name, selectedShape.length, selectedShape.width, selectedShape.mainColor);
            }
            clear();
            drawWalls();
            if (!editing) drawFurnitures();
        }
    }
    if (event.key === 'n' || event.key === 'N') {
        if (isDragging) {
            if (selectedShape.type == "Furniture") {
                selectedShape.name = furnName.value;
            }
            clear();
            drawWalls();
            if (!editing) drawFurnitures();
        }
    }
    if (event.key === 'c' || event.key === 'C') {
        if (isDragging) {
            if (selectedShape.type == "Furniture") {
                selectedShape.mainColor = `rgb(${rslider.value}, ${gslider.value}, ${bslider.value})`;
            }
            clear();
            drawWalls();
            if (!editing) drawFurnitures();
        }
    }
});


// Import and export data

const dataBox = document.getElementById("jsonData");

function importData() {
    if (dataBox.value.length == 0) {
        alert("There is no text to import. Enter the JSON data from a previously exported layout.");
        return;
    }
    try {
        const data = JSON.parse(dataBox.value);
        furnitures = data["furniture"];
        walls = data["walls"];

        // Try to fix/clean imported data
        for (let i = 0; i < furnitures.length; i++) {
            furnitures[i].idx = i;
            furnitures[i].type = "Furniture";
            furnitures[i].collisions = [];
            furnitures[i].wallCollisions = [];
            furnitures[i].mainColor = furnitures[i].color;
        }
        for (let i = 0; i < walls.length; i++) {
            walls[i].idx = i;
            walls[i].type = "Wall";
        }


        //dataBox.value = "Layout successfuly imported."
    }
    catch(err) {
        alert("Could not import data. Make sure it is the data you got from exporting, and is valid JSON.");
    }
    clear();
    drawWalls();
    if (!editing) drawFurnitures();
}
function exportData() {
    if (walls.length == 0 && furnitures.length == 0) {
        alert("There is no layout data to export. Try adding walls and furniture.");
        return;
    }

    dataBox.value = JSON.stringify({
        "furniture": furnitures,
        "walls": walls
    });
    navigator.clipboard.writeText(dataBox.value);
    alert("Layout data copied to clipboard. Paste it somewhere to import later.");
}

document.getElementById("importBtn").onclick = importData;
document.getElementById("exportBtn").onclick = exportData;



drawWalls();
drawFurnitures();