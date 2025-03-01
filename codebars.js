speed = 20;
frequency = 30;
trailFade= 2;
barcount = 0;
color = [0, 255, 0];
// If shots should generate at random space instead of the top
midcolShots = false;
function Bar(htmlElement) {
    this.id = barcount;
    barcount++;
    this.element = htmlElement;
    this.height = htmlElement.offsetHeight;
    this.width = htmlElement.offsetWidth;
    this.fontSize = parseInt(window.getComputedStyle(htmlElement).fontSize);
    this.columns = Math.floor(this.width / this.fontSize*1.67);
    this.rows = Math.floor(this.height / this.fontSize*0.84);
    this.charCount = this.columns * this.rows;
    // Array of 'shots' down the text. Each has x(col index) and y(row index)
    this.shots = [];
    this.cooldown = frequency;
    console.log(this.columns, this.rows, this.charCount);
    this.updateColor = function(charSpan, transition, transparency) {
        charSpan.style.transition = `color ${transition}s`;
        charSpan.style.color = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${transparency})`;
    };
    // Assigns new char to given <span> element (for individual chars)
    this.newChar = function (charSpan) {
        newchar = Math.floor(Math.random() * 94 + 33);
        charSpan.innerHTML = String.fromCharCode(newchar);
    };
    this.getChar = function(col, row) {
        if (col < this.columns && row < this.rows) {
            char = document.getElementById(`char[${col},${row}]${this.id}`)
            return char;
        }
        else return null;
    };
    this.updateShots = function() {
        for (let i = 0; i < this.shots.length; i++) {
            shot = this.shots[i];
            // Set previous char
            charSpan = this.getChar(shot[0], shot[1]-1);
            if (charSpan) {
                this.updateColor(charSpan, trailFade, 0);
            }
            // Set char at shot
            charSpan = this.getChar(shot[0], shot[1]);
            if (charSpan) {
                this.updateColor(charSpan, 0, 1);
                this.newChar(charSpan);
                this.shots[i] = [shot[0], shot[1]+1];
            }
            else {
                this.shots.splice(i,1);
            }
        }
    };
    this.update = function () {
        // New shot at random column
        this.cooldown -= frequency;
        if (this.cooldown < 0) {
            // New shot
            col = Math.floor(Math.random() * this.columns)
            row = midcolShots ? Math.floor(Math.random() * this.rows) : 0
            this.shots.push([col, row])
            // Reset cooldown
            this.cooldown = Math.floor(Math.random() * 50) + 70;
        }
        this.updateShots();
    };
    // Add spans of chars to bar
    this.element.innerHTML = "";
    for (let r = 0; r < this.rows; r++){
        for (let c = 0; c < this.columns; c++) {
            newChar = document.createElement("span");
            this.newChar(newChar);
            newChar.id = `char[${c},${r}]${this.id}`;
            newChar.style.transition = `color ${0}s`;
            this.element.appendChild(newChar);
        }
    }
    console.log(this.height);
    this.element.style.width = `${this.width}px`;
}
bars = []
function initBars() {
    bar_elements = document.getElementsByClassName("sidebar-code");
    for (let bar of bar_elements){
        newbar = new Bar(bar);
        bars.push(newbar);
    }
    return bars
}
setTimeout(initBars, 500);
function updateBars() {
    for (let bar of bars){
        bar.update();
    }
}
function setColor(r, g, b) {
    color = [r, g, b];
}
var rslider = document.getElementById("rslide");
var gslider = document.getElementById("gslide");
var bslider = document.getElementById("bslide");
var speedslider = document.getElementById("speed");
var freqslider = document.getElementById("freq");
var fadeslider = document.getElementById("fade");

rslider.oninput = function() {
    setColor(this.value, color[1], color[2])
} 
gslider.oninput = function() {
    setColor(color[0], this.value, color[2])
} 
bslider.oninput = function() {
    setColor(color[0], color[1], this.value)
} 
speedslider.oninput = function() {
    clearInterval(interval)
    speed = this.value;
    interval = window.setInterval(updateBars, 1000/speed);
    console.log(speed)
} 
freqslider.oninput = function() {
    frequency = this.value;
} 
fadeslider.oninput = function() {
    trailFade = this.value;
} 
interval = window.setInterval(updateBars, 1000/speed)