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
        this.horizontalSpeed = this.scene.toPixels(5);
        this.acceleration = this.scene.toPixels(this.scene.data.get('bgAscendantAcceleration'));
        this.maxSpeed = this.scene.toPixels(this.scene.data.get('bgAscendantMaxSpeed'));
        this.obstacles = [];
        this.activeObstacles = [];
        this.obstacleCooldown = [15,10,8,6,3];
        this.currentDistance = this.scene.toPixels(15);
        this.probability = 7;
        this.currentZone = 1;
        this.zoneDistance = 0;
        this.obstaclesGroup = this.scene.physics.add.group();
    }

    create() {
        for (let i = 0; i < 5; i++) {
            let obs = this.scene.physics.add.image(0, 0, 'square').setOrigin(0).setScale(.1).setVisible(false).setTint('0x000000').setDepth(5);
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
                obstacle.sprite.setPosition(this.gameWidth, this.gameWidth-200).setVisible(true);
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

            if (obstacle.sprite.x <= -obstacle.sprite.displayWidth) {
                obstacle.sprite.setVisible(false);
                obstacle.status = 'free';
                this.activeObstacles.shift();
            }
        }
    }

    updateCurrentZone() {
        let meterDistance = Math.floor(this.scene.toMeters(this.zoneDistance));
        if (meterDistance >= this.currentZone * 100) {
            if (this.currentZone < 5) this.currentZone += 1;
            this.zoneDistance = 0;
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
        //this.scene.player. quitar vida?
    }
}