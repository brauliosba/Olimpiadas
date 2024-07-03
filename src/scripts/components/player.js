export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'player');
      this.setDepth(3)
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.baseFrameRate = 10
      this.setCollideWorldBounds(true);
      //this.setBounce(0.2);
      this.setGravityY(300);

      // Definir las animaciones del jugador
        if (!this.scene.anims.exists('run')){
            scene.anims.create({
                key: 'run',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 9, first: 0 }), // Frames del 0 al 9
                frameRate: this.baseFrameRate, // Velocidad de la animación
                repeat: -1 // Repetir indefinidamente
            });
        }

       this.anims.play('run', true);
    }
  
    jump() {
        console.log("jump")
        if (this.body.touching.down) {
            this.setVelocityY(-500);
        }
    }

    UpdateFrameRate(barValue){
        let initialSpeed = 40
        let finalSpeed = 200
        this.anims.msPerFrame  = finalSpeed - (barValue * (finalSpeed-initialSpeed)); 
        //console.log("framerate " + this.anims.msPerFrame)
    }
}