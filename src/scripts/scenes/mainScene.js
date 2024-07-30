import * as Phaser from 'phaser';
import { Player } from '../components/player.js';
import { VisualEffectsManager } from '../managers/visualEffectsManager.js'
import { BackgroundManager } from '../managers/backgroundManager.js';
import { ObstacleManager } from '../managers/obstacleManager.js';
import { PowerUpsManager } from '../managers/powerUpsManager.js';
import { GameplayUI } from '../components/gameplayUI.js';
import { config } from '../../config.js';
const { pchujoyPublicFilesPath } = config; 

export class MainScene extends Phaser.Scene{
    constructor()
    {
        super({
            key: `MainScene`,
        });
    }

    init(data){
        this.data = data[0]
        this.tutorial = data[1];
    }

    preload(){
        this.load.image(`square`, `${pchujoyPublicFilesPath}/images/square.png`);
        this.load.image(`background`, `${pchujoyPublicFilesPath}/images/background.png`);
        this.load.atlas(`bg`, `${pchujoyPublicFilesPath}/images/bg.png`, `${pchujoyPublicFilesPath}/images/bg.json`);
        this.load.image(`pista`, `${pchujoyPublicFilesPath}/images/pantalla-de-juego-pista.png`);
        this.load.image(`extra`, `${pchujoyPublicFilesPath}/images/pista-extras.png`);
        this.load.image(`tapScreen`, `${pchujoyPublicFilesPath}/images/tapScreen.png`);
        
        this.load.atlas(`clouds`, `${pchujoyPublicFilesPath}/images/clouds.png`, `${pchujoyPublicFilesPath}/images/clouds.json`);
        this.load.atlas(`inputs`, `${pchujoyPublicFilesPath}/images/inputs.png`, `${pchujoyPublicFilesPath}/images/inputs.json`);
        this.load.atlas(`UIgame`, `${pchujoyPublicFilesPath}/images/UIgame.png`, `${pchujoyPublicFilesPath}/images/UIgame.json`);
        this.load.atlas(`people`, `${pchujoyPublicFilesPath}/images/people.png`, `${pchujoyPublicFilesPath}/images/people.json`);
        this.load.atlas(`textos`, `${pchujoyPublicFilesPath}/images/text.png`, `${pchujoyPublicFilesPath}/images/text.json`);
        //powerups
        this.load.image(`corazon`, `${pchujoyPublicFilesPath}/images/power-up-corazon.png`);
        this.load.image(`zapatilla`, `${pchujoyPublicFilesPath}/images/power-up-zapatilla.png`);
        //player
        this.load.spritesheet(`playerIdle`, `${pchujoyPublicFilesPath}/images/player-idle.png`, {frameWidth: 700, frameHeight: 500});
        this.load.spritesheet(`playerRun`, `${pchujoyPublicFilesPath}/images/player.png`, {frameWidth: 700, frameHeight: 500});
        this.load.spritesheet(`playerStun`, `${pchujoyPublicFilesPath}/images/player-stun.png`, {frameWidth: 700, frameHeight: 500});
        this.load.spritesheet(`playerHit`, `${pchujoyPublicFilesPath}/images/player-hit.png`, {frameWidth: 700, frameHeight: 500});
        this.load.image(`playerJump`, `${pchujoyPublicFilesPath}/images/player-jump.png`);
        this.load.image(`playerReady`, `${pchujoyPublicFilesPath}/images/player-ready.png`);
        this.load.image(`playerSet`, `${pchujoyPublicFilesPath}/images/player-set.png`);
    }

