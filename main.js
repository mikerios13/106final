//Global Variables:
var score = 0;
// Have the game stop after 100 cars
var numCars = 100; // use a boolean to stop the game, game freezes and message comes up
var currentScene = 0; // 0 = Splash Screen 1 = Game
var currentColor = color(10, 71, 65);
var carSpeed = round(random(1,3));
var nextScore = 0; // if nextScore is 0, then scoring happens at the top, if nextScore is 1 scoring happens at the bottom.

//Frogger Game Rules:

/*
if bitmoji y is less 50 and nextScore
if bitmoji is greater than 350 and y is greater than 350 and nextScore
if bitmoji y is less than 50 add 2 to global score and if its greater than 350 add 2 point
add points for it going up and for it going down
*/


//Render Functions for bitmoji class:
var bitmojiHead = function (bitmojiX, bitmojiY, bitHeight)
{
// This is the code for the head.
fill(176, 108, 73);
ellipse(bitmojiX,bitmojiY,(bitHeight/100*83),(bitHeight/100*100));
stroke(0, 0, 0);
strokeWeight(4);
line(bitmojiX + (bitHeight/100*22), bitmojiY - (bitHeight/100*5), bitmojiX + (bitHeight/100* 6), bitmojiY- (bitHeight/100*4));// This is the code for the right eyebrow
line(bitmojiX - (bitHeight/100*20), bitmojiY - (bitHeight/100*5), bitmojiX - (bitHeight/100*4),bitmojiY-(bitHeight/100*4));// This is the code for the left eyebrow

noFill();
strokeWeight(1);
arc(bitmojiX+(bitHeight/100*1),bitmojiY-(bitHeight/100*1), (bitHeight/100*26),(bitHeight/100*46),62,117);// This is the code for the Nose 
line(bitmojiX-(bitHeight/100*2),bitmojiY+ (bitHeight/100*5),bitmojiX-(bitHeight/100*4),bitmojiY+(bitHeight/100*19)); // This is the code for the left nose line
line(bitmojiX+(bitHeight/100*4),bitmojiY+(bitHeight/100*5),bitmojiX+(bitHeight/100*7),bitmojiY+(bitHeight/100*19)); // This is the code for the right nose line
fill(176, 108, 73);
arc(bitmojiX-(bitHeight/100*34),bitmojiY+(bitHeight/100*3),(bitHeight/100*22),(bitHeight/100*27),85,242);// This is the code for the left ear
arc(bitmojiX+(bitHeight/100*35),bitmojiY+(bitHeight/100*3),(bitHeight/100*22),(bitHeight/100*27),304,458);// This is the code for the right ear
arc(bitmojiX+(bitHeight/100*1),bitmojiY+(bitHeight/100*50),(bitHeight/100*30),(bitHeight/100*13),1,180);// This is the code for the Neck
fill(10, 9, 10);// This is the code for the black hair
quad(bitmojiX- (bitHeight/100*40),bitmojiY-(bitHeight/100*7), bitmojiX- (bitHeight/100*47),bitmojiY-(bitHeight/100*36),bitmojiX-(bitHeight/100*14),bitmojiY- (bitHeight/100*50),bitmojiX-(bitHeight/100*32),bitmojiY-(bitHeight/100*1)); // This is the code for the left hair
quad(bitmojiX+(bitHeight/100*39),bitmojiY-(bitHeight/100*2), bitmojiX+(bitHeight/100*47),bitmojiY- (bitHeight/100*32),bitmojiX + (bitHeight/100*11),bitmojiY-(bitHeight/100*50),bitmojiX + (bitHeight/100*33),bitmojiY- (bitHeight/100*3)); // This is the code for the right hair
ellipse(bitmojiX,bitmojiY-(bitHeight/100*33),(bitHeight/100*93),(bitHeight/100*37));// This is the code for the top hair
fill(255, 255, 255);
ellipse(bitmojiX+ (bitHeight/100*13),bitmojiY + (bitHeight/100*1),(bitHeight/100*14),(bitHeight/100*7));// This is the code for the right eye
fill(101,67,33);// This is the code for the right pupil color
ellipse(bitmojiX + (bitHeight/100*13),bitmojiY + (bitHeight/100*1),(bitHeight/100*5),(bitHeight/100*5));// This is the code for the right pupil
fill(255, 255, 255);
ellipse(bitmojiX- (bitHeight/100*10),bitmojiY + (bitHeight/100*1),(bitHeight/100*14),(bitHeight/100*7));// This is the code for the left eye
fill(101,67,33);// This is the code for the left pupil color
ellipse(bitmojiX- (bitHeight/100*10),bitmojiY+ (bitHeight/100*1),(bitHeight/100*5),(bitHeight/100*5));// This is the code for the left pupil
fill(255, 255, 255);// This is the code for the white fill for teeth
arc(bitmojiX + (bitHeight/100*1), bitmojiY + (bitHeight/100*31),(bitHeight/100*30),(bitHeight/100*13),-2,180);// This is the code for the mouth
};

