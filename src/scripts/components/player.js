export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'player');
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.setCollideWorldBounds(true);
      //this.setBounce(0.2);
      this.setGravityY(300);
    }
  
    jump() {
        console.log("jump")
        if (this.body.touching.down) {
            this.setVelocityY(-500);
        }
    }
  }