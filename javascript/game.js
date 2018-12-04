var ballsize = 10;
var canvas, ctx;    
var mX, mY;
var bounceX, bounceY; //koordinaten des Balls
var dirX = 1, dirY = -1;
var pannellift = 120;
var pWidth = 150; //Panel Breite
var pHeight = 20; //Panel Höhe
var posP; //Zentrierte Position des Panels (Mouse - Breite des Panels / 2)
var isdead = false;
var i = 0; //Hilfsvariable
var key_press;
var key_code;
var spielfeld;
var brickWidth; //Tatsächlich Platz pro Stein --> echte Width ist nachher brickWidth - 5
var cd = 5 // collisiondetection parameter
var score = 0;
var bouncefactor = 1;
var live = 3;
var h1 = 1;
var level;
var levelbreite
var hitmarkersound;
var multiplikator = 1;
var dauereffekt = 0;
var zZwischen;
var gewonnen = 0;  
//textures
var background = new Image();
var block1 = new Image();
var block2 = new Image();
var block3 = new Image();
var block4 = new Image();
var block5 = new Image();
var heart = new Image();
var x_heart = new Image();
var hitmarker = new Image();
var pannel = new Image();
var burnrow = new Image();



//Initialisierungsfunktion
function init() {
    
    //Canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "#000000 5px solid";
    posP = canvas.width/2-pWidth/2;

    //Texturen laden
    background.src = "./textures/pinkishskying.png";
    block1.src = "./textures/blockdesign1lowres.png"; 
    block2.src = "./textures/blockdesign2lowres.png"; 
    block3.src = "./textures/blockdesign3lowres.png";
    block4.src = "./textures/blockdesign4lowres.png";
    block5.src = "./textures/blockdesign5lowres.png";
    heart.src = "./textures/heart.png";
    x_heart.src = "./textures/X.png";
    hitmarker.src = "./textures/hitmarker.png";
    pannel.src = "./textures/pannel.png";
    burnrow.src = "./textures/burnrow.png";

    background.onload = function(){

     ctx.drawImage(background,0,0,1000,750);

    }

    //Start-Schriftzug
    ctx.fillStyle="#FFFFFF";
    ctx.font = "36px Agency FB";
    ctx.textAlign="center";
    ctx.fillText("Los geht's!", canvas.width/2, canvas.height/2);


    //Level Laden
    loadLevel("level.json");
    spielfeld = new Array();


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
    spielfeld = level.positions;
    brickWidth = canvas.width / spielfeld[1].length
    gamePending();
}


//Funktion die den Spielstatus gamePending inne hat
function gamePending(startkey) {
    //Startvariable 
    bounceY = canvas.height - pannellift - 10;
    bounceX = posP + pWidth/2;
    dirX = 1, dirY = -1;

    //Spielfeld leeren
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Game Layout
    ctx.drawImage(background,0,0,1000,750);

    //Male Spielfeld    
    drawPanel();
    drawScore();
    drawLevel();
    drawBall(); //Ball liegt auf dem Panel bis Taste gedrückt wird

    //Starte Spiel mit F
    ctx.fillStyle="#FFFFFF";
    ctx.font = "36px Agency FB";
    ctx.textAlign="center";
    ctx.fillText("Drücke A zum starten", canvas.width/2, 550)

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

    //Spielfeld neumalen
    drawPanel();
    drawBall();
    drawScore();
    drawLevel();

    //Multiplikator Effekt
    if (dauereffekt > 0) {
        ctx.drawImage(burnrow, 5, 50 + zZwischen * 50 + 5, canvas.width - 10, 20);
        dauereffekt--;
    }

    //Tod oder Weiter?
    dead();
}


