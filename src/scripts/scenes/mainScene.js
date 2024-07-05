import * as Phaser from 'phaser';
import { Player } from '../components/player.js';
import { VisualEffectsManager } from '../managers/visualEffectsManager.js'
import { BackgroundManager } from '../managers/backgroundManager.js';
import { ObstacleManager } from '../managers/obstacleManager.js';
import { PowerUpsManager } from '../managers/powerUpsManager.js';
import { GameplayUI } from '../components/gameplayUI.js';

export class MainScene extends Phaser.Scene{
    constructor()
    {
        super({
            key: `MainScene`,
        });
    }

    preload(){
        this.load.image('square', './src/images/square.png');
        this.load.image('background', './src/images/background.png');
        this.load.atlas('bg', './src/images/bg.png', './src/images/bg.json');
        this.load.spritesheet('playerRun', './src/images/player.png', {frameWidth: 205, frameHeight: 205});
        this.load.image('playerJump', './src/images/playerJump.png');
    }
    create(){
        this.gameState = 'init';

        this.gameWidth = this.game.config.width;
        this.gameHeight = this.game.config.height;
        this.isPaused = false;
        this.startRunning = true;
        this.clickSpeed = this.data.get('clickSpeed');
        this.lostSpeed = this.data.get('lostSpeed');
        this.score = 0;
        this.scoreDistance = 0;
        this.scoreThreshold = this.toPixels(this.data.get('scoreThreshold'));
        this.lifes = 2;

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

        // inputs
        let keyPause = this.input.keyboard.addKey(`ESC`);
        keyPause.on(`down`, () => { this.pauseGame();})
        let keyPause2 = this.input.keyboard.addKey(`P`);
        keyPause2.on(`down`, () => { this.pauseGame();})

        let playerJump = this.input.keyboard.addKey('SPACE');
        playerJump.on(`down`, () => { 
            if(this.gameState === 'play')this.player.jump();})
        //let keyPause3 = this.input.keyboard.addKey(`R`);
        //keyPause3.on(`down`, () => { this.restartGame();})

        let startText = this.add.text(this.gameWidth/2, this.gameWidth/2, 'Presiona para empezar', { fontFamily: 'Montserrat', fontSize : 80, color: '#000000' }).setOrigin(.5).setDepth(8);
        this.startButton = this.add.image(0,0,'square').setDisplaySize(this.gameWidth, this.gameHeight).setOrigin(0).setAlpha(.01);
        this.startButton.setInteractive().on('pointerup', () => {
            startText.setVisible(false);
            this.startAnimation();
            this.startButton.destroy();
            this.startButton = null;
        });
        // Player
        this.player = new Player(this, 400, 800); // Coloca al jugador en el centro de la pantalla

        //Instances
        this.visualEffectsManager = new VisualEffectsManager(this);
        this.visualEffectsManager.init();

        this.backgroundManager = new BackgroundManager(this, this.gameWidth);
        this.backgroundManager.create();

        this.obstacleManager = new ObstacleManager(this, this.gameWidth);
        this.obstacleManager.create();

        this.powerUpManager = new PowerUpsManager(this, this.gameWidth);
        this.powerUpManager.create();

        this.gameplayUI = new GameplayUI(this, this.gameWidth);
        this.gameplayUI.create();

        // Ground
        this.ground = this.add.rectangle(500, 980, 1500, 40, 0x00ff00);
        this.physics.add.existing(this.ground, true);
        
        // Colisiones entre el jugador y el suelo
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.obstacleManager.obstaclesGroup, this.ground);

