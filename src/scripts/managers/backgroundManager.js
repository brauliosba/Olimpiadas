export class BackgroundManager
{
    constructor(scene, gameWidth) {
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.horizontalSpeed = this.scene.toPixels(this.scene.data.get('initialSpeed'));
        this.backgrounds = [];
        this.clouds = [];
        this.wallTextures = [];
        this.lastCloudIndex = 2;
        this.lastWallIndex = 2;
        this.wallLogoCounter = 2;
    }

    create() {
        this.scene.add.image(0,0,'background').setOrigin(0).setScale(.72).setDepth(0);
        this.scene.add.image(0,170,'bg','gradas.png').setOrigin(0).setScale(.72).setDepth(0.1);
        //this.seats = this.scene.add.tileSprite(0,235,0,0,'bg','asientos.png').setOrigin(0).setScale(.72).setDepth(0.2);
        
        this.scene.add.image(0,this.gameWidth-570,'bg','muro.png').setOrigin(0).setScale(.72).setDepth(0.3);
        //this.logo = this.scene.add.tileSprite(0,this.gameWidth-515,0,0,'logoTexture').setOrigin(0).setScale(.72).setDepth(0.4);
        this.scene.add.image(0,this.gameWidth-350,'pista').setOrigin(0).setScale(.72).setDepth(0.5);
        this.extra = this.scene.add.tileSprite(0,620,0,0,'extra').setOrigin(0).setScale(.72).setDepth(0.6);
        let cloud = this.scene.add.image(300, 80, 'clouds', '1.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud);

        let cloud2 = this.scene.add.image(700, -20, 'clouds', '2.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud2);

        let cloud3 = this.scene.add.image(1100, 30, 'clouds', '3.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud3);

        let cloud4 = this.scene.add.image(1500, -10, 'clouds', '2.png').setOrigin(.5).setScale(.72);
        this.clouds.push(cloud4);

        let wall1 = this.scene.add.image(0, this.gameWidth-440, 'pared', 'logo.png').setOrigin(0, .5).setScale(.72).setDepth(0.6);
        this.wallTextures.push(wall1);

        let wall2 = this.scene.add.image(0, this.gameWidth-400, 'pared', 'podio.png').setOrigin(0, .5).setScale(.72).setDepth(0.6);
        wall2.x = wall1.displayWidth;
        this.wallTextures.push(wall2);

        let wall3 = this.scene.add.image(0, this.gameWidth-410, 'pared', 'trofeo.png').setOrigin(0, .5).setScale(.72).setDepth(0.6);
        wall3.x = wall2.x + wall2.displayWidth;
        this.wallTextures.push(wall3);

        // Create an array to hold the crowd images
        this.crowdImages = [];

        // Initial positions for the images
        let positions = [0, 1100, 2200, 3300]; // Adjust based on your image width and desired spacing

        // Create image sprites and add them to the array
        for (let i = 0; i < 4; i++) {
            let image = this.scene.add.sprite(positions[i], 335, 'people', `tapatlon_publico_0${i+1}`+'.png').setScale(.72).setDepth(0.2).setOrigin(0,.5);
            this.crowdImages.push(image);
        }
    }

    update(dt) {      
        this.extra.tilePositionX += this.horizontalSpeed * dt * 2 ;
        //this.seats.tilePositionX += this.horizontalSpeed * dt* 1.9 *.8  ;
        //this.logo.tilePositionX += this.horizontalSpeed * dt* 1.9 ;
        this.crowdImages.forEach(image => {
            image.x -=  this.horizontalSpeed * dt *.8 ;

            // If the image moves off-screen to the left, reposition it to the right
            if (image.x < -image.width) {
                let maxX = Math.max(...this.crowdImages.map(img => img.x));
                // Reposiciona la imagen fuera de la pantalla a la derecha de la más a la derecha
                image.x = maxX + image.width;
            }
        });
        this.wallUpdate(dt);
        this.cloudsUpdate(dt);
    }  

    cloudsUpdate(dt){
        for(let i = 0; i < this.clouds.length; i++){
            let cloud = this.clouds[i];
            cloud.x -= this.horizontalSpeed * .5 * dt;

            if (cloud.x <= -cloud.displayWidth/2){
                this.drawCloud()
                i--;
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

    wallUpdate(dt){
        for (let i = 0; i < this.wallTextures.length; i++){
            let texture = this.wallTextures[i];
            texture.x -= dt * this.horizontalSpeed * 1.4;

            if (texture.x <= -texture.displayWidth){
                this.drawWallTexture();
                i--;
            }
        }
    }

    drawWallTexture(){
        let type = Phaser.Math.Between(1, 2);
        type = type != this.lastWallIndex ? type : type + 1 > 2 ? 1 : type + 1;
        if (this.wallLogoCounter >= 2) { type = 0; this.wallLogoCounter = 0; }
        else { this.wallLogoCounter += 1; }
        this.lastWallIndex = type;
        let texture = this.wallTextures[0];
        let key, posY;
        switch (type) {
            case 0:
                key = 'logo.png';
                posY = this.gameWidth-440;
                break;
            case 1:
                key = 'podio.png';
                posY = this.gameWidth-400;
                break;
            case 2:
                key = 'trofeo.png';
                posY = this.gameWidth-410;
                break;
            default:
                break;
        }
        
        texture.setTexture('pared', key);
        const lastTexture =  this.wallTextures[this.wallTextures.length - 1]
        const posX = lastTexture.x + lastTexture.displayWidth;
        texture.setPosition(posX, posY);

        this.wallTextures.shift();
        this.wallTextures.push(texture);
    }
}