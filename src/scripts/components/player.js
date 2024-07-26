export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'playerRun');
      this.playerRunAnimation = 'run'
      this.playerRunTexture = 'playerRun'
      this.isStun = false
      this.setDepth(3)
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.baseFrameRate = 10
      this.setCollideWorldBounds(true);
      //this.setBounce(0.2);
      this.setScale(.6)
      this.setGravityY(this.scene.data.get('gravity'));
      this.setSize(100,150);
      this.setOffset(300, 310);
      // Definir las animaciones del jugador
        if (!this.scene.anims.exists('run')){
            scene.anims.create({
                key: 'run',
                frames: this.scene.anims.generateFrameNumbers('playerRun', { start: 0, end: 7, first: 0 }), // Frames del 0 al 9
                frameRate: this.baseFrameRate, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            });
            scene.anims.create({
                key: 'idle',
                frames: this.scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 7, first: 0 }), // Frames del 0 al 9
                frameRate: this.baseFrameRate, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            });
            scene.anims.create({
                key: 'stun',
                frames: this.scene.anims.generateFrameNumbers('playerStun', { start: 0, end: 3, first: 0 }), // Frames del 0 al 9
                frameRate: this.baseFrameRate, // Velocidad de la animación
                repeat: -1 
            });
            scene.anims.create({
                key: 'hit',
                frames: this.scene.anims.generateFrameNumbers('playerHit', { start: 0, end: 2, first: 0 }), // Frames del 0 al 9
                frameRate: this.baseFrameRate, // Velocidad de la animación
                repeat: 1 
            });


        }
        this.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'hit') {
                this.isStun = false
            }
        });
        

       this.anims.play('idle', true);
       this.isGrounded = true
    }
  
    jump() {
        console.log("jump")

        if (this.body.touching.down && !this.isStun) {
            this.scene.uiScene.audioManager.salto.play()
            this.setVelocityY(this.scene.data.get('jumpForce')*-1);           
        }
    }

    changeAnimation(){
        if(!this.isStun){
            if(this.body.touching.down){
                this.isGrounded = true
                if (this.texture.key !== this.playerRunTexture) {
                    this.setTexture(this.playerRunTexture);
                    this.play(this.playerRunAnimation);
                    this.scene.uiScene.audioManager.aterrizaje.play()
                  }
            }else{
                this.isGrounded = false
                if (this.texture.key !== 'playerJump') {
                    this.anims.pause()
                    this.setTexture('playerJump');
                }
            }   
        }
            
    }
    setStun(){
        this.isStun= true
        this.setTexture('playerHit');
        this.play('hit');
    }

    fixPlayer(){
        this.isStun= false
    }

    setImage(texture){
        this.anims.pause()
        this.setTexture(texture);
    }

    UpdateFrameRate(barValue){
        let initialSpeed = 40
        let finalSpeed = 200
        this.anims.msPerFrame  = finalSpeed - (barValue * (finalSpeed-initialSpeed)); 
        //console.log("framerate " + this.anims.msPerFrame)
    }
}