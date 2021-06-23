let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#cea7d2',
    audio: {
        disableWebAudio: true
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
var nextArrow;
let successfulDropoff;

var holdSound;

var wrongSound;

var correctSound;

var finishSound;

var star;
var starScale;

var gameBg;

//
function init() {
}

function preload() {
    this.load.image('background', './assets/capt-01.png');
    
    this.load.image('head', './assets/capthead-01.png');
    this.load.image('body', './assets/captbody-01.png');
    this.load.image('handL', './assets/capthandL-01.png');
    this.load.image('handR', './assets/capthandR-01.png');
    this.load.image('armL', './assets/captarmL-01.png');
    this.load.image('armR', './assets/captarmR-01.png');
    
    this.load.image('nextArrow', './assets/purple-arrow.png');
    
    this.load.audio('hold', './assets/hold.wav');
    this.load.audio('wrong', './assets/wrong.wav');
    this.load.audio('correct', './assets/correct.wav');
    this.load.audio('finish', './assets/finish.wav');
    
    //---star at the end---
    this.load.image('star', './assets/purple-star.png');
    
     //---background pattern---
    this.load.image('gameBg', './assets/stars (1)-01.png');

}

function create() { 
    
    gameBg = this.add.image(180, 330, 'gameBg');
    gameBg.setScale(0.4);
    gameBg.setVisible(false);
    
     //---star---
    starScale = 0.1;
    star = this.add.image(90,530, 'star');
    star.setScale(starScale);
    star.setVisible(false);
    star.setDepth(0);
    
    
    var image = this.add.image(180, 450, 'background');
    image.alpha = 0.3;
    image.setScale(0.7);
    
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');
    
    //----les membres-----
    var head = this.add.image(50, 380, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
//    head.setScale(2);
    head.setName('head');
    head.setScale(0.70);
    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.7);
    nextArrow.setVisible(false);
    
    var body = this.add.image(60, 550, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
    body.setScale(0.70);
    
    var handL = this.add.image(310, 92, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
    handL.setScale(0.70);
    
    var handR = this.add.image(200, 552, 'handR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handR);
    handR.setName('handR');
    handR.setScale(0.70);
    
    var armL = this.add.image(50, 212, 'armL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(armL);
    armL.setName('armL');
    armL.setScale(0.70);
    
    var armR = this.add.image(310, 570, 'armR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(armR);
    armR.setName('armR');
    armR.setScale(0.70);
    
    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(200, 95, 115, 120).setRectangleDropZone(115, 120);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(211, 227, 80, 137).setRectangleDropZone(80, 137);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(135, 221, 65, 130).setRectangleDropZone(65, 130);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(252, 383, 90, 170).setRectangleDropZone(90, 170);
    zone4.setName('legR');
    
    //  A drop zone
    var zone5 = this.add.zone(160, 385, 90, 170).setRectangleDropZone(90, 170);
    zone5.setName('legL');
    
    //  A drop zone
    var zone6 = this.add.zone(270, 230, 40, 130).setRectangleDropZone(40, 130);
    zone6.setName('handR');

          var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
    graphics.strokeRect(zone2.x - zone2.input.hitArea.width / 2, zone2.y - zone2.input.hitArea.height / 2, zone2.input.hitArea.width, zone2.input.hitArea.height);
    
    graphics.strokeRect(zone3.x - zone3.input.hitArea.width / 2, zone3.y - zone3.input.hitArea.height / 2, zone3.input.hitArea.width, zone3.input.hitArea.height);
    
    graphics.strokeRect(zone4.x - zone4.input.hitArea.width / 2, zone4.y - zone4.input.hitArea.height / 2, zone4.input.hitArea.width, zone4.input.hitArea.height);
    
    graphics.strokeRect(zone5.x - zone5.input.hitArea.width / 2, zone5.y - zone5.input.hitArea.height / 2, zone5.input.hitArea.width, zone5.input.hitArea.height);
    
    graphics.strokeRect(zone6.x - zone6.input.hitArea.width / 2, zone6.y - zone6.input.hitArea.height / 2, zone6.input.hitArea.width, zone6.input.hitArea.height);
 
    this.input.on('dragstart', function (pointer, gameObject) {

        this.children.bringToTop(gameObject);
        holdSound.play();

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            console.log(dropZone.name == gameObject.name);
            console.log('successful dropoff of ' + gameObject.name + ' in ' + dropZone.name);
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            console.log('failed dropoff of ' + gameObject.name + ' in ' + dropZone.name);
    
            wrongSound.play();
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
      if(successfulDropoff === 6){
            console.log("well done!!!!");
            nextArrow.setVisible(true);
            nextArrow.setInteractive();
          finishSound.play();
          star.setVisible(true);
          gameBg.setVisible(true);
    }    
        
        nextArrow.on('pointerdown', onClick);

    });
    

}


function update() {
    if(successfulDropoff === 6){
         starScale += 0.001;
        star.setScale(starScale);
        if (starScale > 0.2){
            starScale = 0.2;
        } }
}
function onClick(){
//    window.open("https://www.google.com", "_blank");
    window.location.replace("http://www.w3schools.com");

}