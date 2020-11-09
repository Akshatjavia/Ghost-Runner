var tower,towerImage;
var doors,doorsGroup,doorsImage;
var climber,climbersGroup,climberImage;
var ghost,ghostImage;
var invisibleblock,blocksGroup;
var gameState = "Play";
var spookywave;

function preload () {
  
  towerImage = loadImage("tower.png");
  
  doorsImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  ghostImage = loadImage("ghost-standing.png");
  
  spookywave = loadSound("spooky.wav");
  
}

function setup () {
createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower's image",towerImage);
  tower.velocityY = 2;

  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghost's image", ghostImage);
  ghost.scale = 0.4;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  blocksGroup = createGroup();
  
}

function draw () {
  
  if (gameState === "Play") {
    
    spookywave.play();
    
    if(tower.y > 400) {
    
    tower.y = 300;
    
  }
    
    if(keyDown("right")) {
    
    ghost.x = ghost.x + 3;
    
  }
  
  if(keyDown("left")) {
    
    ghost.x = ghost.x - 3;
    
  }
  
  if (keyWentDown("space")) {
    
    ghost.velocityY = - 8;
    
  }
  
  ghost.velocityY += 0.8;
    
    if (climbersGroup.isTouching(ghost)) {
    
    ghost.velocityY = 0;
    
  }
    
    if (blocksGroup.isTouching (ghost) || ghost.y > 600) {
      
      gameState = "End";
      ghost.destroy();
      
    }
    
    spawnDoors();
    
    drawSprites();
  }
  
  if (gameState === "End") {
    
    background("black");
    
    textSize(30);
    text("Game over",220,300);
    
  }
  
  
}

function spawnDoors () {
  
  if(frameCount % 250 === 0) {
    
  door = createSprite(300,0);
  door.addImage("door's image",doorsImage);
    
  climber = createSprite(300,60);
  climber.addImage("climber's image",climberImage);
    
  invisibleblock = createSprite(300,65);
  invisibleblock.width = climber.width;
  invisibleblock.height = 2;
    
  door.velocityY = 2;
  climber.velocityY = 2;  
  invisibleblock.velocityY = 2;
  
  door.lifetime=300;
  climber.lifetime = 300;
  invisibleblock.lifetime = 300;
    
  doorsGroup.add(door);
  climbersGroup.add(climber);
  blocksGroup.add(invisibleblock);
  invisibleblock.debug = true;
  
  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleblock.x = climber.x;
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
  
  }
  
}