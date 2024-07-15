export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'playerRun');
      this.setDepth(3)
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.baseFrameRate = 10
      this.setCollideWorldBounds(true);
      //this.setBounce(0.2);
      this.setGravityY(500);
      this.setSize(120,150);
      //this.setOffse5t(5, -20);
      // Definir las animaciones del jugador
        if (!this.scene.anims.exists('run')){
            scene.anims.create({
                key: 'run',
                frames: this.scene.anims.generateFrameNumbers('playerRun', { start: 0, end: 7, first: 0 }), // Frames del 0 al 9
                frameRate: this.baseFrameRate, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            });
        }

       this.anims.play('run', true);
       this.isGrounded = true
    }
  
    jump() {
        console.log("jump")

        if (this.body.touching.down) {
            this.uiScene.audioManager.salto.play()
            this.setVelocityY(this.scene.data.get('jumpForce')*-1);           
        }
    }

    changeAnimation(){
        if(this.body.touching.down){
            this.isGrounded = true
            if (this.texture.key !== 'playerRun') {
                this.setTexture('playerRun');
                this.play('run');
                this.uiScene.audioManager.aterrizaje.play()
              }
        }else{
            this.isGrounded = false
            if (this.texture.key !== 'playerJump') {
                this.anims.pause()
                this.setTexture('playerJump');
            }
        }       
    }

    UpdateFrameRate(barValue){
        let initialSpeed = 40
        let finalSpeed = 200
        this.anims.msPerFrame  = finalSpeed - (barValue * (finalSpeed-initialSpeed)); 
        //console.log("framerate " + this.anims.msPerFrame)
    }
}