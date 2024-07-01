export class BackgroundManager
{
    constructor(scene, gameWidth) {
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.horizontalSpeed = this.scene.toPixels(2);
        this.acceleration = this.scene.toPixels(this.scene.data.get('bgAscendantAcceleration'));
        this.maxSpeed = this.scene.toPixels(this.scene.data.get('bgAscendantMaxSpeed'));
        this.backgrounds = [];
    }

    create() {
        this.b1 = this.scene.add.image(0, 0, 'square').setOrigin(0).setDisplaySize(this.gameWidth, this.gameWidth);
        this.backgrounds.push(this.b1);

        this.b2 = this.scene.add.image(0, 0, 'square').setOrigin(0).setDisplaySize(this.gameWidth, this.gameWidth).setTint('0x95A922');
        this.b2.x = this.b1.displayWidth;
        this.backgrounds.push(this.b2);
    }

    update(dt) {
        const updateBackgroundPosition = (background) => {
            background.x -= this.horizontalSpeed * dt;
        };

        const resetBackground = (background) => {
            if (background.x <= -this.gameWidth) {
                //let textureIndex = this.currentZone < 5 ? this.currentZone : 5;
                //background.setTexture('backgrounds', 'background' + textureIndex + '.png').setDisplaySize(this.gameWidth, this.gameWidth + 20);
                background.x = this.backgrounds[this.backgrounds.length-1].x + background.displayWidth;
                background.id = this.currentZone;
                let temp = this.backgrounds[0];
                this.backgrounds.shift();
                this.backgrounds.push(temp);
            }
        }
    
        updateBackgroundPosition(this.b1);
        updateBackgroundPosition(this.b2);
        resetBackground(this.b1);
        resetBackground(this.b2);
    }
}