// Function for my Bitmoji Body
var bitmojiBody = function (bitmojiX, bitmojiY, bitHeight) 
{
// This is the code for the Body of my Bitmoji

fill(0, 0, 0);// This is the code for the black fill for body
 
if (currentScene === 0) {
    
    rect(bitmojiX -(bitHeight/100) - 35,bitmojiY + (bitHeight/100*85) - 40,(bitHeight/100*69),(bitHeight/100*65));// This is the code for the body
     
} else {
    
    rect(bitmojiX -(bitHeight/100),bitmojiY + (bitHeight/100*85),(bitHeight/100*69),(bitHeight/100*65));// This is the code for the body

    
}

fill(255, 255, 255);
// This is the code for the Chain
strokeWeight(4);
stroke(192, 192, 192);
arc(bitmojiX + (bitHeight/100*1),bitmojiY + (bitHeight/100*58),(bitHeight/100*30),(bitHeight/100*36),-16,199);
fill(255, 0, 0);
text("MR",bitmojiX- (bitHeight/100*32),bitmojiY+ (bitHeight/100*80),20,20);
};

// This draw function calls my bitmoji head and bitmoji body
var drawBitmoji = function(x, y, h){
    bitmojiHead(x,y, h);
    bitmojiBody(x, y, h);
    
};


// Bitmoji class (groups together rendering functions)
var Bitmoji = function(x, y) { // Bitmoji constructor function
    this.x = x;
    this.y = y;
    this.Cars = 0; // This is the score and change image for bitmoji
};

// Draw method
Bitmoji.prototype.draw = function() {
    
    this.x = constrain(this.x , 30, height-30);
    drawBitmoji(this.x, this.y, 50);
    
};

//Frogger Game Start:

//Move Bitmoji left or right depedning on input
Bitmoji.prototype.left = function() {
    this.x -= 5;
};
Bitmoji.prototype.right = function() {
    this.x += 5;
};

//Checks if bitmoji has crossed road to add score
Bitmoji.prototype.crossedRoad = function(){
    
    if((this.x >= 0 && this.x <= 50) && (nextScore ===0)) {
        score += 2;
        nextScore = 1;
    }
    if((this.x >= 350 && this.x <= 400) && (nextScore ===1)) {
        score += 2;
        nextScore = 0;
    }
    
};

//Checks if bitmoji has been hit by car to subtract score
Bitmoji.prototype.checkForCarGrab = function(car) {
    
    if ((car.x >= this.x && car.x <= (this.x + 40)) &&
    
        (car.y >= this.y && car.y <= (this.y + 40))) {
            
        car.y = -400; // Car disappears
        score--; // subtract one from the global variable score
        
    }

};

// Cars object class
var Car = function(x, y) { // Car constructor
    this.x = x;
    this.y = y;
};

Car.prototype.draw = function() {
    
    fill(3, 3, 3);
    rectMode(CENTER);
    //  rect(this.y, this.x - 6000, 21, 21);
    // rect(this.y, this.x - 6000, 40, 10);
    // ellipse(this.y + 10, this.x - 6000, 10,10); // right wheel
    // ellipse(this.y -10, this.x - 6000, 10,10); // left wheel
    
    rect(this.x, this.y, 21, 21);
    rect(this.x, this.y, 40, 10);
    ellipse(this.x, this.y, 10,10); // right wheel
    ellipse(this.x, this.y, 10,10); // left wheel
    
};


var bitmoji = new Bitmoji(200, 300); //Create new bitmoji object

var cars = []; // empty array and 100 new Cars for x and random y 

//Creates n number cars depending on numCars size:
for (var i = 0; i < numCars; i++) { 
    
    fill(255, 255, 255);
    rect(0,0,1200,1200);
    
    cars.push(new Car(random(20, 260), numCars - i * 120)); //offset by number of cars so they're all spaced out correctly
    
    fill(255, 255, 255);
    rect(0,0,1200,1200);
    
    if(numCars === i) {
        fill(255, 255, 255);
        rect(0,0,400,400);
    }
    
}

//Frogger Game End

//Tic Tac Toe Start:
var playerTurn = 0; //0 = X turn, 1 = O turn
var NUM_COLS = 3;
var NUM_ROWS = 3;
var SYMBOLS = ['X','O'];
var currentScene = 0; // 0 = splash; 1 = gameplay

var tiles = [];
/*
    0   3   6
    1   4   7
    2   5   8
    */

