//Aquarium Setup


var backgroundImage = new Image();
backgroundImage.src = './ImgPack/PNG/Small/Background.png';
const canvas = document.getElementById(`aquarium`);
const frames = 0;
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
backgroundImage.onload = () => {
  context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}




// LOOP CONTROL Object
let requestId;
const loopControl = {
  start() {
    // At intial iteration, request ID is undefined, will be defined by requestAnimationFrame
    if (!requestId) {
      requestId = window.requestAnimationFrame(update);
      // return requestId;
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

function update(runtime) {
  // A good practice is to clean a variable in a function that is running constantly in the background so avoid excessive memory use
  requestId = undefined;
  loopControl.clear();
  // console.log(runtime); // log in each frame for how long the game is running in milliseconds
  // do stuff here

  //Draw the fish for every fish
  myFish.update();
  myFish.newPosition();
  myFish.drawFish();
  // call loopControl.start() or loopControl.stop() in the end
  loopControl.start();
}
// you can call loopControl.start() or loopControl.stop() outside the loop as a callback to a eventlistener to start or stop the game, however mind that you might need to save the runtime when resuming the game.

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
    }
    drawFish(){
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
    
    }
    newPosition(){
      console.log(`newPosition`);
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
  const myFish = new FishObject (30,30,'blue',canvas.width/2,canvas.height/2);
}

// fishSet.push(new FishObject(30,30,'blue',canvas.width/2,canvas.height/2));
const myFish = new FishObject (30,30,'blue',canvas.width/2,canvas.height/2);


createFish();
