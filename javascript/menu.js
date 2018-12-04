var canvasWidth = 1000;
var canvasHeight = 750;
var canvas, ctx;
var startxpos = 400;
var startxwidth = 200;
var startypos = 225;
var startyheight = 100;
var credxpos = 400;
var credxwidth = 200;
var credypos = 350;
var credyheight = 100;
var background = new Image();
var button = new Image();

function init () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "pink 5px solid";

    background.src = "./textures/pinkishsky.jpg";
    button.src = "./textures/buttontrans.png";

    background.onload = function(){
        ctx.drawImage(background,0,0,canvasWidth,canvasHeight);
        drawHead();
        drawStartbutton();
        drawCredbutton();
    }
}
function drawHead () {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px Agency FB";
    ctx.fillText("ERROR404", (canvas.width / 2) - 85, 120);
}
function drawStartbutton () {
    ctx.drawImage(button,startxpos,startypos,startxwidth,startyheight);
    //ctx.fillStyle = "pink";
    //ctx.fillRect(startxpos,startypos,startxwidth,startyheight);
    //ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("Start Game", (canvas.width / 2) - 45, (canvas.height / 2) -100);
    }
function drawCredbutton () {
    // ctx.fillStyle = "pink";
    // ctx.fillRect(credxpos,credypos,credxwidth,credyheight);
    // ctx.stroke();
    ctx.drawImage(button,credxpos,credypos,credxwidth,credyheight);
    
    ctx.fillStyle = "black";
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("Credits", (canvas.width / 2) - 30, (canvas.height / 2) +25);
    }

function startGame () {
    window.location.href = ("./ingame.html");
}
function startCred () {
    window.location.href = ("./credits.html");
}
function setCords (ev) {
  xCord = ev.clientX - canvas.offsetLeft
  yCord = ev.clientY - canvas.offsetTop
}
function checkField (){
    if (xCord > startxpos && xCord < startxpos+startxwidth && yCord > startypos && yCord < startypos+startyheight)
    {
        startGame();
    }
    if (xCord > credxpos && xCord < credxpos+credxwidth && yCord > credypos && yCord < credypos+credyheight)
    {
        startCred();
    }
}
document.addEventListener("DOMContentLoaded",init, false);
document.addEventListener("mousemove", setCords, false);
document.addEventListener("mousedown", checkField, false);