function drawBall() {
    //Wo ist meine Kugel

    //Am Rand?
    if (bounceX >= canvas.width-ballsize || bounceX <= 0+ballsize) dirX *= -1;
    else if (bounceY >= canvas.height-ballsize || bounceY <= 0+ballsize) dirY *= -1;

    //Am Panel? Wenn ja, wie prallt der Ball ab?
    else if (
        bounceY >= canvas.height - pannellift - ballsize/2 && 
        bounceY <= canvas.height - pannellift - ballsize/2 +  pHeight &&
        bounceX >= posP   && 
        bounceX <= posP+pWidth*0.1) 
    {
        dirY *= -1;
        dirX = -1;
        bouncefactor = 2;
        //dirY *= ((posP + pWidth/2)-bounceX)/10; EXPERIMENT
    } 
    else if (
        bounceY >= canvas.height - pannellift - ballsize/2 &&
        bounceY <= canvas.height - pannellift - ballsize/2 +  pHeight &&
        bounceX >= posP   &&
        bounceX <= posP+pWidth*0.35) 
    {
        dirY *= -1;
        dirX = -1;
        bouncefactor = 1.5;
    } 
    else if (
        bounceY >= canvas.height - pannellift - ballsize/2 &&
        bounceY <= canvas.height - pannellift - ballsize/2 +  pHeight &&
        bounceX >= posP && 
        bounceX <= posP+pWidth*0.75) 
    {
        dirY *= -1;
        bouncefactor = 1;

    }
    else if (
        bounceY >= canvas.height - pannellift - ballsize/2 &&
        bounceY <= canvas.height - pannellift - ballsize/2 +  pHeight &&
        bounceX >= posP &&
        bounceX <= posP+pWidth*0.9) 
    {
        dirY *= -1;
        dirX = 1;
        bouncefactor = 1.5;
    } 
    else if (
        bounceY >= canvas.height - pannellift - ballsize/2 &&
        bounceY <= canvas.height - pannellift - ballsize/2 +  pHeight &&
        bounceX >= posP &&
        bounceX <= posP+pWidth*1) 
    {
        dirY *= -1;
        dirX = 1;
        bouncefactor = 2;
    } 
    else {      
        //Am Stein?
        for (var i = 0; i<spielfeld[1].length; i++) {
            for (var z = 0; z<spielfeld.length; z++) {
                //Gewonnen?
                //Bedingung Ecke eines Steines
                if (
                //Bedingung Ecke oben Links
                (bounceX >= brickWidth * i - cd) &&
                (bounceX <= brickWidth * i + cd) &&
                (bounceY >= 50 + z * 50 - cd) &&
                (bounceY <= 50 + z * 50 + cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20; 
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirY = -1;
                    dirX = -1;
                    score += 100*multiplikator;    
                    multiplikator += 0.1;  
                } else if (
                //Bedingung Ecke unten Links
                (bounceX >= brickWidth * i - cd) &&
                (bounceX <= brickWidth * i + cd) &&
                (bounceY >= 50 + z * 50 + 30 - cd) &&
                (bounceY <= 50 + z * 50 + 30 + cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirY = 1;
                    dirX = -1;
                    score += 100*multiplikator;
                    multiplikator += 0.1;  
                } else if (
                //Bedingung Ecke oben Rechts
                (bounceX >= brickWidth * i + brickWidth - 5 - cd) &&
                (bounceX <= brickWidth * i + brickWidth - 5 + cd) &&
                (bounceY >= 50 + z * 50 - cd) &&
                (bounceY <= 50 + z * 50 + cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirX = 1;
                    dirY = -1;
                    score += 100*multiplikator; 
                    multiplikator += 0.1;              
                } else if (
                //Bedingung Ecke unten Rechts
                (bounceX >= brickWidth * i + brickWidth - 5 - cd) &&
                (bounceX <= brickWidth * i + brickWidth - 5 + cd) &&
                (bounceY >= 50 + z * 50 + 30 - cd) &&
                (bounceY <= 50 + z * 50 + 30 + cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirX = 1;
                    dirY = 1;
                    score += 100*multiplikator; 
                    multiplikator += 0.1;  
                            
                }
                //Bedingung Kante eines Steines
                else if (
                //Bedingung obere Kante
                (bounceX >= brickWidth * i + cd) && //cd ist Parameter, wie viel Spielraum
                (bounceX <= brickWidth * i + brickWidth - 5 - cd) && //5 weil tatsächliche Brickwidth!
                (bounceY >= 50 + z * 50 - cd) &&
                (bounceY <= 50 + z * 50 + cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirY *=-1;
                    score += 100*multiplikator;    
                    multiplikator += 0.1;  
                } else if (
                //Bedingung untere Kante
                (bounceX >= brickWidth * i + cd) &&
                (bounceX <= brickWidth * i + brickWidth - 5 - cd) &&
                (bounceY >= 50 + z * 50 + 30 - cd) && //30 ist brickheight
                (bounceY <= 50 + z * 50 + 30 + cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirY *=-1;
                    score += 100*multiplikator;
                    multiplikator += 0.1;  
                } else if (
                //Bedingung links Kante
                (bounceX >= brickWidth * i - cd) &&
                (bounceX <= brickWidth * i + cd) &&
                (bounceY >= 50 + z * 50 + cd) &&
                (bounceY <= 50 + z * 50 + 30 - cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirX *=-1;
                    score += 100*multiplikator; 
                    multiplikator += 0.1;              
                } else if (
                //Bedingung rechte Kante
                (bounceX >= brickWidth * i + brickWidth - 5 - cd) &&
                (bounceX <= brickWidth * i + brickWidth - 5 + cd) &&
                (bounceY >= 50 + z * 50 + cd) &&
                (bounceY <= 50 + z * 50 + 30 - cd) &&
                (spielfeld[z][i] > 0)
                ) {
                    document.getElementById('1').play();
                    ctx.drawImage(hitmarker,bounceX-ballsize,bounceY-ballsize,50,50);
                    if (multiplikator >= 2.0) {
                        for (var mhilf = 0; mhilf < spielfeld[z].length; mhilf++) {
                            spielfeld[z][mhilf] -=1;
                            dauereffekt = 20;
                        }
                        zZwischen = z;
                        multiplikator = 1;
                    } else {
                        spielfeld[z][i] -= 1;
                    }
                    dirX *=-1;
                    score += 100*multiplikator; 
                    multiplikator += 0.1;  
                            
                }
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
    ctx.drawImage(pannel,posP,canvas.height - pannellift,pWidth,pHeight);
}


function drawScore() {
    ctx.fillStyle='#FFFFFF';
    ctx.font = "36px Agency FB";
    ctx.textAlign="left";
    ctx.fillText("ERROR 404",0,canvas.offsetTop+30);
    ctx.fillText(multiplikator, 0, 400);
    ctx.fillText("Score: "+score, 800,canvas.offsetTop+30);
    //Leben
    for (i = 1; i <= live; i++) {
        ctx.drawImage(heart,-25+i*35,680,30,30);
    }
    //Booster
    ctx.strokeStyle='#FFFFFF';
    ctx.strokeRect(canvas.width/2 - 200, 15, 400, 20);
    for (var b = 1; b <= 10 ; b++)
    {
        if (multiplikator >= 1 + b * 0.1) {
            ctx.fillRect(canvas.width/2 - 200 + 2 + (b - 1) * (390/10), 20, (390/10) - 5, 10);
        }
    }
}


function drawLevel() {
    //Level implementieren
    ctx.fillStyle='#0000FF';
    for (i = 0; i<spielfeld[1].length; i++) {
        for (z = 0; z<spielfeld.length; z++) {
            if (spielfeld[z][i] == 1 || spielfeld[z][i] >= 4) { //normaler Block oder andere Blöcke, welche nicht verarbeitet werden      
                ctx.drawImage(block1,i * brickWidth,50+z*35,brickWidth-5, 30);
            }
            if (spielfeld[z][i] == 2) {            
                ctx.drawImage(block2,i * (brickWidth),50+z*35,brickWidth-5, 30);
            }
            if (spielfeld[z][i] == 3) {
                ctx.drawImage(block3,i * (brickWidth),50+z*35,brickWidth-5, 30);
            }
            if (spielfeld[z][i] == 4) {
                ctx.drawImage(block4,i * (brickWidth),50+z*35,brickWidth-5, 30);
            }
            if (spielfeld[z][i] == 5) {
                ctx.drawImage(block5,i * (brickWidth),50+z*35,brickWidth-5, 30);
            }
            if (spielfeld[z][i] > 5) {
                spielfeld[z][i] = 5;
                ctx.drawImage(block5,i * (brickWidth),50+z*35,brickWidth-5, 30);
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
        multiplikator = 1;
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
            ctx.drawImage(x_heart,-25+(live+1)*35,680,30,30);
            setTimeout(menu, 600);
        }
        newGame();
    } else {
        gewonnen = 0;
        for (var i = 0; i<spielfeld[1].length; i++) {
            for (var z = 0; z<spielfeld.length; z++) {
                gewonnen += spielfeld[z][i];
            }
        }
        if (gewonnen == 0) {
            ctx.fillStyle="#FFFFFF";
            ctx.font = "36px Agency FB";
            ctx.textAlign="center";
            ctx.fillText("GEWONNEN",canvas.width/2, canvas.height/2);
            ctx.fillText("Glückwunsch",canvas.width/2, canvas.height/2 + 50);
            setTimeout(menu, 3000);
        } else {
            setTimeout(drawGame, 5);
        }
    }
}

function menu () {
    window.location.href = ("./mainmenu.html");
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
        setTimeout(newGame, 10);
    }  
}


function whichkey(key) {
    key_press = String.fromCharCode(key.keyCode);
    key_code = key.keyCode;  
    console.log(key_code, key_press);  
}
document.addEventListener("keydown", whichkey, false);


document.addEventListener("DOMContentLoaded",init, false);