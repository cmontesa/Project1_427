// Variable for images
let cherryImg, icecreamImg; 

// Variable for initial position and speed
let icecreamX = 300;
let icecreamY = 560;
let speed = 5;

// Text variables for displaying game finished
let textContainer, mainText, subText;

//variable for the timer of player instructions
let showText = false;
let startTime; 
let duration = 9000;

//variable for sound
let gameplaySound, endingSound;

// Cherry function
let cherry = {
  x: 0,
  y: 0,
  landed: false,
  
  set: function(){
    this.x = random(400);
  },
  
  update: function(){
    if (dist(this.x, this.y, icecreamX, icecreamY) < 110){
      this.landed = true;
      textContainer.style('display', 'block');
      gameplaySound.stop(); // it sounds terrifying 
      endingSound.play(); // it sounds terrifying 
      
    }
    if (!this.landed){
      this.y++;
    }
  },
   
  display: function(){
    image(cherryImg, this.x, this.y, 24, 35);
  }
}

function preload(){
  // Load images
  cherryImg = loadImage('pictures/cherryIMG.png');
  icecreamImg = loadImage('pictures/icecreamIMG.png');

  //load sounds
  //endingSound = loadSound('sounds/cherryOnTop.wav');
  gameplaySound = loadSound('sounds/cherryOnTopInstrumental.wav');

}

function setup() {
  createCanvas(600, 600);
  cherry.set();

  startTime = millis(); 
  showText = true;
  
  // Create and style the div for text
  textContainer = createDiv();
  mainText = createDiv("Congrats");
  subText = createDiv("You caught the Cherry on Top 🍒!");
  
  textContainer.child(mainText);
  textContainer.child(subText);
  
  textContainer.style("background-color", "rgba(255, 255, 255, 0)"); 
  textContainer.style("display", "inline-block");
  textContainer.style("position", "absolute");
  textContainer.style("width", "600px");

  // Style for mainText and subText (div text)
  mainText.style("font-family", "sans-serif");
  mainText.style("font-size", "80px");
  mainText.style("color", "rgba(255, 255, 255)");
  mainText.style("text-align", "center");

  subText.style("font-family", "sans-serif");
  subText.style("font-size", "20px");
  subText.style("color", "rgba(255, 255, 255)");
  subText.style("text-align", "center");

  // Hide text initially
  textContainer.style('display', 'none');
  
  // Position the container within the canvas
  textContainer.position(0, 250);
}

function draw() {
  background(0, 204, 255);

  let elapsedTime = millis() - startTime;

  // Show text for only 5 seconds
  if (showText && elapsedTime <= duration) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Catch the Cherry using Left “←” and Right “→” key!", width/2, 50);
    gameplaySound.play(); // it sounds terrifying 
  } else {
    showText = false; 
  }

  // Display Ice Cream
  image(icecreamImg, icecreamX, icecreamY - 80, 80, 118);
  
  // Update and display cherry
  cherry.update();
  cherry.display();


  
  // Move the ice cream left or right based on key press
  if (keyIsDown(LEFT_ARROW)) {
    icecreamX -= speed; // Move left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    icecreamX += speed; // Move right
  }
}
