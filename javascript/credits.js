var canvasWidth = 1000;
var canvasHeight = 750;
var canvas, ctx;

var backxpos = 400;
var backxwidth = 200;
var backypos = 625;
var backyheight = 100;
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
        drawBackbutton();
    }

}

function drawBackbutton () {
    ctx.drawImage(button,backxpos,backypos,backxwidth,backyheight);

    ctx.fillStyle = "#000000";
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("Back", canvasWidth/2 - 25 , 675);


    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("ERROR404 - Arkanoid", 25, 25);
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("v1.0", 25, 50);
    ctx.font = "bold 28px Agency FB";
    ctx.fillText("Projektrahmen", 25, 100);
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("Dieses Projekt wurde im Rahmen der Vorlesung Projekte der Wirtschaftinformatik an der FHDW ", 25, 125);
    ctx.fillText("Bergisch Gladbach durchgeführt.", 25, 150);
    ctx.font = "bold 28px Agency FB";
    ctx.fillText("Autoren", 25, 200);
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("Julius Körner und Marcel Lindner", 25, 225);
    ctx.font = "bold 28px Agency FB";
    ctx.fillText("Lizenzen", 25, 275);
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("Eigen: MIT", 25, 300);
    ctx.fillText("Alle verwendeten Grafiken nutzen die Creative Commons Zero Lizens", 25, 325);
    ctx.font = "bold 28px Agency FB";
    ctx.fillText("How 2 play", 25, 375);
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("1. Im Menü auf Spiel starten klicken", 25, 400);
    ctx.fillText("2. A drücken", 25, 425);
    ctx.fillText("3. Mit der Maus das Pannel auf der unteren Seite bewegen und den Ball treffen", 25, 450);
    ctx.font = "bold 28px Agency FB";
    ctx.fillText("Known Bugs", 25, 500);
    ctx.font = "bold 24px Agency FB";
    ctx.fillText("  ", 25, 525);
    
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