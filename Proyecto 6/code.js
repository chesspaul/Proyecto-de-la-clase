var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["733c4063-a66d-4ecb-99b6-939b2d09020d"],"propsByKey":{"733c4063-a66d-4ecb-99b6-939b2d09020d":{"name":"1","sourceUrl":null,"frameSize":{"x":30,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"UzKE9WeZkVErOZDfgPF1_OgdJcf1DBer","categories":["germs"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":30,"y":30},"rootRelativePath":"assets/733c4063-a66d-4ecb-99b6-939b2d09020d.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creación de objetos
var laser1 = createSprite(100, 150, 200, 5);
laser1.shapeColor=("red");
laser1.velocityX=0;
laser1.velocityY=2;

var laser2 = createSprite(300, 200, 200, 5);
laser2.shapeColor=("red");
laser2.velocityX=0;
laser2.velocityY=-2;

var laser1, laser2, edges;
var treasure, thief, diamondBox;
var diamondBox = createSprite(390,10,30,30);
diamondBox.shapeColor="blue";

var thief=createSprite(10, 390, 30, 30);
thief.setAnimation("1");

//función para dar instrucciones al juego
function draw() {
  //fondo del juego
  background("brown");
  createEdgeSprites();
  laser1.bounceOff(edges);
  laser2.bounceOff(edges);
  thief.bounceOff(edges);
  
  //crear los objetos en la pantalla
  drawSprites();

//IA del ladrón
  if (keyDown("D")) {
    thief.velocityX=2;
    thief.velocityY=0;
  }
  
  if (keyDown("A")) {
    thief.velocityX=-2;
    thief.velocityY=0;
  }
  
  if (keyDown("W")) {
    thief.velocityX=0;
    thief.velocityY=-2;
  }
  
  if (keyDown("S")) {
    thief.velocityX=0;
    thief.velocityY=2;
  }
  
  //atrapar al ladrón
 if (laser1.isTouching(thief)||laser2.isTouching(thief)) {
    stroke(0)
    fill(0)
    textSize(24);
    text("ladron atrapado", 125, 200);
    laser1.velocityY=0;
    laser2.velocityY=0;
    thief.velocityX=0;
    thief.velocityY=0;
  }
  
  //ganaste el juego
 if (diamondBox.isTouching(thief)) {
    stroke(0)
    fill(0)
    textSize(24);
    text("El ladron consiguió el diamante", 20, 200);
    laser1.velocityY=0;
    laser2.velocityY=0;
    thief.velocityX=0;
    thief.velocityY=0;
   }
   
  

}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
