var canvasWidth = 1000;
var canvasHeight = 750;
var canvas, ctx;

var startxpos = 400;
var startxwidth = 200;
var startypos = 675;
var startyheight = 100;
var background = new Image();

function init () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "pink 5px solid";

    background.src = "./pinkishsky.jpg";

    background.onload = function(){
        ctx.drawImage(background,0,0,canvasWidth,canvasHeight);
        drawBackbutton();
    }
    
}
function drawBackbutton () {
    ctx.fillStyle = "pink";
    ctx.fillRect(backxpos,backypos,backxwidth,backyheight);
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Hier könnte Ihre Werbung stehen", 25, 25);
    }

function goBack () {
    window.location.href = ("./mainmenu.html");
}

function setCords (ev) {
  xCord = ev.clientX - canvas.offsetLeft
  yCord = ev.clientY - canvas.offsetTop
}
function checkField (){
    if (xCord > menuxpos && xCord < menuxpos+startxwidth && yCord > menuypos && yCord < menuypos+menuyheight)
    {
        goBack();
    }

}
document.addEventListener("DOMContentLoaded",init, false);
document.addEventListener("mousemove", setCords, false);
document.addEventListener("mousedown", checkField, false);