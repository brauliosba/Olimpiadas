export class BackgroundManager
{
    constructor(scene, gameWidth) {
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.horizontalSpeed = this.scene.toPixels(this.scene.data.get('initialSpeed'));
        this.backgrounds = [];
        this.clouds = [];
        this.lastCloudIndex = 2;
    }

    create() {
        this.scene.add.image(0,0,'background').setOrigin(0).setScale(.72).setDepth(0);
        this.scene.add.image(0,270,'bg','gradas.png').setOrigin(0).setScale(.72).setDepth(0.1);
        this.seats = this.scene.add.tileSprite(0,335,0,0,'bg','asientos.png').setOrigin(0).setScale(.72).setDepth(0.2);
        
        this.scene.add.image(0,this.gameWidth-470,'bg','muro.png').setOrigin(0).setScale(.72).setDepth(0.3);
        this.logo = this.scene.add.tileSprite(0,this.gameWidth-415,0,0,'bg','logo.png').setOrigin(0).setScale(.72).setDepth(0.4);
        this.scene.add.image(0,this.gameWidth-250,'bg','pista.png').setOrigin(0).setScale(.72).setDepth(0.5);
        this.extra = this.scene.add.tileSprite(0,720,0,0,'extra').setOrigin(0).setScale(.72).setDepth(0.6);
        let cloud = this.scene.add.image(300, 180, 'clouds', '1.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud);

        let cloud2 = this.scene.add.image(700, 80, 'clouds', '2.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud2);

        let cloud3 = this.scene.add.image(1100, 130, 'clouds', '3.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud3);

        let cloud4 = this.scene.add.image(1500, 90, 'clouds', '2.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud4);
        //this.horizontalSpeed *= 1.7

    }

    update(dt) {
        
        this.extra.tilePositionX += this.horizontalSpeed * dt * 1.9 ;
        this.seats.tilePositionX += this.horizontalSpeed * dt* 1.9 *.8  ;
        this.logo.tilePositionX += this.horizontalSpeed * dt* 1.9 ;

        this.cloudsUpdate(dt);
    }

    cloudsUpdate(dt){
        for(let i = 0; i < this.clouds.length; i++){
            let cloud = this.clouds[i];
            cloud.x -= this.horizontalSpeed * .5 * dt;

            if (cloud.x <= -cloud.displayWidth/2){
                this.drawCloud()
            }
        }
    }

    drawCloud(){
        let type = Phaser.Math.Between(1, 4);
        type = type != this.lastCloudIndex ? type : type + 1 > 4 ? 1 : type + 1;
        this.lastCloudIndex = type;
        let cloud = this.clouds[0];
        cloud.setTexture('clouds', type + '.png');
        const lastCloud =  this.clouds[this.clouds.length - 1]
        const posX = lastCloud.x + lastCloud.displayWidth/2 + cloud.displayWidth/2 + 200;
        const posY = Phaser.Math.Between(80, 180);
        cloud.setPosition(posX, posY);

        this.clouds.shift();
        this.clouds.push(cloud);
    }
}