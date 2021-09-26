var score =0;
var gun,blueBubble,redBubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var heading, scoreBoard;
var blast;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement("h1");
  scoreBoard = createElement("h2");
  
}

function draw() {
  background("#BDA297");

//display Score and number of lifes:
  scoreBoard.html("Score: "+score);
  scoreBoard.style('color: red');
  scoreBoard.position(width - 200, 20);

  heading.html("Life: "+life);
  heading.style('color: red');
  heading.position(150, 20);
  

  if(gameState===1){
    gun.y=mouseY;

    if(frameCount % 80 === 0) {
      drawBlueBubble();
    }

    if(frameCount % 100 === 0) {
      drawRedBubble();
    }

    if(keyDown("space")) {
      shootBullet()
    }

    if(blueBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)) {
      handleBubbleCollision(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)) {
      handleGameOver(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(backBoard)) {
      handleGameOver(redBubbleGroup);
    }

    drawSprites();
  }
     
}

function shootBullet() {
  bullet = createSprite(220, gun.y - 34, 50, 20);
  bullet.addImage(bulletImg);
  bullet.scale = 0.12;
  bullet.velocityX = 8;
  bullet.lifetime = 110;
  bulletGroup.add(bullet);
}

function drawBlueBubble() {
  blueBubble = createSprite(800, random(20, 780), 40, 40);
  blueBubble.addImage(blueBubbleImg);
  blueBubble.scale = 0.1;
  blueBubble.velocityX = -8;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);
}

function drawRedBubble() {
  redBubble = createSprite(800, random(20, 780), 40, 40);
  redBubble.addImage(redBubbleImg);
  redBubble.scale = 0.1;
  redBubble.velocityX = -8;
  redBubble.lifetime = 400;
  redBubbleGroup.add(redBubble);
}

function handleBubbleCollision(bubbleGroup) {
  if(life > 0) {
    score += 1;
  }

  blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.3;
  blast.lifetime = 20;

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function handleGameOver(bubbleGroup) {
  
  life -= 1;
  bubbleGroup.destroyEach();

  if(life === 0) {
    gameState = 2;

    swal({
      title: 'Game Over',
      text: "Oops you lost the game!!!",
      text: "Your Score is " + score,
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
}