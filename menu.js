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

function init () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "pink 5px solid";

    background.src = "./pinkishsky.jpg";

    background.onload = function(){
        ctx.drawImage(background,0,0,canvasWidth,canvasHeight);
        drawStartbutton();
        drawCredbutton();
    }
    
}

function drawStartbutton () {
    ctx.fillStyle = "pink";
    ctx.fillRect(startxpos,startypos,startxwidth,startyheight);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Start Game", (canvas.width / 2) - 45, (canvas.height / 2) -92);
    }
function drawCredbutton () {
    ctx.fillStyle = "pink";
    ctx.fillRect(credxpos,credypos,credxwidth,credyheight);
    ctx.stroke();
    
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Credits", (canvas.width / 2) - 30, (canvas.height / 2) +32);
    }

function startGame () {
    window.location.href = ("./ingame.html");
}
function startGame () {
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