//Aquarium Setup


var backgroundImage = new Image();
backgroundImage.src = './ImgPack/PNG/Small/Background.png';
const canvas = document.getElementById(`aquarium`);
let frames = 0;
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
backgroundImage.onload = () => {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
let runtime; 


// LOOP CONTROL Object
let requestId;
const loopControl = {
  start() {
    // At intial iteration, request ID is undefined, will be defined by requestAnimationFrame
    if (!requestId) {
      requestId = window.requestAnimationFrame(update);
    }
    // Draw the canvas each iteration
    this.canvas = canvas;
    this.context = context;
  },
  stop() {
    if (requestId) {
      console.log('hello, stop');
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
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
    constructor(width, height, color, x, y) {
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
    }

    reduceHealth(){
      if (frames % 300 === 0){ // Every 5 seconds, 1 second = 60 frames
        console.log(`lost health`)
        this.health = this.health - 50;
        // Slow down just once
        if (this.health === 50) {
          this.speedX *= 0.5;
          this.speedY *= 0.5;
        }
        }
    }

    deadFish(){
      if (this.health === 0){
        console.log(`Dead dead dead`)
      }
    }

    checkFishHealth(){
      this.becameUnhealthy = false;
      if (this.health <= 50) {
        this.blnHealthy = false;
      } else {
        this.blnHealthy = true;
      }
    }

    feedingFish(){
      this.health = Math.max(this.health + 50,100)
        if(!this.blnHealthy) {
          this.blnHealthy = true;
          this.speedX *= 2;
          this.speedY *= 2;
        }
    }

    drawFish(){
      // context.fillStyle = this.color;
      // context.fillRect(this.x, this.y, this.width, this.height);
      var simpleFishImage = new Image();
      console.log(this.health);

      if (this.blnHealthy){
        simpleFishImage.src = './ImgPack/PNG/Small/Guppy Small Normal.png';
        if (this.speedX < 0){
          simpleFishImage.src = './ImgPack/PNG/Small/Guppy Small Normal flip.png';
        }  
      } else {
          simpleFishImage.src = './ImgPack/PNG/Small/Guppy Small Sick.png';
          if (this.speedX < 0){
            simpleFishImage.src = './ImgPack/PNG/Small/Guppy Small Sick flip.png';
          }
      }
      context.drawImage(simpleFishImage, this.x, this.y, this.width, this.height);
    }    

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
}

const createFish = () => {
  console.log('did ')
  fishSet.push(new FishObject (30,30,'blue',canvas.width/2,canvas.height/2));
}

// fishSet.push(new FishObject(30,30,'blue',canvas.width/2,canvas.height/2));
// const myFish = new FishObject (30,30,'blue',canvas.width/2,canvas.height/2);


function update(runtime) {
  // A good practice is to clean a variable in a function that is running constantly in the background so avoid excessive memory use
  requestId = undefined;
  loopControl.clear();
  frames += 1;
  // console.log(runtime); // log in each frame for how long the game is running in milliseconds
  // do stuff here

  fishSet.forEach((element,index) => {
    element.reduceHealth();
    if (element.health == 0) {
      fishSet.splice(index, 1);
    }
    // element.deadFish();
    element.checkFishHealth();
    element.newPosition();
    element.drawFish();
  });

  // for (i=0; i<fishSet.length; i+=1){

  // }

  // //Draw the fish for every fish
  // myFish.update();
  // myFish.newPosition();
  // myFish.drawFish();
  // call loopControl.start() or loopControl.stop() in the end
  loopControl.start();
}
// you can call loopControl.start() or loopControl.stop() outside the loop as a callback to a eventlistener to start or stop the game, however mind that you might need to save the runtime when resuming the game.


// Ghost fishies
// context.scale(-1,1);