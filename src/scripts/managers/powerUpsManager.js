class PowerUp {
    constructor(sprite){
        this.sprite = sprite;
        this.status = 'free';
    }
}

export class PowerUpsManager
{
    constructor(scene, gameWidth) {
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.horizontalSpeed = this.scene.toPixels(this.scene.data.get('initialSpeed'));
        this.powerThreshold = this.scene.toPixels(this.scene.data.get('powerThreshold'));
        this.currentDistance = 0;
        this.probability = 50;
        this.powerCooldown = this.powerThreshold;
    }

    create(){
        let sprite = this.scene.physics.add.sprite(0, 0, 'square').setOrigin(0).setScale(.1).setVisible(false).setTint('0x00FF00').setDepth(5);
        sprite.body.allowGravity = false;
        this.powerUp = new PowerUp(sprite);

        this.scene.physics.add.overlap(this.scene.player.body, this.powerUp.sprite, this.collisionHandler, null, this);
    }

    update(dt) {        
        this.currentDistance += this.horizontalSpeed * dt;
        this.checkPowerUpSpawn();
        this.updatePowerUpPostion(dt);
    }

    checkPowerUpSpawn() {
        if (this.currentDistance >= this.powerCooldown) {
            this.currentDistance = 0;
            let random = Phaser.Math.Between(1, 100);
            if (random <= this.probability) {
                this.powerCooldown = this.powerThreshold;
                this.probability = 50;
                this.activePowerUp();
            } else {
                this.powerCooldown = this.scene.toPixels(1);
                this.probability += 5;
            }
        }
    }

    activePowerUp() {
        this.powerUp.sprite.enableBody();
        let isObstacle = this.scene.obstacleManager.checkActiveObstacles();
        let posY = isObstacle ? this.gameWidth-340 : this.gameWidth-220;
        this.powerUp.sprite.setPosition(this.gameWidth, posY).setVisible(true);
        this.powerUp.status = 'active';
        this.powerUp.sprite.id = 0;
    }

    updatePowerUpPostion(dt) {
        if (this.powerUp.status == 'active') {
            this.powerUp.sprite.x -= this.horizontalSpeed * dt;

            if (this.powerUp.sprite.x <= -this.powerUp.sprite.displayWidth) {
                this.powerUp.sprite.setVisible(false);
                this.powerUp.status = 'free';
            }
        }
    }

    collisionHandler(playerBody, powerUp) {
        powerUp.disableBody(true, false);
        powerUp.setVisible(false);
        this.scene.score += 1000;

        switch (powerUp.id) {
            case 0:
                if (this.scene.lifes < 2) {
                    this.scene.gameplayUI.hearts.getChildren()[this.scene.lifes].setVisible(true);
                    this.scene.lifes += 1;
                }
                break;
            case 1:
                break;
            default:
                break;
        }
    }
}