        //Player Input
        if (this.data.get('IS_TOUCH')) {
            this.input.on('pointerdown', function (pointer) {
                if (this.gameState == 'play') {
                    let pointerX = this.getTypePointer(pointer);
                    if (pointerX > this.cameras.main.width / 2) {
                        this.player.jump();
                    }
                    else {
                        if(this.player.isGrounded)this.gameplayUI.progressBar.value += this.calculateIncrement(this.gameplayUI.progressBar.value, this.clickSpeed);
                    }
                }
            }, this);
        } else {
            this.input.on('pointerdown', function (pointer) {
                if (this.gameState == 'play'&&this.player.isGrounded) this.gameplayUI.progressBar.value += this.calculateIncrement(this.gameplayUI.progressBar.value, this.clickSpeed);
            }, this);
        }
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
                if (this.startRunning && !this.tutorialActive) {
                    this.tutorialActive = true;
                    this.startRunning = false;
                    this.startCounter = 3;
                    this.isPaused = true;
                    this.pauseTimeEvents();
                
                    if (this.tutorial)
                        this.startTutorial();
                }
                else if (!this.tutorialActive) {
                    this.startTime = this.time.now * 0.001;
                    //this.uiScene.audioManager.playMusic();
                    this.isPaused = false;
                    this.gameState = 'play';
                    this.game.config.metadata.onGameStart({state:`game_start`, name:`olimpiadas`});
                }
                break;
            case `play`:
                if (!this.isPaused) {      
                    let dt = Math.min(1, deltaTime/1000);
                    this.backgroundManager.update(dt);
                    this.obstacleManager.update(dt);
                    this.powerUpManager.update(dt);
                    this.player.changeAnimation();
                    this.UpdateSpeed()
                    this.UpdateBar()
                    this.updateScore(dt);
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

    calculateIncrement(value, baseSpeed) {
        return baseSpeed / (value * 5);
    }
    
    UpdateSpeed(dt){
        this.player.UpdateFrameRate(this.gameplayUI.progressBar.value)
        this.obstacleManager.horizontalSpeed = (this.gameplayUI.progressBar.value * this.obstacleManager.maxSpeed)
        this.backgroundManager.horizontalSpeed = this.obstacleManager.horizontalSpeed * .7;
        this.powerUpManager.horizontalSpeed = this.obstacleManager.horizontalSpeed;
    }

    UpdateBar(){
        this.gameplayUI.progressBar.value -= this.lostSpeed; 

        if (this.gameplayUI.progressBar.value < 0.001) {
            this.gameplayUI.progressBar.value = 0.001;
        }
    }

    updateScore(dt){
        this.scoreDistance += this.obstacleManager.horizontalSpeed * dt;

        if (this.scoreDistance >= this.scoreThreshold) {
            this.scoreDistance = 0;
            this.score += Math.floor(this.gameplayUI.progressBar.value * 100);
            this.gameplayUI.updateScore(this.score);
        }
    }

    startLoseTimer(){
        // Si ya estamos rastreando la colisión, no hacer nada
        if (this.loseTimer !== null) return;
    
        // Si no estamos rastreando la colisión, iniciar el temporizador
        this.loseTimer = this.time.addEvent({
            delay: 3000, // Duración del temporizador en milisegundos (5 segundos)
            callback: () => {
                this.gameState = 'game_over';
            },
            callbackScope: this
        });
    }

    stopLoseTimer() {
        this.loseTimer?.remove();
        this.loseTimer = null;
    }

    toMeters(n) {
        return n / 108;
    }
    
    toPixels(n) {
        return n * 108;
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
            let loseText = this.add.text(this.gameWidth/2, this.gameWidth/2, 'RESTART', { fontFamily: 'Montserrat', fontSize : 80, color: '#000000' }).setOrigin(.5).setDepth(8);
            loseText.setInteractive().on('pointerup', () => {
                this.restartGame();
            });
            /*
            this.uiScene.animationsManager.finishAnimation(() => {
                this.panel.showScore(newScore, newScore, gameplayTime);
                this.game.config.metadata.onGameEnd({state:`game_end`, name:`turbo_delivery`, score:newScore, time:gameplayTime});
            });
            */
        }, 2000);
    }

    startTutorial(){
        //this.tutorialActive = false;
        /*
        this.tutorialActive = true;
        this.panel.showInstructions(() => {
            this.tutorialActive = false; 
            this.isPaused = false;
            this.pauseTimeEvents();
        });
        */
    }
    
    startAnimation() {
        this.tutorialActive = true;
        let countText = this.add.text(this.gameWidth/2, this.gameHeight/2, '3', { fontFamily: 'Montserrat', fontSize : 400, color: '#000000' });
        countText.setOrigin(.5).setDepth(10);

        this.regressiveCount(countText);
    }

    regressiveCount(countText) {
        setTimeout(() => {
            this.startCounter -= 1;
            countText.setText(this.startCounter);
            if (this.startCounter > 0)
                this.regressiveCount(countText);
            else {
                countText.setVisible(false);
                this.tutorialActive = false;
                this.gameStarting()
            }
        }, 1000)
    }

    gameStarting(){
        //cosas al iniciar el juego
    }

    backMenu(){
        //this.uiScene.audioManager.stopMusic();
        this.scene.start(`MenuScene`, this.data);
    }
}   