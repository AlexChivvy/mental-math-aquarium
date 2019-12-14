// Mental Math Aquarium by Alex Chivescu
// All rights reserved.
// Contact: alexchivescu@gmail.com

// Canvas-Related Javascript Code

window.alert("The seconds you take to answer each math question become the credits you can spend to grow your aquarium and feed your fishies. Hit play to start. Good luck!");
  
// Aquarium Setup in Canvas
var backgroundMusic = new Audio();
backgroundMusic.src = './AudioPack/Fesliyan/2019-10-21_-_Feels_Good_-_David_Fesliyan.mp3';
var backgroundImage = new Image();
backgroundImage.src = './ImgPack/PNG/Medium/Background.png';
const canvas = document.getElementById(`aquarium`);
let frames = 0;
const context = canvas.getContext("2d");
// canvas.width = window.innerWidth*17/20;
canvas.height = canvas.width*2/3;
backgroundImage.onload = () => {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  // context.textAlign = "start";
  // context.font = "20px Georgia";
  
  // <input type="textbox" value="The seconds you take to answer the math Q&A are the credits you earn to feed your fishies and grow your Mental Math Aquarium! Remember: Feed your fishies if they get hungry :-)" id="textbox"></input>
  // context.fillText("The seconds you take to answer the math Q&A", canvas.width*1.5/10, canvas.height*1.5/10);
  // context.fillText("are the credits you earn to feed your fishies", canvas.width*2/10, canvas.height*2.5/10);
  // context.fillText("and grow your Mental Math Aquarium!", canvas.width*1.5/10, canvas.height*3.5/10);
  // context.fillText("Remember: Feed your fishies if they get hungry :-)", canvas.width*2/10, canvas.height*4.5/10);
}
let runtime; 

// Loop control for object
let requestIDCanvas;
const loopControl = {
  start() {
    // At intial iteration, request ID is undefined, will be defined by requestAnimationFrame
    if (!requestIDCanvas) {
      requestIDCanvas = window.requestAnimationFrame(update);
    }
    // Draw the canvas each iteration
    this.canvas = canvas;
    this.context = context;
  },
  stop() {
    if (requestIDCanvas) {
      window.cancelAnimationFrame(requestIDCanvas);
      requestIDCanvas = undefined;
    }
  },
  clear() {
    // Clears globally defined canvas
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }
};

// Count fish objects and print on screen

// Fish Object
class FishObject {
    constructor(width, height, color, x, y, predator) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = .6;
      this.originalx = x;
      this.speedY = .4;
      this.originaly = y;
      this.health = 100;
      this.blnHealthy = true;
      this.becameUnhealthy = false;
      this.age = 0;
      this.grownFish = false;
      this.isPredator = predator;
    }

    // Reduce fishie health
    frameActivities(){
      if (frames % 300 === 0){ // Every 5 seconds, 1 second = 60 frames
        this.health = this.health - 10;
        this.age = this.age + 10;
        // Slow down fish just once on health = 50
        if (this.health === 50) {
          this.speedX *= 0.5;
          this.speedY *= 0.5;
        }
        if (this.age === 150) {
          this.grownFish = true;
          this.width *= 2;
          this.height *= 2;
        }
        }
    }

    // Set fish health and age booleans
    booleanActivities(){
      this.becameUnhealthy = false;
      if (this.health <= 50) {
        this.blnHealthy = false;
      } else {
        this.blnHealthy = true;
      }
    } 

    // Set new position
    newPosition(){
      this.x += this.speedX; 
      this.y += this.speedY; 

      if (this.x < canvas.width/20) {
        this.x = canvas.width/20 + .5;
        this.speedX = this.speedX * -1
      }
      if (this.x > (canvas.width - (canvas.width/20 + this.width))) {
        this.x = (canvas.width - (canvas.width/20 + this.width)) - .5;
        this.speedX = this.speedX * -1
      }

      if (this.y < canvas.height/10) {
        this.y = canvas.height/10 + .5;
        this.speedY = this.speedY * -1
      }
      if (this.y > (canvas.height - (canvas.height/10 + this.height))) {
        this.y = (canvas.height - (canvas.height/10 + this.height)) - .5;
        this.speedY = this.speedY * -1
      }
    }

    // Draw the fish
    drawFish(){
      var simpleFishImage = new Image();

      if (this.grownFish === false && this.isPredator === false){
        if (this.blnHealthy){
          simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Small Normal.png';
          if (this.speedX < 0){
            simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Small Normal flip.png';
          }  
          } else {
            simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Small Sick.png';
            if (this.speedX < 0){
              simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Small Sick flip.png';
            }
          }
      }

      if (this.grownFish === true && this.isPredator === false){
        if (this.blnHealthy){
          simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Large Normal.png';
          if (this.speedX < 0){
            simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Large Normal flip.png';
          }  
          } else {
            simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Large Sick.png';
            if (this.speedX < 0){
              simpleFishImage.src = './ImgPack/PNG/Medium/Guppy Large Sick flip.png';
            }
          }
      }

      context.drawImage(simpleFishImage, this.x, this.y, this.width, this.height);
    }  
}

// Feed the fish
const feedFish = () => {
  let foodLimit = 4;
  fishSet.forEach((element) => {
    if (foodLimit > 0 && element.blnHealthy === false) {
    element.health = Math.max(element.health + 50,100)
      if (!element.blnHealthy) {
        element.blnHealthy = true;
        element.speedX *= 2;
        element.speedY *= 2;
        foodLimit -= 1;
      }
    }
  })
  fishSet.forEach((element) => {
    if (foodLimit > 0 && element.blnHealthy === true && element.health < 90) {
    element.health = Math.max(element.health + 50,100)
      if (!element.blnHealthy) {
        element.blnHealthy = true;
        foodLimit -= 1;
      }
    }
  })
};

// Create the fish
const createFish = () => {
  fishCounter += 1;
  document.getElementById("fish-counter").innerHTML =  "Fishies: " + fishCounter;
  fishSet.push(new FishObject (canvas.height/10,canvas.height/10,'blue',(canvas.width/8 + Math.random()*canvas.width*3/4),(canvas.height/8 + Math.random()*canvas.height*3/4),false));
}

// The master function controlling the game
function update(runtime) {
  // A good practice is to clean a variable in a function that is running constantly in the background so avoid excessive memory use
  requestIDCanvas = undefined;
  loopControl.clear();
  frames += 1;
  // console.log(runtime); // log in each frame for how long the game is running in milliseconds
 
  // DO EVERYTHING HERE
  fishSet.forEach((element,index) => {
    // Reduce health
    element.frameActivities();
    // If the fishie is dead, remove it
    if (element.health == 0) {
      fishSet.splice(index, 1);
      fishCounter -= 1;
    }
    // Set fish health boolean
    element.booleanActivities();
    // Set new position
    element.newPosition();
    // Draw the fish
    element.drawFish();
  });
  loopControl.start();
}
// you can call loopControl.start() or loopControl.stop() outside the loop as a callback to a eventlistener to start or stop the game, however mind that you might need to save the runtime when resuming the game.


// Ghost fishies?
// context.scale(-1,1);