    create(){
        this.gameState = 'init';

        this.gameWidth = this.game.config.width;
        this.gameHeight = this.game.config.height;
        this.isPaused = false;
        this.startRunning = true;
        this.blockStart = true;
        this.clickSpeed = this.data.get('clickSpeed');
        this.lostSpeed = this.data.get('lostSpeed');
        this.lostSpeedAir = this.data.get('lostSpeedAir');
        this.score = 0;
        this.scoreDistance = 0;
        this.scoreThreshold = this.toPixels(this.data.get('scoreThreshold'));
        this.lifes = 2;
        this.milestone = 10000;
     
        //Time
        this.accumulatedTime = 0;
        this.timePerStep = 0.5;
        this.dt = 1      

        //UI Scene
        this.uiScene = this.scene.get('UIScene');
        this.uiScene.setCurrentScene(this);
        this.uiScene.animationsManager.createGameplayObjects(this.gameWidth);
      
        this.panel = this.uiScene.panel;
        this.panel.createInstructionsPanel(this.gameWidth);
        this.panel.createOptionsPanel(this.gameWidth);
        this.panel.createPausePanel(this.gameWidth);
        this.panel.createScorePanel(this.gameWidth);

        this.pauseButton = this.add.image(1010, 73, 'UIgame', 'Pausa_Default.png').setInteractive().setDepth(6.1);
        //this.pauseButton.setScale(.8);
        this.pauseButton.on('pointerdown', () => 
            {
                this.pauseGame();
                //this.uiScene.audioManager.playButtonClick.play();
            });

        //Animations
        this.anims.resumeAll();

        // inputs
        this.tapScreen = this.add.image(0, 0, 'tapScreen').setDepth(6).setInteractive().setOrigin(0)
        
        let keyPause = this.input.keyboard.addKey(`ESC`);
        keyPause.on(`down`, () => { this.pauseGame();})
        let keyPause2 = this.input.keyboard.addKey(`P`);
        keyPause2.on(`down`, () => { this.pauseGame();})

        let playerJump = this.input.keyboard.addKey('up');
        playerJump.on(`down`, () => { 
            if(this.gameState === 'play')this.player.jump();})
        //let keyPause3 = this.input.keyboard.addKey(`R`);
        //keyPause3.on(`down`, () => { this.restartGame();})

        let startText = this.add.text(this.gameWidth/2, this.gameWidth/2, 'Presiona para empezar',{ font: '400 60px Bungee', color: '#F5B05F' }).setOrigin(.5).setDepth(8).setStroke('#503530', 10);
        this.startButton = this.add.image(0,0,'square').setDisplaySize(this.gameWidth, this.gameHeight).setOrigin(0).setAlpha(.01).setDepth(6.1);
        this.startButton.setInteractive().on('pointerup', () => {
            startText.setVisible(false);
            this.startAnimation();
            this.startButton.destroy();
            this.startButton = null;
        });
        // Player
        this.player = new Player(this, 300, 700); // Coloca al jugador en el centro de la pantalla

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
        this.ground = this.add.rectangle(500, 850, 1500, 40, 0x00ff00);
        this.physics.add.existing(this.ground, true);
        
        // Colisiones entre el jugador y el suelo
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.obstacleManager.obstaclesGroup, this.ground);

