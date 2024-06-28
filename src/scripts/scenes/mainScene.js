import * as Phaser from 'phaser';
import { GameplayUI } from '../components/gameplayUI';
import { VisualEffectsManager } from '../managers/visualEffectsManager.js'

export class MainScene extends Phaser.Scene{
    constructor()
    {
        super({
            key: `MainScene`,
        });
    }

    create(){
        this.gameState = 'init';

        this.gameWidth = this.game.config.width;
        this.gameHeight = this.game.config.height;
        this.isPaused = false;
        this.startRunning = true;

        //UI
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);
        this.uiScene.animationsManager.createGameplayObjects(this.gameWidth);
        /*
        this.panel = this.uiScene.panel;
        this.panel.createInstructionsPanel(this.gameWidth);
        this.panel.createOptionsPanel(this.gameWidth);
        this.panel.createPausePanel(this.gameWidth);
        this.panel.createScorePanel(this.gameWidth);
        */

        //Animations
        this.anims.resumeAll();

        //Instances
        this.gameplayUI = new GameplayUI(this, this.gameWidth);
        this.gameplayUI.create();
        this.visualEffectsManager = new VisualEffectsManager(this);
        this.visualEffectsManager.init();

        // inputs
        let keyPause = this.input.keyboard.addKey(`ESC`);
        keyPause.on(`down`, () => { this.pauseGame();})
        let keyPause2 = this.input.keyboard.addKey(`P`);
        keyPause2.on(`down`, () => { this.pauseGame();})
        //let keyPause3 = this.input.keyboard.addKey(`R`);
        //keyPause3.on(`down`, () => { this.restartGame();})
    }

    init(data){
        this.data = data[0]
        this.tutorial = data[1];
    }

    getTypePointer(pointer) {
        if (pointer.pointerType === 'touch') {
            return pointer.touches[0].worldX;
        } else {
            return pointer.worldX
        }
    }

    update(totalTime, deltaTime) {
        switch(this.gameState) {
            case `init`:
                this.gameState = 'restart';
                break;
            case `restart`:
                if (this.startRunning && this.tutorial) {
                    this.tutorial = false;
                    this.isPaused = true;
                    this.pauseTimeEvents();
                    this.startTutorial();
                }
                else if (this.startRunning && !this.tutorialActive) {
                    this.startTime = this.time.now * 0.001;
                    //this.uiScene.audioManager.playMusic();
                    this.gameState = 'play';
                    this.game.config.metadata.onGameStart({state:`game_start`, name:`mi_chaufa`});
                }
                break;
            case `play`:
                if (!this.isPaused){
                    this.gameplayUI.updateScore();
                    //this.printShapeCount();
                }
                break;
            case `game_over`:
                if (!this.isPaused){
                    this.finishTime = this.time.now * 0.001;
                    this.isPaused = true;
                    this.finishGame();
                }
                break;
        }
    }
    
    toMeters(n) {
        return n / 10.8;
    }
    
    toPixels(n) {
        return n * 10.8;
    }

    pauseGame(){
        if (this.gameState == 'play'){
            this.isPaused = !this.isPaused
            this.pauseTimeEvents();
            
            if (this.isPaused){
                this.anims.pauseAll();
                //this.uiScene.audioManager.pauseMusic();
                //this.panel.showPause();
            }
            else{ 
                this.anims.resumeAll();
                //this.panel.hidePause();
            }
        }
    }

    pauseTimeEvents(){
        
    }

    restartGame(){
        //this.uiScene.audioManager.stopMusic();
        this.scene.restart([this.data, false]);
    }

    finishGame() {
        this.isPaused = true
        this.anims.pauseAll();

        const newScore = this.score;
        const highScore = parseInt(this.data.get(`highScore`));
        const gameplayTime = this.finishTime - this.startTime;

        if(newScore >= highScore) this.data.set(`highScore`, newScore);

        setTimeout(() =>{
            this.uiScene.animationsManager.finishAnimation(() => {
                this.panel.showScore(newScore, newScore, gameplayTime);
                this.game.config.metadata.onGameEnd({state:`game_end`, name:`turbo_delivery`, score:newScore, time:gameplayTime});
            });
        }, 2000);
    }

    startTutorial(){
        this.tutorialActive = false;
        /*
        this.tutorialActive = true;
        this.panel.showInstructions(() => {
            this.tutorialActive = false; 
            this.isPaused = false;
            this.pauseTimeEvents();
        });
        */
    }

    backMenu(){
        //this.uiScene.audioManager.stopMusic();
        this.scene.start(`MenuScene`, this.data);
    }
}   