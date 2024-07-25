import * as Phaser from 'phaser';
export class MenuScene extends Phaser.Scene
{
    constructor(){
        super({key: 'MenuScene'});
    }

    preload(){
        //this.load.image(`square`, `src/images/square.png`);
        this.load.image(`menuBG`, `src/images/inicio-ilustracion.png`);
        //this.load.atlas(`menuUI`, `src/images/ui/menu_ui.png`, `src/images/ui/menu_ui.json`);
        this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);
    }

    init(data){
        this.data = data;
    }

    create(){
        this.gameWidth = 1080;

        this.data.set('initialSpeed', 4);
        this.data.set('maxSpeed', 9.5);
        this.data.set('clickSpeed', 100);
        this.data.set('lostSpeed', 100);
        this.data.set('jumpForce',1050);
        this.data.set('scoreThreshold', 1);
        this.data.set('powerThreshold', 40);
        this.data.set('cd1', 18);
        this.data.set('cd2', 18);
        this.data.set('cd3', 16);
        this.data.set('cd4', 14);
        this.data.set('cd5', 12);
        this.data.set('gravity', 3000);
        this.data.set('tamaño_fase', 40);
        
        //UI
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);

        /*
        this.loadingBG = this.add.image(this.gameWidth/2, this.gameWidth/2, 'loadingBG').setDisplaySize(this.gameWidth, this.gameWidth);
        this.loadingBG.setDepth(5).setInteractive().setVisible(false);
        this.loadingSlider = this.rexUI.add.slider({
            x: this.gameWidth/2,
            y: this.gameWidth/2,
            width: 650,
            height: 50,
            orientation: `x`,
            value: 0,
    
            track: this.add.sprite(0,0,`loadingUI`,`carga_contenedor.png`),
            indicator: this.addCropResizeMethod(this.add.sprite(0,0,`loadingUI`,`carga_barra.png`).setScale(.95,1)),
            thumb: this.add.sprite(0,0,`loadingUI`,`carga_icono.png`).setScale(.9,.9),
    
            input: `none`,
            space: {
            top: 10,
            right: 0,
            left: -23,
            bottom: 4
            },
        }).layout().setDepth(5).setVisible(false);
        */

        this.isPaused = false;
       
        
        let bg = this.add.image(this.gameWidth/2, this.gameWidth/2, 'menuBG').setDisplaySize(this.gameWidth, this.gameWidth);
        /*
        bg.setInteractive().on('pointerdown', () => { this.uiScene.audioManager.resumeMusic(); this.isPaused = false; });
        if (this.data.get('sponsor')) {
            // agregar sponsor assets
            this.game.config.metadata.onDataSend({name:`turbo_delivery`, sponsorCounter:1});
        }

        this.add.image(140, 80, `menuUI`, `logo_pchujoy.png`).setScale(.72);
        */

        let playButton = this.add.text(this.gameWidth/2, 890, 'JUGAR', { fontFamily: 'Bungee', fontSize : 80, color: '#000000' }).setScale(.72);
        playButton.setInteractive().on('pointerup', () => {
            this.uiScene.audioManager.stopMusic();
            this.nextSceneReady = false;
            this.showLoading();
            //this.uiScene.audioManager.buttonPlay.play();
        });

        let optionsButton = this.add.image(this.gameWidth/2-250, 890, 'menuUI', 'boton_opciones.png').setScale(.72);
        optionsButton.setInteractive().on('pointerdown', () => { this.uiScene.panel.showOptions(); /*this.uiScene.audioManager.buttonClick.play();*/ });

        let turotialButton = this.add.image(this.gameWidth/2+250, 890, 'menuUI', 'boton_tutorial.png').setScale(.72);
        turotialButton.setInteractive().on('pointerdown', () => { this.uiScene.panel.showInstructions(() => null); /*this.uiScene.audioManager.buttonClick.play();*/ });

        let creditsButton = this.add.image(this.gameWidth-120, 105, `menuUI`, `boton_creditos.png`).setScale(.72);
        creditsButton.setInteractive().on('pointerdown', () => { this.uiScene.panel.showCredits(); /*this.uiScene.audioManager.buttonClick.play();*/ });

        this.exposedVariables();
        this.uiScene.audioManager.playMusic();
    }

    update(){
        /*
        if (this.nextSceneReady && this.loadingSlider.value == .9) {
            this.nextSceneReady = false;
            let sliderTween = this.tweens.add({
                targets: this.loadingSlider,
                ease: `sine.inout`,
                duration: 500,
                repeat: 0,
                value: {
                  getStart: () => .9,
                  getEnd: () => 1
                },
                onComplete: () => {
                    this.mainScene.startRunning = true;
                    this.uiScene.audioManager.menuMusic.stop();
                    sliderTween?.remove();
                    sliderTween = null;
                    this.scene.stop();
                }
            });
        }
        */
        if (this.nextSceneReady){
            this.mainScene.startRunning = true;
            this.scene.stop();
        }
    }

    showLoading(){
        /*
        this.loadingBG.setVisible(true);
        this.loadingSlider.setVisible(true);

        let sliderTween = this.tweens.add({
            targets: this.loadingSlider,
            ease: `sine.inout`,
            duration: 1500,
            repeat: 0,
            value: {
              getStart: () => 0,
              getEnd: () => .9
            },
            onComplete: () => {
                sliderTween?.remove();
                sliderTween = null;
            }
        });
        */

        this.scene.launch('MainScene', [this.data, true]);
        this.scene.sendToBack('MainScene');
        this.mainScene = this.scene.get("MainScene");
        this.scene.get(`MainScene`).events.once(`create`, () => {
            
            this.mainScene.startRunning = false;
            this.nextSceneReady = true;
        });
    }

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }

    addVariable(y, label, key){
        this.add.text(200, y, label, {
            color: 'yellow',
            fontSize: '24px',
            fixedWidth: 400,
            fixedHeight: 50,
            backgroundColor: '#333333',
        }).setOrigin(0.5)

        let printText = this.add.text(480, y, this.data.get(key), {
            color: 'yellow',
            fontSize: '24px',
            fixedWidth: 150,
            fixedHeight: 50,
            backgroundColor: '#333333',
        }).setOrigin(0.5)

        this.plugins.get('rextexteditplugin').add(printText, {
            type: 'text',
            onTextChanged: (textObject, text) => { textObject.text = text; this.setData(key, text); },
            selectAll: true,
        });
    }

    exposedVariables(){
        let y = 80
        let space = 60;
        
        this.addVariable(y, `Velocidad Inicial:`, 'initialSpeed');
        this.addVariable(y + space * 1, `Velocidad Maxima:`, 'maxSpeed');
        this.addVariable(y + space * 2, `Porcentaje Velocidad \npor click:`, 'clickSpeed');
        this.addVariable(y + space * 3, `Porcentaje Velocidad \nperdida:`, 'lostSpeed');
        this.addVariable(y + space * 4, `Fuerza de salto`, 'jumpForce');
        this.addVariable(y + space * 5, `Distancia para obtener \npuntaje (metros):`, 'scoreThreshold');
        this.addVariable(y + space * 6, `Distancia para obtener \npower up (minimo 10 metros):`, 'powerThreshold');
        this.addVariable(y + space * 7, `Cooldown entre obstaculos en la fase 1`, 'cd1');
        this.addVariable(y + space * 8, `Cooldown entre obstaculos en la fase 2`, 'cd2');
        this.addVariable(y + space * 9, `Cooldown entre obstaculos en la fase 3`, 'cd3');
        this.addVariable(y + space * 10, `Cooldown entre obstaculos en la fase 4`, 'cd4');
        this.addVariable(y + space * 11, `Cooldown entre obstaculos en la fase 5`, 'cd5');
        this.addVariable(y + space * 12, `Gravedad`, 'gravity');
        this.addVariable(y + space * 13, `Tamaño en metros de la fase: `, 'tamaño_fase');
    }

    setData(key, speed){
        this.data.set(key, parseFloat(speed))
    }

    pauseGame(){
        this.isPaused = true;
    }
}