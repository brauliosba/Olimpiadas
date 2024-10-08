class Obstacle {
    constructor(sprite){
        this.sprite = sprite;
        this.status = 'free';
    }
}

export class ObstacleManager
{
    constructor(scene, gameWidth) {
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.horizontalSpeed = this.scene.toPixels(this.scene.data.get('initialSpeed'));
        this.maxSpeed = this.scene.toPixels(this.scene.data.get('maxSpeed'));
        this.obstacles = [];
        this.activeObstacles = [];
        this.obstacleCooldown = [this.scene.data.get('cd1'),this.scene.data.get('cd2'),this.scene.data.get('cd3'),this.scene.data.get('cd4'),this.scene.data.get('cd5')];
        this.currentDistance = this.scene.toPixels(15);
        this.probability = 7;
        this.currentZone = 1;
        this.zoneDistance = 0;
        this.obstaclesGroup = this.scene.physics.add.group({
            allowGravity: false
        });

    }

    create() {
        
        this.scene.anims.create({
            key: 'falling',
            frames: this.scene.anims.generateFrameNumbers('valla', { start: 0, end: 6, first: 0 }), // Frames del 0 al 9
            frameRate: 30, // Velocidad de la animación
            hideOnComplete: false
        });

        
        for (let i = 0; i < 5; i++) {
            let obs = this.scene.physics.add.sprite(0, 0, 'valla', 0).setOrigin(0).setScale(.8).setVisible(false).setDepth(5);
            obs.colissionPlayer = false;
            console.log("CURRENT" + obs.anims.currentAnim)
            obs.setSize(30,150);
            obs.setOffset(120, 60);
            obs.body.allowGravity = false;
            let obstacle = new Obstacle(obs)
            this.obstacles.push(obstacle);
        }
       

        this.getEnemiesGroup();
    }

    update(dt) {
        if (this.currentZone <= 5) { 
            this.zoneDistance += this.horizontalSpeed * dt;
            this.updateCurrentZone();
        }
        
        this.currentDistance += this.horizontalSpeed * dt;
        this.checkObstacleSpawn();
        this.updateObstaclesPostion(dt);
    }

    checkObstacleSpawn() {
        let meterDistance = Math.floor(this.scene.toMeters(this.currentDistance));
        if (meterDistance >= this.obstacleCooldown[this.currentZone - 1]) {
            this.currentDistance = 0;
            let random = Phaser.Math.Between(1, 10);
            if (random <= this.probability) {
                this.activeObstacle();
                this.probability = this.currentZone > 3 ? 8 : 7;
            } else {
                this.probability += 1;
            }
        }
    }

    activeObstacle() {
        for (let i = 0; i < this.obstacles.length; i++) {
            let obstacle = this.obstacles[i];
            if (obstacle.status == 'free') {
                obstacle.sprite.enableBody();
                let posX = this.scene.powerUpManager.checkActivePowerUp();
                obstacle.sprite.setPosition(posX, this.gameWidth-420).setVisible(true);
                obstacle.status = 'active'
                this.activeObstacles.push(obstacle);
                break;
            }
        }
    }

    updateObstaclesPostion(dt){
        for (let i = 0; i < this.activeObstacles.length; i++) {
            let obstacle = this.activeObstacles[i];
            obstacle.sprite.x -= this.horizontalSpeed * dt;
            if (obstacle.sprite.x <=this.scene.player.x-150 && !obstacle.sprite.colissionPlayer){

                console.log("ESQUIVO ")
                this.scene.uiScene.audioManager.playRandomStadioSound()
                this.scene.score += 100
                this.scene.visualEffectsManager.CreateNumbersText(100)
                obstacle.sprite.colissionPlayer = true
            }
            if (obstacle.sprite.x <= -obstacle.sprite.displayWidth) {
                
                obstacle.sprite.setVisible(false);
                obstacle.sprite.anims.pause()
                obstacle.sprite.setFrame(0)
                obstacle.sprite.colissionPlayer = false
                obstacle.status = 'free';
                this.activeObstacles.shift();
            }
        }
    }

    updateCurrentZone() {
        let meterDistance = Math.floor(this.scene.toMeters(this.zoneDistance));
        if (meterDistance >= this.currentZone * this.scene.data.get('tamaño_fase')) {
            if (this.currentZone < 5) this.currentZone += 1;
            this.zoneDistance = 0;
            this.scene.gameplayUI.updateRedBar(this.currentZone - 1);
        }
    }
    
    getEnemiesGroup(){
        const obstacle = this.scene.obstacleManager.obstacles;
        for (let i = 0; i < obstacle.length; i++) {
            this.obstaclesGroup.add(obstacle[i].sprite);
        }
        this.scene.physics.add.overlap(this.scene.player.body, this.obstaclesGroup, this.collisionHandler, null, this);
    }

    collisionHandler(playerBody, obstacleBody) {
        if(!this.scene.player.getStun()){
            this.scene.uiScene.audioManager.estadio_u.play()
            this.scene.uiScene.audioManager.golpe.play()
            obstacleBody.anims.play('falling')
            this.scene.player.setStun()
            
            obstacleBody.colissionPlayer = true;
        
            this.scene.lifes -= 1;
            this.scene.gameplayUI.hearts.getChildren()[this.scene.lifes].setVisible(false);
            if (this.scene.lifes == 0) {
                this.scene.player.setFall()
                this.scene.gameState = 'game_over';}
        }
        
    }

    checkActiveObstacles() {
        for (let i = 0; i < this.activeObstacles.length; i++) {
            let obstacle = this.activeObstacles[i];
            if (obstacle.sprite.x + obstacle.sprite.displayWidth >= 1000) return true;
        }

        return false;
    }
}