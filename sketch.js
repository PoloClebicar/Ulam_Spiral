//Screen variables
let width = 1400;
let height = 600;


//Shape variables
let elipseSize = 0;

//Position variables
let currentY;
let currentX;
let oldX = 0;
let oldY = 0;
let coord = [0 ,0];

//Spiral variables
let primeID = 0;
let count = 1;
let isFirst = true;
let stepCounter = 1;
let stepCount = 0;
let maxSteps = 1;
let turnCount = 0;
let elipseCount = 1;
let direction = 1;

//Zoom control
let zoomCount = 1;
let limitSafe = 150000;
let colorFinal = [];
let zoom = 0;

function setup() {
  createCanvas(width, height);

  //Set the size of the elipse to a factor of whatever is the smallest values(
  //the canvas size.  
  //The -2 is an offset do they don't touch
  if (width < height){ elipseSize = width/10 - 2; }
  else { elipseSize = height/10 - 2; }

  //Set the grid size to a factor of the size of the canvas
  gridSizeX = width/10;
  gridSizeY = height/10;

  //Initialize the position of the spiral in the middle of the canvas.
  currentX = 0;
  currentY = 0;

}

function draw() {
  //This is to stop the loop when you need some time to think.
  //noLoop();

  //This serve as a way to keep track of the amount of loops done and to 
  //feed the zooom function.
  count = count + 1;


  //Basic setup for the animation
  frameRate(80);
  translate(width/2, height/2);
  background(104, 123, 243);
  
  //Using the very messy zoom function
  scale(calculateZoom());
  
  //Since we need to render every dot every frame, alll the variables related
  //to calculating the spiral, wich number is prime and the position in the screen 
  //needs to be reset every single frame.
  currentX = 0;
  currentY = 0;
  oldX = 0;
  oldY = 0;
  direction = 1;
  maxSteps = 1;
  stepCounter = 0;
  maxSteps = 1;
  turnCount = 0;
  isFirst = true;
  coord = [0,0];
  primeID = 0;

  //A loop the increases in size faster and fsater so as the spiral reachs a large size,
  //it starts to render more and more elipses at a time.
  for  (let i = 0; i <= elipseCount; i++){

  //A variable that is attached to each elipse, so we can check if they are prime or not
    primeID = primeID+ 1;
    
    //Set up to the line function, currently we do not use it
    stroke(221, 234, 248);
    strokeWeight(4);
    //line(oldX, oldY, currentX, curren

    //Set up to the elipse drawing, a very similar color to the background so it marks
    //any position that is not prime
    fill(114, 133, 244);
    noStroke();
    ellipse(currentX, currentY, elipseSize);

  if(isPrime(primeID)){
    // Call colour function, each end number of the prime 
    // numbers yield a different color.
    colorFinal = colorPrime(primeID);
    fill(colorFinal[0], colorFinal[1], colorFinal[2]);
    noStroke();
    ellipse(currentX, currentY, elipseSize);
  }

  //Set up the coordinates
  let coord = spiral();
  oldX = currentX;
  oldY = currentY;

  //This coordinates are here if you want to set up lines
  currentX = coord[0];
  currentY = coord[1];
  }

  //THIS IS A GOD DAMN MESS
  //A bunch of random number that somehow yield a decent grow in the spiral
  //size, and in the zoom function. There is definetly a better way to do it,
  //but oh well... this is what I got.
  elipseCount = elipseCount + count/8;
  zoomCount = zoomCount + count * 2;

  //A limit so the computer does not explode
  if (elipseCount > limitSafe){
  noLoop();
  }
}

function spiral(){

    //A simple way to check the direction by increasing a variable
    switch(direction){
    case 1:
      //Right
      //console.log("RIGHT")
      coord = [coord[0] + gridSizeX , coord[1]];
    break;
    case 2:
      //console.log("UP")
      //Up
      coord = [coord[0], coord[1] + gridSizeY] ;
    break;
    case 3:
      //console.log("LEFT")
      //Left
      coord = [coord[0] - gridSizeX , coord[1]];
    break;
    case 4:
      //console.log("DOWN")
      //Down
      coord = [coord[0], coord[1] - gridSizeY] ;
    break
    default:
      //console.log("START")
      coord = [coord[0], coord[1]];
    break;
  }

    //Count to two, change direction
    //Change direction twice, increase the lenght of the "walk"
    stepCount = stepCount + 1;

    if (stepCount >= maxSteps){
    direction = direction + 1;
    turnCount = turnCount + 1;
    stepCount = 0;
  }
  if (turnCount >= 2){
    maxSteps = maxSteps + 1;
    turnCount = 0;
  }
    if (direction > 4){ direction = 1; }

    return coord;
  }
 
//No clue what is happening here. The log function plus the count/2 yield
//a very nice zoom. I tested a lot of other ways but this was the better result
function calculateZoom() {
  zoom = 20 / (Math.log(Math.pow(zoomCount, 2)) + (count/2)) ; 
  return zoom;
}

//Check the number against each other number aside from 1 or 2, until it 
//reaches the square root of the number, rounder up.
function isPrime(num){
 if(num === 1){
    return false;
  }
  if (num === 2){
    return true;
  }
  for (i = 2; i <= Math.sqrt(num) + 1  ; i++){
    if(num % i === 0){
      return false;
    }
  }
  return true;
}

//Check the last digit of the prime number and chooses a color based on it.
function colorPrime(num) {
  let text = num.toString();
  let textArray = Array.from(text);
  var color = []

  switch (textArray[textArray.length - 1]) {
    case "1":
      color = [238, 240, 242];
    break;
    case "2":
      color = [255, 255, 255];
    break;
    case "3":
      color = [222, 222, 219];
    break;
    case "5":
      color = [238, 231, 209];
    break;
    case "7":
      color = [255, 239, 207];
    break;
    case "9":
      color = [215, 227, 201];
    break;
  }
  return color;

}
