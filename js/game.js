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
        disableWebAudio: false
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
    this.load.image('background', './assets/captain-01.png');
    
    this.load.image('head', './assets/captainHead-01.png');
    this.load.image('body', './assets/captainBody-01.png');
    this.load.image('hook', './assets/captainHook-01.png');
    this.load.image('hat', './assets/captainHat-01.png');
    this.load.image('sword', './assets/captainSword-01.png');
    this.load.image('boot', './assets/captainBoot-01.png');
    
    this.load.image('nextArrow', './assets/p-refresh.png');
    
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
    
    
    var image = this.add.image(180, 220, 'background');
    image.alpha = 0.3;
    
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');
    
    //----les membres-----
    var head = this.add.image(300, 70, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
    head.setName('head');

    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.15);
    nextArrow.setVisible(false);
    
    var body = this.add.image(245, 508, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
    
    var sword = this.add.image(135, 450, 'sword', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(sword);
    sword.setName('sword');
    
    var hat = this.add.image(50, 552, 'hat', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(hat);
    hat.setName('hat');
    
    var hook = this.add.image(320, 150, 'hook', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(hook);
    hook.setName('hook');
    
    var boot = this.add.image(310, 350, 'boot', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(boot);
    boot.setName('boot');

    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(172, 280, 115, 190).setRectangleDropZone(115, 190);
    zone.setName('body');
    
    //  A drop zone
    var zone2 = this.add.zone(94, 415, 50, 60).setRectangleDropZone(50, 60);
    zone2.setName('hook');
    
    //  A drop zone
    var zone3 = this.add.zone(48, 129, 80, 110).setRectangleDropZone(80, 110);
    zone3.setName('hat');
    
    
    //  A drop zone
    var zone4 = this.add.zone(165, 62, 70, 120).setRectangleDropZone(70, 120);
    zone4.setName('sword');
    
    //  A drop zone
    var zone5 = this.add.zone(79, 254, 70, 95).setRectangleDropZone(70, 95);
    zone5.setName('head');
    
    //  A drop zone
    var zone6 = this.add.zone(322, 240, 90, 130).setRectangleDropZone(80, 130);
    zone6.setName('boot');
 
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
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
    
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
    window.location.replace("https://games.caramel.be/peter-pan/index.html");

}