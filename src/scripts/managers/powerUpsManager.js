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

        this.scene.anims.create({
            key: 'corazon',
            frames: this.scene.anims.generateFrameNumbers('corazonOff', { start: 0, end: 4, first: 0 }), // Frames del 0 al 9
            frameRate: 15, // Velocidad de la animación
            hideOnComplete: false
        });
        this.scene.anims.create({
            key: 'zapatilla',
            frames: this.scene.anims.generateFrameNumbers('zapatillaOff', { start: 0, end: 4, first: 0 }), // Frames del 0 al 9
            frameRate: 15, // Velocidad de la animación
            hideOnComplete: false
        });

        let sprite = this.scene.physics.add.sprite(0, 0, 'corazon').setOrigin(0).setScale( .5).setVisible(false).setDepth(5).setSize(100,150).setOffset(120, 100);
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
        let posX = isObstacle ? this.gameWidth+120 : this.gameWidth;
        this.powerUp.sprite.setPosition(posX, this.gameWidth-390).setVisible(true);
        this.powerUp.status = 'active';

        let rand = Phaser.Math.Between(0, 1);
        if (rand == 0) {
            this.powerUp.sprite.id = 0;
            this.powerUp.sprite.setTexture('corazon');
        } else {
            this.powerUp.sprite.id = 1;
            this.powerUp.sprite.setTexture('zapatilla');
        }
    }

    updatePowerUpPostion(dt) {
        if (this.powerUp.status != 'free') {
            this.powerUp.sprite.x -= this.horizontalSpeed * dt;

            if (this.powerUp.sprite.x <= -this.powerUp.sprite.displayWidth) {
                this.powerUp.sprite.setVisible(false);
                this.powerUp.status = 'free';
            }
        }
    }

    collisionHandler(playerBody, powerUp) {
        if(this.powerUp.status == 'active'){
            this.powerUp.status = 'taken'
            this.scene.score += 1000;
    
            switch (powerUp.id) {
                case 0:
                    this.scene.uiScene.audioManager.corazon.play()
                    this.powerUp.sprite.setTexture('corazon')
                    this.powerUp.sprite.anims.play('corazon')
                    this.scene.visualEffectsManager.CreateMessage('¡Vida Extra!')
                    if (this.scene.lifes < 2) {
                        this.scene.gameplayUI.hearts.getChildren()[this.scene.lifes].setVisible(true);
                        this.scene.lifes += 1;
                    }
                    break;
                case 1:
                    this.scene.uiScene.audioManager.zapatilla.play()
                    this.powerUp.sprite.setTexture('zapatilla')
                    this.powerUp.sprite.anims.play('zapatilla')
                    this.scene.visualEffectsManager.CreateMessage('¡Turbo Activado!')
                    let newValue = this.scene.gameplayUI.progressBar.value + (this.scene.gameplayUI.progressBar.value*.4);
                    if(newValue< 1)this.scene.gameplayUI.progressBar.value = newValue
                    else this.scene.gameplayUI.progressBar.value =1
                    break;
                default:
                    break;
            }
        }
       
    }

    checkActivePowerUp() {
        let sprite = this.powerUp.sprite;
        if (sprite.x + sprite.displayWidth >= 1000) return sprite.x + sprite.displayWidth + 50;
        return this.gameWidth;
    }
}