        //Player Input
        if (this.data.get('IS_TOUCH')) {
           
           
            this.jumpButton = this.add.image(800, 400, 'inputs', 'tapatlon_jump.png').setDepth(6.2).setInteractive().setOrigin(0)
            this.jumpButton.on('pointerdown', function (pointer) {
                if (this.gameState == 'play' && this.player.isGrounded) {
                    this.player.jump()
                }

            }, this);

            this.tapScreen.on('pointerdown', function (pointer) {  
                // Verificar si estamos en estado 'play' y el jugador está en el suelo
                if (this.gameState == 'play' && this.player.isGrounded) {
                    // Incrementar la barra de progreso utilizando la función calculateIncrement
                    this.gameplayUI.hideMobileUI()
                    this.gameplayUI.progressBar.value += this.calculateIncrement(this.gameplayUI.progressBar.value, this.clickSpeed);
                }
                
            }, this);
        } else {
            // Manejador para el click en pantalla
            this.tapScreen.on('pointerdown', function (pointer) {
                // Verificar si estamos en estado 'play' y el jugador está en el suelo
                if (this.gameState == 'play' && this.player.isGrounded) {
                    // Incrementar la barra de progreso utilizando la función calculateIncrement
                    this.gameplayUI.progressBar.value += this.calculateIncrement(this.gameplayUI.progressBar.value, this.clickSpeed);
                }
            }, this);

            // Manejador para la tecla espacio
            this.input.keyboard.on('keyup-SPACE', function (event) {
                // Verificar si estamos en estado 'play' y el jugador está en el suelo
                if (this.gameState == 'play' && this.player.isGrounded) {
                    // Incrementar la barra de progreso utilizando la función calculateIncrement
                    this.gameplayUI.progressBar.value += this.calculateIncrement(this.gameplayUI.progressBar.value, this.clickSpeed);
                }
            }, this);
        }
    }

    getTypePointer(pointer) {
        if (pointer.pointerType === 'touch') {
            return pointer.touches[0].worldX;
        } else {
            return pointer.worldX
        }
    }

    update(totalTime, deltaTime) {
        this.dt = deltaTime
        switch(this.gameState) {
            case `init`:
                this.gameState = 'restart';
                break;
            case `restart`:
                if (this.startRunning && this.tutorial) {
                    this.tutorial = true;
                    this.startRunning = false;
                    this.startCounter = 3;
                    this.isPaused = true;
                    this.pauseTimeEvents();
                    this.startTutorial();
                }
                else if (!this.blockStart) {
                    this.startTime = this.time.now * 0.001;
                    this.uiScene.audioManager.playMusic();
                    this.isPaused = false;
                    this.gameState = 'play';
                    this.game.config.metadata.onGameStart({state:`game_start`, name:`tapatlon`});
                }
                break;
            case `play`:
                if (!this.isPaused) {      
                    let dt = Math.min(1, deltaTime/1000);
                    this.gameplayUI.updateThumb();
                    this.backgroundManager.update(dt);
                    this.obstacleManager.update(dt);
                    this.powerUpManager.update(dt);
                    this.player.changeAnimation();
                    this.PlayRunningSound(deltaTime)
                    this.UpdateSpeed()
                    this.UpdateBar(dt)
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

    PlayRunningSound(deltaTime){
         // Incrementar el tiempo acumulado
         this.accumulatedTime += deltaTime / 1000; // Convierte delta a segundos
        
         // Comprobar si ha pasado suficiente tiempo para un paso
         if(this.player.playerRunAnimation == 'run'){
            if (this.accumulatedTime >= this.timePerStep && this.player.isGrounded) {
                // Reproducir un sonido "trote" aleatorio
                this.uiScene.audioManager.playRandomTroteSound();
                
                // Restablecer el tiempo acumulado
                this.accumulatedTime -= this.timePerStep;
            }
         }
         else{
            if (this.accumulatedTime >=.3 && this.player.isGrounded) {
                // Reproducir un sonido "trote" aleatorio
                this.uiScene.audioManager.tambaleo.play()
                
                // Restablecer el tiempo acumulado
                this.accumulatedTime -=.3
            }
            
         }
         
    }

    calculateIncrement(value, baseSpeed) {
        this.gameplayUI.handlePointerDown()
        if(this.player.isStun || this.isPaused)return 0
        let aument = ((baseSpeed / (value * 5)))/1000
        console.log("AUMENTO " + aument)
        return aument;
    }

    mapSpeedToRange(speed) {
        const minSpeed = 0;
        const maxSpeed = 1030;
        const minRange = 0.1;
        const maxRange = 0.6;
        
        console.log('SPEED '+ speed)
        // Calcular la proporción
        let proportion = (speed - minSpeed) / (maxSpeed - minSpeed);
        
        // Invertir la proporción
        proportion = 1 - proportion;
        
        // Mapear la proporción al rango
        return minRange + proportion * (maxRange - minRange);
    }
    
    UpdateSpeed(dt){
        console.log(this.obstacleManager.horizontalSpeed)
        this.player.UpdateFrameRate(this.gameplayUI.progressBar.value)
        this.timePerStep = this.mapSpeedToRange(this.obstacleManager.horizontalSpeed)
        this.obstacleManager.horizontalSpeed = (this.gameplayUI.progressBar.value * this.obstacleManager.maxSpeed)
        this.backgroundManager.horizontalSpeed = this.obstacleManager.horizontalSpeed * .7;
        this.powerUpManager.horizontalSpeed = this.obstacleManager.horizontalSpeed;
    }

    UpdateBar(dt){
        console.log("DELTA TIME " + dt)
        if(this.player.isGrounded)this.gameplayUI.progressBar.value -= (this.lostSpeed * (dt/1000)); 
        else this.gameplayUI.progressBar.value -= (this.lostSpeedAir * (dt/1000)); 

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
            if(this.score > this.milestone){
                this.visualEffectsManager.CreateMilestone(this.milestone.toString())
                this.milestone += 10000
                this.uiScene.audioManager.milestone.play()

            }
        }
    }

    startLoseTimer(){
        // Si ya estamos rastreando la colisión, no hacer nada
        if (this.loseTimer !== null) return;
        this.player.playerRunTexture = 'playerStun'
        this.player.playerRunAnimation = 'stun'
        // Si no estamos rastreando la colisión, iniciar el temporizador
        this.loseTimer = this.time.addEvent({
            delay: 1500, // Duración del temporizador en milisegundos (5 segundos)
            callback: () => {
                this.gameState = 'game_over';
            },
            callbackScope: this
        });
    }

    stopLoseTimer() {
        this.player.playerRunTexture = 'playerRun'
        this.player.playerRunAnimation = 'run'
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
                this.uiScene.audioManager.pauseMusic();
                this.panel.showPause();
            }
            else{ 
                this.anims.resumeAll();
                this.panel.hidePause();
            }
        }
    }

    pauseTimeEvents(){
        if (this.loseTimer != null) this.loseTimer.paused = this.isPaused;
    }
    
    restartGame(){
        this.uiScene.audioManager.ui_reload.play()
        this.uiScene.audioManager.stopMusic();
        this.scene.restart([this.data, false]);
    }
    encrypt(data) {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(process.env.GAME_PUBLIC_KEY);

        return encrypt.encrypt(data);
    }

    finishGame() {
        this.isPaused = true
        this.anims.pauseAll();

        const newScore = this.score;
        const highScore = parseInt(this.data.get(`highScore`));
        const gameplayTime = this.finishTime - this.startTime;

        if(newScore >= highScore) this.data.set(`highScore`, newScore);

        const payload = {
            score: newScore,
            game_id: this.data.get(`gameId`),
            season_id: this.data.get(`seasonId`)
        }
        let encryptedObject = this.encrypt(JSON.stringify(payload));

        setTimeout(() =>{
            this.panel.showScore(newScore, newScore, gameplayTime);
            this.game.config.metadata.onGameEnd(encryptedObject);
        }, 2000);
    }

    startTutorial(){        
        this.blockStart = true;
        this.panel.showInstructions(() => {
            this.isPaused = false;
            this.pauseTimeEvents();
        });
    }
    
    startAnimation() {
        this.blockStart = true;
        let countText = this.add.text(this.gameWidth/2, this.gameHeight/2, '3', { font: '400 400px Bungee', color: '#F5B05F' }).setStroke('#503530', 20);
        countText.setOrigin(.5).setDepth(10);

        this.regressiveCount(countText);
    }

    regressiveCount(countText) {
        this.uiScene.audioManager.cd_3.play()
        setTimeout(() => {
            this.startCounter -= 1;
            if(this.startCounter == 3)
            if(this.startCounter == 2){
                this.player.setImage('playerSet')
                this.uiScene.audioManager.cd_2.play()
            }
            if(this.startCounter == 1){
                this.player.setImage('playerReady')
                this.uiScene.audioManager.cd_1.play()
            }
            countText.setText(this.startCounter);
            if (this.startCounter > 0){
                
                this.regressiveCount(countText);
                
            }
            else {
                this.uiScene.audioManager.gunshot.play()
                countText.setVisible(false);
                this.blockStart = false;
                this.gameStarting()
            }
        }, 1000)
    }

    gameStarting(){
        //cosas al iniciar el juego
    }

    backMenu(){
        this.uiScene.audioManager.ui_exit.play()
        this.uiScene.audioManager.stopMusic();
        this.scene.start(`MenuScene`, this.data);
        //this.scene.get(`MenuScene`).events.once(`create`, () => {
            //this.uiScene.audioManager.resumeMusic();
        //});
    }
}   