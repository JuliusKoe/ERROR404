var ballsize = 10;
var canvas, ctx;    
var mX, mY;
var bounceX, bounceY;
var dirX = 1, dirY = -1;
var pWidth = 150; //Panel Breite
var pHeight = 20; //Panel Höhe
var posP; //Zentrierte Position des Panels (Mouse - Breite des Panels / 2)
var isdead = false;
var i = 0; //Hilfsvariable
var key_press;
var key_code;
var spielfeld;
var brickWidth;
var score = 0;
var bouncefactor = 1;
var live = 3;
var h1 = 1;
var level;
var hitmarkersound;
var background = new Image();
var block1 = new Image();
var block2 = new Image();
var block3 = new Image();
var heart = new Image();
var x_heart = new Image();
var hitmarker = new Image();



//Initialisierungsfunktion
function init() {
    
    //Canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "#000000 5px solid";
    posP = canvas.width/2-pWidth/2;

    //Images
    background.src = "./pinkishsky.jpg";
    block1.src = "./blockdesign1lowres.png"; 
    block2.src = "./blockdesign2lowres.png"; 
    block3.src = "./blocktexture3goldlowres.png";
    heart.src = "./heart.png";
    x_heart.src = "./X.png";
    hitmarker.src = "./hitmarker.png";

    background.onload = function(){

     ctx.drawImage(background,0,0,1000,750);

    }

    //Sounds
    //document.getElementById('1').play();
    // document.getElementById('1').pause();
    //hitmarkersound = new Audio("hitmarker_sound.mp3");
    //hitmarkersound.play();

    //Start-Schriftzug
    ctx.fillStyle="#FFFFFF";
    ctx.font = "30px Arial";
    ctx.textAlign="center";
    ctx.fillText("Los geht's!", canvas.width/2, canvas.height/2);

    
    //Level Laden
    loadLevel("level.json");
    console.log(level);
    spielfeld = new Array();
    
    // spielfeld = [
    //     [1, 0, 1, 0, 1, 0, 1, 0, 1],
    //     [1, 1, 3, 3, 3, 3, 3, 1, 1],
    //     [2, 1, 0, 2, 2, 2, 0, 1, 2],
    //     [0, 0, 0, 1, 2, 1, 0, 0, 0],
    //     [1, 0, 0, 1, 2, 1, 0, 0, 1]
    // ]
    //brickWidth = canvas.width / spielfeld[1].length


    //Wechsel in GamePending
    setTimeout(levelimplementation,600);
}


//Lädt Level aus einer JSON Datei
function loadLevel(levelName) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            levelDataRaw = this.responseText;
            level = JSON.parse(this.responseText);
            console.log("level loaded");
            console.log(level.name);
        }
    }
    xmlhttp.open("GET", levelName, true);
    xmlhttp.send();
}

//Weil loadlevel dauert, kleine Zeitüberbrückung
function levelimplementation() {
    console.log(level.name);
    spielfeld = level.positions;
    console.log(spielfeld);
    brickWidth = canvas.width / spielfeld[1].length
    gamePending();
}


//Funktion die den Spielstatus gamePending inne hat
function gamePending(startkey) {
    //Startvariable 
    bounceY = canvas.height - 41;
    bounceX = posP + pWidth/2;
    dirX = 1, dirY = -1;

    //Spielfeld leeren
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Game Layout
    ctx.drawImage(background,0,0,1000,750);
    //Todeszone
    ctx.fillStyle="#0404B4";
    ctx.fillRect(0,canvas.height-5,canvas.width,7);

    //Male Spielfeld    
    drawPanel();
    drawScore();
    drawLevel();
    drawBall(); //Ball liegt auf dem Panel bis Taste gedrückt wird

    //Starte Spiel mit F
    ctx.fillStyle="#FFFFFF";
    ctx.font = "30px Arial";
    ctx.textAlign="center";
    ctx.fillText("Drücke A zum starten", canvas.width/2, 40)

    if (key_press == "A") {
        drawGame();
    } else {
        setTimeout(gamePending,1);            
    }
}


