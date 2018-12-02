var canvasWidth = 1000;
var canvasHeight = 750;
var canvas, ctx;

var backxpos = 400;
var backxwidth = 200;
var backypos = 625;
var backyheight = 100;
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
    console.log("test");
    ctx.fillStyle = "pink";
    ctx.fillRect(backxpos,backypos,backxwidth,backyheight);
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Back", canvasWidth/2 - 25 , 680);


    ctx.fillStyle = "#FFFFFF";
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
    if (xCord > backxpos && xCord < backxpos+backxwidth && yCord > backypos && yCord < backypos+backyheight)
    {
        goBack();
    }

}
document.addEventListener("DOMContentLoaded",init, false);
document.addEventListener("mousemove", setCords, false);
document.addEventListener("mousedown", checkField, false);