
import {Panel} from '../components/panel.js';
import {AnimationsManager} from '../managers/animationManager.js';
import {AudioManager} from '../managers/audioManager.js';
import * as Phaser from 'phaser';
import { config } from '../../config.js';
const { pchujoyPublicFilesPath } = config; 

export class UIScene extends Phaser.Scene
{
    constructor(){
        super({key: 'UIScene'})
    }

    preload(){
        this.load.image('panel', `${pchujoyPublicFilesPath}/images/ui/menus/fondo.png`);
        this.load.image('panelCredits', `${pchujoyPublicFilesPath}/images/ui/menus/fondo_creditos.png`);
        this.load.image('panelInstructions', `${pchujoyPublicFilesPath}/images/ui/menus/fondo_instrucciones.png`);
        this.load.image('panelScore', `${pchujoyPublicFilesPath}/images/ui/menus/fondo_fin.png`);
        this.load.atlas('panelUI', `${pchujoyPublicFilesPath}/images/ui/panel_ui.png`, `${pchujoyPublicFilesPath}/images/ui/panel_ui.json`);
        this.load.atlas('tutorialUI', `${pchujoyPublicFilesPath}/images/ui/tutorial_ui.png`, `${pchujoyPublicFilesPath}/images/ui/tutorial_ui.json`);
        this.load.image('leapLogo', `${pchujoyPublicFilesPath}/images/ui/leap_logo.png`);
        this.load.image('logoPChuJoy', `${pchujoyPublicFilesPath}/images/logo_pchujoy.jpg`);
        this.load.image('fade', `${pchujoyPublicFilesPath}/images/black_alpha_40.png`);

        //sounds
        this.audioManager = new AudioManager(this);
        this.audioManager.load();

        //anims
        this.animationsManager = new AnimationsManager(this);
        this.animationsManager.load();
    }

    init(data){
        this.data = data;
    }

    create(){
        this.gameWidth = this.game.config.width;
        this.audioManager.init();
        this.animationsManager.createAnimations();

        this.panel = new Panel(this);
        this.panel.create(this.gameWidth);
        this.panel.createInstructionsPanel(this.gameWidth);
        this.panel.createOptionsPanel(this.gameWidth);
        this.panel.createCreditsPanel(this.gameWidth);

        this.graphics = this.add.graphics().setDepth(10).setVisible(false);
        this.graphics.fillStyle(0x000000, 1);
        this.graphics.fillRect(0, 0, this.gameWidth, this.gameWidth);
        
        this.splashScreen = this.add.image(this.gameWidth/2, this.gameWidth/2, 'logoPChuJoy');
        this.splashScreen.setDisplaySize(this.gameWidth, this.gameWidth).setDepth(10).setAlpha(0).setInteractive();

        window.addEventListener('fullscreenchange', () => {
            let phaserDiv = document.getElementById('phaser-div');

            // Verificar si el juego está en modo de pantalla completa
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitEnterFullscreen) {
                // Si está en pantalla completa, establecer el tamaño del contenedor al tamaño de la ventana
                phaserDiv.style.width = window.innerWidth + 'px';
                phaserDiv.style.height = window.innerHeight + 'px';
            } else {
                // Si no está en pantalla completa, restaurar el tamaño original del contenedor
                phaserDiv.style.width = this.data.get('parentSize');
                phaserDiv.style.height = this.data.get('parentSize');
            }

            if (this.panel && document.fullscreenElement === null) {
                this.panel.setToggleFullscreen(false, this.gameWidth/2);
            }
        });
    }

    splashScreenAnim(){
        this.graphics.setVisible(true);
        let splashTween = this.tweens.add({
            targets: this.splashScreen,
            ease: 'sine.inout',
            duration: 500,
            repeat: 0,
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            onComplete: () => {
                let splashTween2 = this.tweens.add({
                    targets: this.splashScreen,
                    ease: 'sine.inout',
                    duration: 500,
                    repeat: 0,
                    delay: 2000,
                    alpha: {
                      getStart: () => 1,
                      getEnd: () => 0
                    },
                    onComplete: () => {
                        this.graphics.setVisible(false);
                        this.splashScreen.setVisible(false);
                        splashTween2?.remove();
                        splashTween2 = null;
                    }
                });
                splashTween?.remove();
                splashTween = null;
            }
        });
    }
    
    setCurrentScene(scene){
        this.currentScene = scene;
    }
}