//Funktion zum malen des Spielfelds
function drawGame() {
    //Spielfeld leeren
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Game Layout
    ctx.drawImage(background,0,0,1000,750);
    //Todeszone
    ctx.fillStyle="#0404B4";
    ctx.fillRect(0,canvas.height-5,canvas.width,7);

    //Spielfeld neumalen
    drawPanel();
    drawBall();
    drawScore();
    drawLevel();
    //Tod oder Weiter?
    dead();
}


function drawBall() {
    //Wo ist meine Kugel

    //Am Rand?
    if (bounceX >= canvas.width-ballsize || bounceX <= 0+ballsize) dirX *= -1;
    if (bounceY >= canvas.height-ballsize || bounceY <= 0+ballsize) dirY *= -1;

    //Am Panel? Wenn ja, wie prallt der Ball ab?
    if (bounceY >= canvas.height - 40 && bounceX >= posP   && bounceX <= posP+pWidth*0.1) {
        dirY *= -1;
        dirX = -1;
        bouncefactor = 2;
        //dirY *= ((posP + pWidth/2)-bounceX)/10; EXPERIMENT
    } 
    else if (bounceY >= canvas.height - 40 && bounceX >= posP   && bounceX <= posP+pWidth*0.35) 
    {
        dirY *= -1;
        dirX = -1;
        bouncefactor = 1.5;
    } 
    else if (bounceY >= canvas.height - 40 && bounceX >= posP   && bounceX <= posP+pWidth*0.75) 
    {
        dirY *= -1;
        bouncefactor = 1;

    } 
    else if (bounceY >= canvas.height - 40 && bounceX >= posP   && bounceX <= posP+pWidth*0.9) 
    {
        dirY *= -1;
        dirX = 1;
        bouncefactor = 1.5;
    } 
    else if (bounceY >= canvas.height - 40 && bounceX >= posP   && bounceX <= posP+pWidth*1) 
    {
        dirY *= -1;
        dirX = 1;
        bouncefactor = 2;
    }       
    
    //Am Stein?
    for (var i = 0; i<spielfeld[1].length; i++) {
        for (var z = 0; z<spielfeld.length; z++) {
            if (
            //Bedingung obere Kante
            (i * brickWidth <= bounceX) && 
            (bounceX <= i * brickWidth + brickWidth-5) &&
            (60+z*50-ballsize/2 >= bounceY) &&
            (bounceY >= 50+z*50-ballsize/2) &&
            (spielfeld[z][i] > 0)
            ) {
                document.getElementById('1').play();
                ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                spielfeld[z][i] -= 1;
                dirY *=-1
                score++;    
            } else if (
            //Bedingung untere Kante
            (i * brickWidth <= bounceX) && 
            (bounceX <= i * brickWidth + brickWidth-5) &&
            (50+z*50+40 + ballsize/2 >= bounceY) && //30 ist Brickheight
            (bounceY >= 50+z*50+30 + ballsize/2) &&
            (spielfeld[z][i] > 0)
            ) {
                document.getElementById('1').play();
                ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                spielfeld[z][i] -= 1;
                dirY *=-1
                score++;
            } else if (
            //Bedingung rechte Kante
            (i * brickWidth+ballsize/2 <= bounceX) && 
            (bounceX <= i * brickWidth+10+ballsize/2) &&
            (50+z*50+50 >= bounceY) && //30 ist Brickheight
            (bounceY >= 50+z*50) &&
            (spielfeld[z][i] > 0)
            ) {
                document.getElementById('1').play();
                ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                spielfeld[z][i] -= 1;
                dirX *=-1
                score++;             
            } else if (
            //Bedingung linke Kante
            (i-1 * brickWidth-ballsize/2 <= bounceX) && 
            (bounceX <= i-1 * brickWidth-10-ballsize/2) &&
            (50+z*50+30 >= bounceY) && //30 ist Brickheight
            (bounceY >= 50+z*50) &&
            (spielfeld[z][i] > 0)
            ) {
                document.getElementById('1').play();
                ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                spielfeld[z][i] -= 1;
                dirX *=-1;
                score++;              
            }
        }
    }

    //Neue Berechnung des Balles
    bounceX += 4 * bouncefactor * dirX;
    bounceY += 3 * dirY;

    //Male Kugel
    ctx.fillStyle='#FFFFFF';
    ctx.beginPath();
    ctx.arc(bounceX,bounceY,ballsize,0,2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
}


function drawPanel() {
    ctx.fillStyle='#00FF00';
    ctx.fillRect(posP,canvas.height - 30,pWidth,pHeight);
}


function drawScore() {
    ctx.fillStyle='#FFFFFF';
    ctx.font = "30px Arial";
    ctx.textAlign="left";
    ctx.fillText("ERROR 404",0,canvas.offsetTop+20);
    ctx.fillText("Score: "+score, 850, 30);
    for (i = 1; i <= live; i++) {
        ctx.drawImage(heart,-25+i*35,680,30,30);
    }
}


function drawLevel() {
    //Level implementieren
    ctx.fillStyle='#0000FF';
    for (i = 0; i<spielfeld[1].length; i++) {
        for (z = 0; z<spielfeld.length; z++) {
            if (spielfeld[z][i] == 1 || spielfeld[z][i] >= 4) { //normaler Block oder andere Blöcke, welche nicht verarbeitet werden      
                ctx.drawImage(block1,i * (canvas.width/spielfeld[1].length),50+z*50,canvas.width/spielfeld[1].length-5, 30);
            }
            if (spielfeld[z][i] == 2) {            
                ctx.drawImage(block2,i * (canvas.width/spielfeld[1].length),50+z*50,canvas.width/spielfeld[1].length-5, 30);
            }
            if (spielfeld[z][i] == 3) {
                ctx.drawImage(block3,i * (canvas.width/spielfeld[1].length),50+z*50,canvas.width/spielfeld[1].length-5, 30);
            }
        }
    }
}



function panel(mouse) {
    mX = mouse.clientX-canvas.offsetLeft
    mY = mouse.clientY-canvas.offsetTop
    
    //Ist das Panel am Rand? 
    //So verschwindet das Panel nicht im Nirvana, sondern bleibt am Rand.
    if (mX > canvas.width - pWidth/2) {
        posP = canvas.width - pWidth;
    } else if (mX < 75) {
        posP = 0;
    } else {
        posP = mX - pWidth/2;
    }
}
document.addEventListener("mousemove", panel, false);




//Bin ich "dead" (Ball ist in der "Todeszone" oder geht das Spiel weiter?
function dead() {
    if (bounceY >= canvas.height-ballsize) {
        ctx.textAlign="center";
        ctx.fillStyle='#FFFFFF';
        isdead = true;
        live--;
        if (live > 0) {
            ctx.fillText("DEATH",canvas.width/2, canvas.height/2);
            ctx.fillText("Für neues Spiel Leertaste",canvas.width/2, canvas.height/2 + 50);
            ctx.drawImage(x_heart,-25+(live+1)*35,680,30,30);
        }
        if (live == 0) {
            ctx.fillText("GAME OVER",canvas.width/2, canvas.height/2);
            ctx.fillText("F5 to restart Game",canvas.width/2, canvas.height/2 + 50);
            ctx.drawImage(x_heart,-25+(live+1)*35,680,30,30);
        }
        newGame();
    } else {
        setTimeout(drawGame, 5);
    }
}


//Leertaste wurde gedrückt -> Neues Game wird gestartet
function newGame() {
    if (isdead == true && key_press == " ") {
        ctx.textAlign="center";
        ctx.fillStyle='#FFFFFF';
        ctx.fillText("Neues Game startet sofort!",canvas.width/2, canvas.height/2 + 200);
        bounceX = 300;
        bounceY = 100;
        dirX = 1;
        dirY = 1;
        isdead = false;
        setTimeout(gamePending, 700)
    } else {
        setTimeout(newGame, 5);
    }  
}


function whichkey(key) {
    key_press = String.fromCharCode(key.keyCode);
    key_code = key.keyCode;  
    console.log(key_code, key_press);  
}
document.addEventListener("keydown", whichkey, false);


document.addEventListener("DOMContentLoaded",init, false);