var canvasWidth = 800;
var canvasHeight = 600;
var canvas, ctx;
var startxpos = 300;
var startxwidth = 200;
var startypos = 250;
var startyheight = 100;
var background = new Image();
function init () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "pink 5px solid";

    background.src = "https://wallpapertag.com/wallpaper/full/7/a/1/627574-glitter-background-images-1920x1080-notebook.jpg";

    background.onload = function(){
        ctx.drawImage(background,0,0,canvasWidth,canvasHeight);
        drawStartbutton();
        
    }
    
}

function drawStartbutton () {
    ctx.fillStyle = "#631D9E";
    ctx.fillRect(startxpos,startypos,startxwidth,startyheight);
    ctx.stroke();

    ctx.fillStyle = "pink";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Start Game", (canvas.width / 2) - 45, (canvas.height / 2) + 8);
    }

function startGame () {
    window.location.href = ("./ingame.html");
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
}
document.addEventListener("DOMContentLoaded",init, false);
document.addEventListener("mousemove", setCords, false);
document.addEventListener("mousedown", checkField, false);