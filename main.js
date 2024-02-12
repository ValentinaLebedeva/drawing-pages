const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const img = document.querySelector("img");
const btns = document.querySelector(".btns");
let color = document.querySelectorAll(".color");
let palette = document.querySelector(".palette");
const resetDrawingBtn = document.querySelector(".resetDrawing");
const yourColor = document.querySelector(".yourColor");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 8;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; //stops function from running when it is not mousedown

    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke()

    //update start point
    lastX = e.offsetX;
    lastY = e.offsetY;
};

//reset drawing
resetDrawingBtn.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});

// choosing a picture

function pickImg(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let chosenImg = document.querySelector(".img-btn--active");
    let number = e.target.getAttribute("data-number");
    if (e.target.classList.contains("img-btn")) {
        e.target.classList.add("img-btn--active");
        chosenImg.classList.remove("img-btn--active");

        document.querySelector(".img-wrapper").style.background = `url(./image${number}.jpeg)`;
        document.querySelector(".img-wrapper").style.backgroundRepeat = `no-repeat`;
        document.querySelector(".img-wrapper").style.backgroundSize = `contain`;
        document.querySelector(".img-wrapper").style.backgroundPosition = `center`;
    };
};

// choosing a color for drawing

function func() {
    console.log(getComputedStyle(this).backgroundColor)
    ctx.strokeStyle = getComputedStyle(this).backgroundColor;
    return ctx.strokeStyle;
}

// choose color from input
function pickYourColor() {
    ctx.strokeStyle = this.value;
}

btns.addEventListener("click", pickImg);
color.forEach(color => color.addEventListener("click", func));

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

yourColor.addEventListener("mouseout", pickYourColor);
yourColor.addEventListener("change", pickYourColor);