//Checks every time tiles are flipped if there's three matching in a row
var checkWin = function() {
    
    if (tiles[0].label === tiles[1].label && tiles[0].label === tiles[2].label && !tiles[0].empty())
    
    {return true;}
    
    else {
        
        if (tiles[0].label === tiles[3].label && tiles[0].label === tiles[6].label && !tiles[0].empty())
    
    {return true;}
    
    else {
        
        if (tiles[1].label === tiles[4].label && tiles[1].label === tiles[7].label && !tiles[1].empty())
        
        {return true;}
        
        else {
            if (tiles[2].label === tiles[5].label && tiles[2].label === tiles[8].label && !tiles[2].empty())
            
            {return true;}
            
            else {
                if (tiles[3].label === tiles[4].label && tiles[3].label === tiles[5].label && !tiles[3].empty())
                {return true;}
                    if (tiles[6].label === tiles[7].label && tiles[6].label === tiles[8].label && !tiles[6].empty())
                    {return true;}
                        if (tiles[0].label === tiles[4].label && tiles[0].label === tiles[8].label && !tiles[0].empty())
                        {return true;}
                        else {
                            if (tiles[2].label === tiles[4].label && tiles[2].label === tiles[6].label && !tiles[2].empty())
                            {return true;}
                                    return false;   
                    }
                }
            }
        }
    }
};


var Tile = function(x, y) { //Constructor
    this.x = x;
    this.y = y;
    this.size = width/NUM_COLS;
    this.label = ""; //'X' 'O' or empty ""
};

Tile.prototype.draw = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 10);
    textSize(100);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text(this.label, this.x+this.size/2, this.y+this.size/2);
};

Tile.prototype.empty = function() {
    return this.label === "";
};

//This gets called when a tile is clicked on
Tile.prototype.onClick = function() {
    // If the tile is not empty, exit the function
    
    if (!this.empty()) {
        return;
    }
    
    this.label = SYMBOLS[playerTurn];
    
    playerTurn++;
    if (playerTurn >= SYMBOLS.length) {
        playerTurn = 0;
    }
};

Tile.prototype.handleMouseClick = function(x, y) {
    // Check for mouse clicks inside the tile
     if ( x >= this.x && x <= this.x + this.size &&
        y >= this.y && y <= this.y + this.size )
    {
        this.onClick();
    }
};

//Creates grid of tiles:
for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        tiles.push(new Tile(i * (width/NUM_COLS-1), j * (height/NUM_ROWS-1)));
    }
}

//Renders grid of tiles:
var drawTiles = function() {
    for (var i in tiles) {
        tiles[i].draw();
    }
};

//Tic Tac Toe End

//Khan Button Class:
var Button = function(config) { //constructor
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    
    fill(198, 101, 230);
    stroke(0, 0, 0);
    rect(this.x-10, this.y, this.width, this.height, 28);
    fill(0, 0, 0);
    textSize(22);
    textAlign(LEFT, TOP);
    text(this.label, this.x, this.y+this.height/5);
    
};

Button.prototype.isMouseInside = function() {
    
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
           
};

Button.prototype.handleMouseClick = function() {
    
    if (this.isMouseInside()) {
        this.onClick();
    }
    
};

var startButtonFrogger = new Button({
    
    x: 50,
    y: 300,
    label: "    Frogger",
    
    onClick: function() {
        
        currentScene = 1; //1 == Frogger
        
    }
    
});

var startButtonTicTacToe = new Button({
    
    x: 240,
    y: 300,
    
    label: "  TicTacToe",
    
    onClick: function() {
        
        currentScene = 2; //2 == Tic Tac Toe
        
    }
    
});

var splash = function ()
{
    
    background(255, 255,0);
    textSize(35);
    text("Mini Games", 100, 0);
    text("By: Mike Rios", 90, 40);
    
    drawBitmoji(207,159,111);
    
    startButtonFrogger.draw();
    startButtonTicTacToe.draw();
   
};

mouseClicked = function(){
    
    if(currentScene === 0){ //Splash Screen
        
        startButtonFrogger.handleMouseClick();
        startButtonTicTacToe.handleMouseClick();
        
    } else if (currentScene === 2) { //Tic Tac Toe
        
        for(var i in tiles){
            
            tiles[i].handleMouseClick(mouseX, mouseY);
            
        }
        
    }
    
};

draw = function() {
    
    if (currentScene === 0) { //Splash Screen
 
        splash();
        
    } else if (currentScene === 1) { //Frogger
        
        // static
        background(227, 254, 255);
        fill(130, 79, 43); // dirt color for rectangle
        rectMode(CORNER);
        
        rect(0, 0, 10, height);
        rect(width, 0, -10, height);
        
        for (var i = 0; i < cars.length; i++) { 
            cars[i].draw(); // draw a Car
            bitmoji.checkForCarGrab(cars[i]);
            cars[i].y += carSpeed; // move Car to left            
        }
        
        fill(255, 0, 0);
        textSize(13);
        
        text("Score: " + score, 20, 18);// Text Score
        text("Speed: " + carSpeed, 20, 34); //Car Difficulty Level
        
        if (keyIsPressed && key.code === 32) { // space key to jump
            bitmoji.right();
        } else {
            bitmoji.left();
        }
        
        bitmoji.draw(); //render bitmoji
        bitmoji.crossedRoad(); //check if player scored
    
    } else if (currentScene === 2) { //Tic Tac Toe
        
        background(255, 255, 255);
        drawTiles();}
         
    if (checkWin())
    {
        
        fill(255, 183, 0);
        text("Winner",200,200);
        
    }

};
