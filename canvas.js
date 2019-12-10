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
  myFish.drawFish();
}
context.fillRect(0, 0, canvas.width, canvas.height);  



//Timer globally defined
let timeleft = 0
const startTimer = () => setInterval(function(){
  if (blnGlobalPlayStart) {
  document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  timeleft -= 1;
  if(timeleft <= 0){
         // Re-set timer    
        timeleft = 10;
        generateNewQuestion();
  }
}}, 1000);




const aquariumCanvas = {

    start() {
    this.canvas = canvas;
    this.interval = setInterval(updateGameArea, 20); 
    },
  
    stop: function() {
      clearInterval(this.interval);
    },

    clear: function() {
      this.canvas = canvas;
      this.context = context;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.loadCanvas();
    },

    loadCanvas(){
      this.canvas = canvas;
      this.context = context;
      backgroundImage.onload = () => {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        myFish.drawFish();
      }
      context.fillRect(0, 0, canvas.width, canvas.height);  
    }
}

function startGame() {
    console.log(`Start game!`);
    aquariumCanvas.start();
  };
  

function updateGameArea() {
    aquariumCanvas.clear();
    //for each fish
    myFish.drawFish();
    myFish.update();
    myFish.newPosition();
    console.log('updating game area');
  }

  // function updateGameArea() {
  //   myCanvas.clear();
  //   myCar.update();
  //   myCar.newPos();
  //   updateObstacles();
  //   checkGameOver();
  //   myCanvas.score();
  //   myCar.carImageFill(myCanvas.context); 
  //   console.log('updating');
  // }
  

//Fish Object
class FishObject {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.originalx = x;
      this.speedY = 0;
      this.originaly = y;
    }
    drawFish(){
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){

    }
    newPosition(){

    }
}

const myFish = new FishObject (60,30,'blue',canvas.width/2,canvas.height/2);
myFish.drawFish();


