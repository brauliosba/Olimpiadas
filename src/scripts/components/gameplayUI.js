export class GameplayUI
{
    constructor(scene, gameWidth){
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.redBarSize = [.2,.3,.45,.6,.75];
        this.currentThreshold = .2;
    }

    create(){
        //Image UI
        // Progress Bar
        this.progressBar = this.scene.rexUI.add.slider({
            x: 400,
            y: 50,
            width: 500,
            height: 20,
            orientation: 'x',
            track: this.scene.add.rectangle(400, 50, 300, 20, 0x00FF00).setOrigin(0.5),
            thumb: this.scene.add.rectangle(400, 50, 20, 20, 0xFFFF00).setOrigin(0.5).setDepth(8.1),
            value: 0.4, // Valor inicial
            space: { top: 4, bottom: 4 },
            valuechangeCallback: this.onSliderValueChange.bind(this)
        }).layout();
        this.progressBar.value = this.scene.data.get('initialSpeed')/this.scene.data.get('maxSpeed');

        this.redBar = this.scene.add.rectangle(150, 40, 100, 20, 0xFF0000).setOrigin(0);

        this.hearts = this.scene.add.group({
            key: 'square', // Imagen a usar para los objetos del grupo
            repeat: 1, // Número de objetos adicionales a crear (total = repeat + 1)
            setXY: { x: 40, y: 50, stepX: 60 } // Posición inicial y el paso en el eje X
        });

        this.hearts.children.iterate(function (child) {
            child.setScale(0.05).setDepth(8).setTint('0xff0000'); // Establecer la escala de cada objeto
        });
        
        //Text UI
        //this.scoreText = this.scene.add.text(this.gameWidth/2, 40, '0', { fontFamily: 'Montserrat', fontSize: 45, color: '#FFFBE7' });
        //this.scoreText.setDepth(8).setOrigin(.5);

        /*
        //Feedback UI
        this.bombMessage = this.scene.add.image(0, 0, 'feedbackUI', 'message_bomb.png').setScale(.72).setDepth(8).setVisible(false);
        this.chopsticksMessage = this.scene.add.image(0, 0, 'feedbackUI', 'message_palillos.png').setScale(.72).setDepth(8).setVisible(false);
        this.feedbackScoreDict = {};
        */
    }

    onSliderValueChange(value) {
        if (value <= this.currentThreshold) {
            this.scene.startLoseTimer();
        } else {
            this.scene.stopLoseTimer();
        }
    }

    updateScore() {
        this.scoreText.setText(this.scene.score);
    }

    updateRedBar(currentZone) {
        this.currentThreshold = this.redBarSize[currentZone]
        this.redBar.width = this.progressBar.width * this.currentThreshold;
    }

    showMessage(x, y){
        this.bombMessage.setPosition(x, y - 100);
        this.feedbackFadeAnim(this.bombMessage);
    }

    feedbackFadeAnim(target, key){
        target.setVisible(true);
        let feedbackTween = this.scene.tweens.add({
            targets: target,
            ease: 'sine.inout',
            duration: 1000,
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
            },
            onComplete: () => {
                if (key == null ) target.setVisible(false);
                else {
                    this.feedbackScoreDict[key].setVisible(false)
                    this.feedbackScoreDict[key].destroy();
                    this.feedbackScoreDict[key] = null;
                    delete this.feedbackScoreDict[key];
                }
                target.setAlpha(1);
                feedbackTween?.remove();
                feedbackTween = null;
            }
        });
    }
}