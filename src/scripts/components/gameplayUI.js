export class GameplayUI
{
    constructor(scene, gameWidth){
        this.scene = scene;
        this.gameWidth = gameWidth;
        this.redBarSize = 70;
        this.currentThreshold = .364;
    }

    create(){
        //Image UI
        //UI
        this.mobileContainer = this.scene.add.container().setDepth(6.2);
        this.desktopContainer = this.scene.add.container().setDepth(6.2);
        this.inGameBoard = this.scene.add.image(550, 150, 'UIgame','TableroInGame.png').setDepth(6)
        this.inGameBar = this.scene.add.image(550, 330, 'UIgame','Bar.png').setDepth(6)

        this.tapTimer;
        this.tapInterval = 2000; 
        if (this.scene.data.get('IS_TOUCH')) {
           
            this.tapRight = this.scene.add.image(850, 850, 'inputs', 'tapatlon_tap.png').setDepth(6.2).setOrigin(0)
            this.tapLeft = this.scene.add.image(20, 850, 'inputs', 'tapatlon_tap.png').setDepth(6.2).setOrigin(0).setFlipX(true)
            this.mobileContainer.add(this.tapRight)
            this.mobileContainer.add(this.tapLeft)
        }

        // Progress Bar
        this.progressBar = this.scene.rexUI.add.slider({
            x: 560,
            y: 323,
            width: 780,
            height: 50,
            orientation: 'x',
            track: this.scene.add.rectangle(400, 50, 300, 20, 0x91CCBC).setOrigin(0.5).setDepth(5),
            value: 0.4, // Valor inicial
            space: { top: 4, bottom: 4 },
            valuechangeCallback: this.onSliderValueChange.bind(this),
            onCreate: (slider) => {
                slider.getElement('thumb').y += 50; // Ajusta el valor según sea necesario
            }
        }).layout();
        

        this.progressBar.value = this.scene.data.get('initialSpeed')/this.scene.data.get('maxSpeed');
        this.thumb = this.scene.add.image(400, 360, 'UIgame', 'Group 141.png').setDepth(8.1)
        this.updateThumb()

        let barHeight = 40
        this.barWidth = 300
        let barX = 165;
        let barY = 305;
        this.redBar = this.scene.add.rectangle(barX, barY, 700, barHeight, 0xE05243).setOrigin(0).setDepth(5.1);

        // Crear un objeto gráfico para la máscara
        let maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);

        // Definir la forma de la máscara (diagonal en este caso)
        maskShape.beginPath();
        maskShape.moveTo(barX, barY); // Inicio de la máscara en la esquina superior izquierda de la barra
        
        maskShape.lineTo(barX + this.barWidth, barY ); // Punto en la esquina inferior derecha
        maskShape.lineTo(barX + this.barWidth - 20, barY + barHeight); // Punto a la  derecha pero no al final
        maskShape.lineTo(barX, barY + barHeight); // Cerrar la forma en la esquina inferior izquierda
        maskShape.closePath();
        maskShape.fillPath();

        // Crear una máscara a partir de la forma gráfica
        let mask = maskShape.createGeometryMask();

        // Aplicar la máscara a la barra
        this.redBar.setMask(mask);



        this.hearts = this.scene.add.group();

        // Posición inicial
        var x = 235;
        var y = 70;
        var stepX = 90;

        // Crear los objetos manualmente y añadirlos al grupo
        for (var i = 0; i < this.scene.lifes; i++) {
            var heart = this.scene.add.image(x + i * stepX, y, 'UIgame', 'Vida.png');
            this.hearts.add(heart);
        }

        this.hearts.children.iterate(function (child) {
            child.setScale(1).setDepth(8); // Establecer la escala de cada objeto
        });
        
        //Text UI
        
        this.scoreText = this.scene.add.text(this.gameWidth-510, 180, '0', { font: '800 90px Bungee', color: '#FFFFFF' }).setOrigin(0.5)
        this.scoreText.setDepth(8).setAlign('center');

        /*
        //Feedback UI
        this.bombMessage = this.scene.add.image(0, 0, 'feedbackUI', 'message_bomb.png').setScale(.72).setDepth(8).setVisible(false);
        this.chopsticksMessage = this.scene.add.image(0, 0, 'feedbackUI', 'message_palillos.png').setScale(.72).setDepth(8).setVisible(false);
        this.feedbackScoreDict = {};
        */
    }

    handlePointerDown() {
        // Reiniciar el temporizador de taps
        clearTimeout(this.tapTimer);
    
        // Ocultar el contenedor con una animación
        this.hideMobileUI();
    
        // Configurar el temporizador para mostrar el contenedor después de un periodo de inactividad
        this.tapTimer = setTimeout(() => this.showMobileUI.call(this), this.tapInterval);
    }
    hideMobileUI() {
        if (this.mobileContainer.alpha === 1) {
            // Crear la animación para hacer desaparecer el contenedor
            this.scene.tweens.add({
                targets: this.mobileContainer,
                alpha: 0,
                duration: 500,
                ease: 'Power2'
            });
        }
    }
    showMobileUI() {
        if (this.mobileContainer.alpha === 0) {
            this.scene.tweens.add({
                targets: this.mobileContainer,
                alpha: 1,
                duration: 500,
                ease: 'Power2'
            });
        }
    }
    updateThumb(){    
        console.log("THUMB"+this.thumb.x)
        this.thumb.x = (this.progressBar.value*750+178)
    }
    onSliderValueChange(value) {
        
        if (value <= this.currentThreshold) {
            this.scene.startLoseTimer();
        } else {
            this.scene.stopLoseTimer();
        }
    }

    updateScore(score) {
        //this.progressBar.getElement('thumb').setY(400);
        this.scoreText.setText(score);
    }

    updateRedBar(currentZone) {
        this.currentThreshold += 0.091
        this.barWidth += this.redBarSize
        let maskShape = this.scene.make.graphics();
        maskShape.fillStyle(0xffffff);

        // Definir la forma de la máscara (diagonal en este caso)
        maskShape.beginPath();
        maskShape.moveTo(165, 305); 
        
        maskShape.lineTo(165+this.barWidth, 305); 
        maskShape.lineTo(165+this.barWidth-20, 345); 
        maskShape.lineTo(165, 345); 
        maskShape.closePath();
        maskShape.fillPath();

        // Crear una máscara a partir de la forma gráfica
        let mask = maskShape.createGeometryMask();

        // Aplicar la máscara a la barra
        this.redBar.setMask(mask);
        
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