var PLAY = 1;
//var END = 0;
var gameState = 1;

var monkey , monkey_running,monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground;

var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop = loadImage("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("walking",monkey_running);
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale = 0.15;
  
  ground = createSprite(400,351,800,15);
  //ground.scale = 0.1;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("#82EEFD");
  
  if(gameState === PLAY){
    
    if(monkey.isTouching(FoodGroup)){
      
      FoodGroup.destroyEach();
      score = score+2;
    }
    monkey.changeAnimation("walking");
    
    if(keyDown("space")&& monkey.y>158) {
    monkey.velocityY = -15;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    food();
    stone();
    
    if(monkey.isTouching(obstacleGroup)){
      
      monkey.velocityY = 0;
     
      //change the trex animation
      monkey.changeAnimation("stop", monkey_stop);
      
      
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
    }
  }
  
  monkey.collide(ground);
  
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(25);
  
  stroke("black");
  fill("black");
  textSize(25);
  text("Score: "+ score,15,30);
}

function food(){
  if(frameCount % 80 ===0){
    banana = createSprite(600,100,10,10);
    banana.addAnimation("sun", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.y = Math.round(random(100,250))
    banana.lifetime = 400;
    FoodGroup.add(banana);
    
    banana.setCollider("rectangle",0,0,500,250)
    banana.debug = false;
  }
}
function stone() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
     obstacle = createSprite(500,300,20,20);
    obstacle.y = Math.round(random(300,301));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.24;
    obstacle.velocityX = -5.8;
    obstacle.lifetime = 200;
   obstacleGroup.add(obstacle);
    
    obstacle.setCollider("rectangle",0,0,250,250)
    obstacle.debug = false;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}