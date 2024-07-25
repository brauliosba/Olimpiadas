export class Panel
{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;

        this.credits = 
        [['Programación', 'Braulio Baldeón', 'Diego Johnson'],
        ['Arte y animación', 'Edward Torres', 'Lephirea'],
        ['Marketing y diseño UI', 'Karoline Jiménez'],
        ['Música y sonido', 'Gunter Brenner'],
        ['Dirección', 'Jorge García'],
        ['Producción Ejecutiva', 'Phillip Chu Joy']]
    }

    create(dim){
        this.gameWidth = dim;
        let background = this.scene.add.image(dim/2, dim/2, 'fade').setDisplaySize(dim, dim).setInteractive();

        this.panel = this.scene.add.image(dim/2, dim/2, 'panel').setScale(.72);

        this.panelContainer = this.scene.add.container(0, 0, [background, this.panel]);
        this.panelContainer.setDepth(10).setVisible(false);

        this.pauseContainer;
    }

    createPausePanel(dim){
        //let pauseTitleContainer = this.scene.add.image(dim/2, 270, 'panelUI', 'cartel_titulo.png').setScale(.72);

        let pauseTitle = this.scene.add.text(dim/2, 245, 'PAUSA', { font: '400 50px Bungee', color: '#FFFFFF', align: 'center' });
        pauseTitle.setOrigin(0.5);

        let closeImage = this.scene.add.image(dim-120, 250, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.scene.audioManager.resumeMusic();
            this.scene.currentScene.pauseGame();
        });

        let continueButton = this.scene.add.image(dim/2, dim/2-125, 'panelUI', 'pausa_continuar_1.png').setInteractive().setScale(.72);
        continueButton.on('pointerdown', () => {
            continueButton.setTexture('panelUI', 'pausa_continuar_2.png');
        });
        continueButton.on('pointerup', () => {
            continueButton.setTexture('panelUI', 'pausa_continuar_1.png');
            this.scene.audioManager.resumeMusic();
            this.scene.currentScene.pauseGame();
            //this.scene.audioManager.buttonClick.play();
        });

        let optionsButton = this.scene.add.image(dim/2, dim/2, 'panelUI', 'pausa_opciones_1.png').setInteractive().setScale(.72);
        optionsButton.on('pointerdown', () => {
            optionsButton.setTexture('panelUI', 'pausa_opciones_2.png');
        });
        optionsButton.on('pointerup', () => {
            optionsButton.setTexture('panelUI', 'pausa_opciones_1.png');
            //this.scene.audioManager.buttonClick.play();
            this.hidePause();
            this.showOptions();
        });

        let exitButton = this.scene.add.image(dim/2, dim/2+135, 'panelUI', 'pausa_salir_1.png').setInteractive().setScale(.72);
        exitButton.on('pointerdown', () => {
            exitButton.setTexture('panelUI', 'pausa_salir_2.png');
        });
        exitButton.on('pointerup', () => {
            exitButton.setTexture('panelUI', 'pausa_salir_1.png');
            //this.scene.audioManager.buttonExit.play();
            this.hidePause();
            this.scene.currentScene.backMenu();
        });

        this.pauseContainer = this.scene.add.container(0, 0, [pauseTitle, closeImage, continueButton, optionsButton, exitButton]);
        this.pauseContainer.setVisible(false).setDepth(10.1);
    }

    createFirstTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 380, 'COMBINA DOS BOCADITOS IGUALES PARA \nCREAR UNO MÁS GRANDE Y GANAR PUNTOS', { 
            font: '400 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image1 = this.scene.add.image(dim/2-200, 450, 'tutorialUI', 'dish_01.png').setScale(.65);
        let sumText1 = this.scene.add.text(dim/2-100, 450, '+', { 
            font: '400 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        sumText1.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image2 = this.scene.add.image(dim/2, 450, 'tutorialUI', 'dish_01.png').setScale(.65);
        let equalText1 = this.scene.add.text(dim/2+100, 450, '=', { 
            font: '400 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        equalText1.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image3 = this.scene.add.image(dim/2+200, 450, 'tutorialUI', 'dish_02.png').setScale(.65);

        let image4 = this.scene.add.image(dim/2-200, 530, 'tutorialUI', 'dish_02.png').setScale(.65);
        let sumText2 = this.scene.add.text(dim/2-100, 530, '+', { 
            font: '400 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        sumText2.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image5 = this.scene.add.image(dim/2, 530, 'tutorialUI', 'dish_02.png').setScale(.65);
        let equalText2 = this.scene.add.text(dim/2+100, 530, '=', { 
            font: '400 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
            equalText2.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image6 = this.scene.add.image(dim/2+200, 530, 'tutorialUI', 'dish_03.png').setScale(.55);

        let text2 = this.scene.add.text(dim/2, 620, 'EVITA QUE SE LLENE EL ESCENARIO PARA \nNO PERDER Y ROMPER TUS RECORDS', { 
            font: '400 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image7 = this.scene.add.image(dim/2, 705, 'tutorialUI', 'dish_05.png').setScale(.55);
        let image8 = this.scene.add.image(dim/2, 705, 'tutorialUI', 'barra.png').setScale(.55);

        const textContainer1 = this.scene.add.container(0, 0, 
            [text1, image1, sumText1, image2,  equalText1, image3, image4, sumText2, image5, equalText2, image6, text2, image7, image8]).setVisible(false);
        return textContainer1
    }

    createSecondTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 380, 'APROVECHA LOS ITEMS DE APOYO PARA \nEVITAR SER DERROTADO', { 
            font: '400 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image1 = this.scene.add.image(dim/2, 460, 'tutorialUI', 'bomb.png').setScale(.65);
        
        let text2 = this.scene.add.text(dim/2, 530, 'COLOCA EL AJÍ BOMBA Y HAZLE CLICK \nPARA QUE ESTALLE EMPUJANDO TODO \nPERO NO DEJES QUE DOS SE TOQUEN', { 
            font: '400 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image2 = this.scene.add.image(dim/2, 630, 'tutorialUI', 'palillos.png').setScale(.65);
        
        let text3 = this.scene.add.text(dim/2, 710, 'RECIBE LOS PALILLOS Y HAZ CLICK A UNA \nFICHA PROBLEMÁTICA PARA ELIMINARLA', { 
            font: '400 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text3.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);
        
        const textContainer2 = this.scene.add.container(0, 0, [text1, image1, text2, image2, text3]).setVisible(false);
        return textContainer2
    }

    createInstructionsPanel(dim){      
        this.instructionIndex = 0;
        this.instructionTexts = [this.createFirstTutorialPage(dim), this.createSecondTutorialPage(dim)];

        let closeImage = this.scene.add.image(dim-170, 250, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.hideInstructions();
        });

        this.leftArrow = this.scene.add.image(dim/2-75, dim-245, 'panelUI', 'boton_izquierda.png').setInteractive().setScale(.72);
        this.leftArrow.on('pointerdown', () => this.leftArrowClicked());

        this.rightArrow = this.scene.add.image(dim/2+75, dim-245, 'panelUI', 'boton_derecha.png').setInteractive().setScale(.72);
        this.rightArrow.on('pointerdown', () => this.rightArrowClicked());

        this.instructionsContainer = this.scene.add.container(0, 0, 
            [closeImage, this.instructionTexts[0], this.instructionTexts[1], this.leftArrow, this.rightArrow]);
        this.instructionsContainer.setVisible(false).setDepth(10.1);
    }

    createOptionsPanel(dim){
        let optionsTitle = this.scene.add.text(dim/2, 245, 'OPCIONES', { font: '400 55px Bungee', color: '#FFFFFF', align: 'center' });
        optionsTitle.setOrigin(0.5);

        let closeImage = this.scene.add.image(dim-120, 250, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.hideOptions();
        });

        let musicTitle = this.scene.add.text(dim/2-235, dim/2-110, 'Música', { 
            font: '400 45px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);

        let musicThumb = this.scene.add.sprite(0,dim/2-115,'panelUI','slider_thumb.png').setScale(.72);
        let musicVolume = this.scene.data.get('musicVolume');
        let musicSlider;
        musicSlider = this.scene.rexUI.add.slider({
            x: dim/2+140,
            y: dim/2-115,
            width: 440,
            height: 50,
            orientation: 'x',
            value: 0,

            track: this.scene.add.sprite(0,0,'panelUI','slider.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'panelUI','slider_relleno.png')),
            thumb: this.scene.rexUI.add.roundRectangle(0, 0, 40, 50, 0),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                this.scene.audioManager.menuMusic.volume = value;
                this.scene.audioManager.gameplayMusic.volume = value;
                this.scene.data.set('musicVolume', value);
                if(musicSlider != null) musicThumb.x = musicSlider.getElement('thumb').x+5;
            },

        }).layout().setScale(1,.72);
        musicSlider.value = musicVolume;

        let sfxTitle = this.scene.add.text(dim/2-235, dim/2, 'Sonido', { 
            font: '400 45px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        
        let sfxThumb = this.scene.add.sprite(0,dim/2,'panelUI','slider_thumb.png').setScale(.72);
        let sfxVolume = this.scene.data.get('sfxVolume');
        let sfxSlider;
        sfxSlider = this.scene.rexUI.add.slider({
            x: dim/2+140,
            y: dim/2,
            width: 440,
            height: 50,
            orientation: 'x',
            value: 0,

            track: this.scene.add.sprite(0,0,'panelUI','slider.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'panelUI','slider_relleno.png')),
            thumb: this.scene.rexUI.add.roundRectangle(0, 0, 40, 50, 0),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                this.scene.audioManager.updateSFXVolume(value);
                this.scene.data.set('sfxVolume', value);
                if(sfxSlider != null) sfxThumb.x = sfxSlider.getElement('thumb').x+5;
            },

        }).layout().setScale(1,.72);
        sfxSlider.value = sfxVolume;

        if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            musicTitle.setPosition(dim/2-325, dim/2-50);
            musicThumb.setPosition(dim/2+5, dim/2-55);
            musicSlider.setPosition(dim/2+140, dim/2-55);
            sfxTitle.setPosition(dim/2-235, dim/2+50);
            sfxThumb.setPosition(dim/2+5, dim/2+50)
            sfxSlider.setPosition(dim/2+140, dim/2+50);
            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, sfxThumb, musicTitle, musicSlider, musicThumb]);
        } else {
            let fullscreenTitle = this.scene.add.text(dim/2-70, dim/2+100, 'Pantalla completa', { 
                font: '400 45px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
            
            let fullscreenToggleContainer = this.scene.add.image(dim/2+305, dim/2+105, 'panelUI', 'toggle.png').setInteractive();
            fullscreenToggleContainer.on('pointerdown', () => { this.toggle(this.fullscreenToggleBall, dim/2); }).setScale(.72);
    
            this.fullscreenToggleBall = this.scene.add.image(dim/2+325, dim/2+105, 'panelUI', 'toggle_off.png').setScale(.72);
            this.setToggleFullscreen(this.scene.scale.isFullscreen, dim/2);
    
            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, sfxThumb, musicTitle, musicSlider, musicThumb, fullscreenTitle, fullscreenToggleContainer, this.fullscreenToggleBall]);
        }
        
        this.optionsContainer.setVisible(false).setDepth(10.1);
    }

    createCreditsPanel(dim){
        let closeImage = this.scene.add.image(dim-190, 210, 'panelUI', 'cerrar_1.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { closeImage.setTexture('panelUI', 'cerrar_2.png'); });
        closeImage.on('pointerup', () => {
            closeImage.setTexture('panelUI', 'cerrar_1.png');
            this.hideCredits();
        });

        let labels = []
        let previousChildCount = 0;
        for (let i = 0; i < this.credits.length; i++){
            let label, newH, fontSize, containerSize;
            if (i < 3) {
                newH = 330+150*i;
                fontSize = i != 2 ? '23px' : '17px'
                containerSize = i == 0 ? .72 : .8,
                label = this.addCreditsLabel(dim/2-180, newH, i, containerSize, fontSize);
            } else {
                if (i == 3) previousChildCount = 0;
                newH = 330+150*(i-3);
                fontSize = i != 5 ? '23px' : '17px'
                containerSize = i == 3 ? .78 : i == 4 ? .55 : .8,
                label = this.addCreditsLabel(dim/2+150, newH, i, containerSize, fontSize);
            }
            if (previousChildCount < label.list.length - 1) previousChildCount = label.list.length - 1;
            labels.push(label);
        }

        let logo = this.scene.add.image(dim/2-20, dim-305, 'leapLogo').setScale(.15);

        this.creditsContainer = this.scene.add.container(0, 0, [closeImage, logo]);
        for(let i = 0; i < labels.length; i++){ this.creditsContainer.add(labels[i]); }
        this.creditsContainer.setVisible(false).setDepth(10.1);
    }

    addCreditsLabel(x, y, index, containerSize, fontSize){
        let img = this.scene.add.image(x, y, 'panelUI', 'creditos_container.png').setScale(containerSize, .72);
        let title = this.scene.add.text(x, y, this.credits[index][0], {
            font: '400 23px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        title.setFontSize(fontSize);
        
        y+=35
        let names = [];
        for(let i = 1; i < this.credits[index].length; i++){
            let name = this.scene.add.text(x, y+20*i, this.credits[index][i], { 
                font: '400 18px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
            name.setStroke('#2D1935', 9);
            names.push(name);
        }

        let labelContainer = this.scene.add.container(0, 0, [img, title]);
        for(let i = 0; i < names.length; i++){ labelContainer.add(names[i]); }
        labelContainer.setDepth(10);
        return labelContainer
    }

    createScorePanel(dim){
        let scoreTitle = this.scene.add.text(dim/2-10, 230, 'FIN DE PARTIDA', { font: '400 45px Bungee', color: '#FFFFFF', align: 'center' });
        scoreTitle.setOrigin(0.5);

        let scoreImage = this.scene.add.image(dim/2-10, dim/2-120, 'panelUI', 'puntaje.png').setScale(.72);

        this.scoreText = this.scene.add.text(dim/2-10, dim/2-110, '10000000', { font: '400 40px Bungee', color: '#FBEAAF' });
        this.scoreText.setStroke('#2C211F', 5).setOrigin(.5);

        let timeLabel = this.scene.add.text(dim/2-220, dim/2+5, 'Tiempo:', { font: '400 38px Bungee', color: '#FFFFFF' });
        timeLabel.setStroke('#2C211F', 5);

        this.timeText = this.scene.add.text(dim/2+200, dim/2+50, '00:08:25', { font: '400 38px Bungee', color: '#FFFFFF' });
        this.timeText.setStroke('#2C211F', 5).setOrigin(1);
        
        let recordLabel = this.scene.add.text(dim/2-220, dim/2+85, 'Récord:', { font: '400 38px Bungee', color: '#FFFFFF' });
        recordLabel.setStroke('#2C211F', 5);

        this.recordText = this.scene.add.text(dim/2+210, dim/2+130, '10000000', { font: '400 38px Bungee', color: '#FBEAAF' });
        this.recordText.setStroke('#2C211F', 5).setOrigin(1);

        let restartButton = this.scene.add.image(dim/2-175, dim/2+320, 'panelUI', 'reiniciar_1.png').setInteractive();
        restartButton.setScale(.72);
        restartButton.on('pointerdown', () => { restartButton.setTexture('panelUI', 'reiniciar_2.png') });
        restartButton.on('pointerup', () => {
            restartButton.setTexture('panelUI', 'reiniciar_1.png');
            this.hideScore();
            //this.scene.audioManager.buttonPlay.play();
            this.scene.currentScene.restartGame();
        });

        let menuButton = this.scene.add.image(dim/2+230, dim/2+320, 'panelUI', 'salir_1.png').setInteractive();
        menuButton.setScale(.72);
        menuButton.on('pointerdown', () => { menuButton.setTexture('panelUI', 'salir_2.png') });
        menuButton.on('pointerup', () => {
            menuButton.setTexture('panelUI', 'salir_2.png');
            this.hideScore();
            //this.scene.audioManager.buttonExit.play();
            this.scene.currentScene.backMenu();
        });

        this.scoreContainer = this.scene.add.container(0, 0, 
            [scoreTitle, scoreImage, this.scoreText, timeLabel, this.timeText, recordLabel, this.recordText, restartButton, menuButton]);
        this.scoreContainer.setVisible(false).setDepth(10.1);
    }

    addCropResizeMethod = function (gameObject) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    
        return gameObject;
    }

    toggle(target, center){
        let start = center+285
        let end = center+325
        if (target.x != start) {
            start = center+325
            end = center+285
        }
        let toggleTween = this.scene.tweens.add({
            targets: target,
            ease: 'sine.inout',
            duration: 250,
            repeat: 0,
            x: {
              getStart: () => start,
              getEnd: () => end
            },
            onComplete: () => {
                if (start == center+285){
                    target.setTexture('panelUI', 'toggle_on.png');
                    this.scene.scale.startFullscreen();
                } else  {
                    target.setTexture('panelUI', 'toggle_off.png');
                    this.scene.scale.stopFullscreen();
                }
                toggleTween?.remove()
                toggleTween = null;
            }
        });
    }

    setToggleFullscreen(isFullscreen, center){
        if (!(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            if (isFullscreen) this.fullscreenToggleBall.setTexture('panelUI', 'toggle_on.png').setPosition(center+325, this.fullscreenToggleBall.y);
            else this.fullscreenToggleBall.setTexture('panelUI', 'toggle_off.png').setPosition(center+285, this.fullscreenToggleBall.y);
        }
    }

    leftArrowClicked(){
        //this.scene.audioManager.buttonClick.play();
        this.instructionIndex = this.instructionIndex - 1 >= 0 ? this.instructionIndex - 1 : 0;
        this.setInstructionsText();
    }

    rightArrowClicked(){
        //this.scene.audioManager.buttonClick.play();
        if (this.instructionIndex + 1 < this.instructionTexts.length) this.instructionIndex = this.instructionIndex + 1;
        else this.hideInstructions();
        this.setInstructionsText();
    }

    setInstructionsText(){
        for (let i = 0; i < this.instructionTexts.length; i++){
            this.instructionTexts[i].setVisible(false);
        }
        this.leftArrow.setVisible(this.instructionIndex != 0);
        this.rightArrow.setTexture('panelUI', this.instructionIndex != this.instructionTexts.length - 1 ? 'boton_derecha.png' : 'boton_cerrar.png');
        this.instructionTexts[this.instructionIndex].setVisible(true);
        this.intructionsTitle.setText('Tutorial ' + (this.instructionIndex + 1) + '/2');
        this.instructionsShadowTitle.setText('Tutorial ' + (this.instructionIndex + 1) + '/2');
    }

    showInstructions(callback){
        this.panel.setTexture('panelInstructions');
        this.instructionIndex = 0;
        this.setInstructionsText();
        if (callback != null) this.hideInstructions.callback = callback;

        //this.scene.audioManager.pageOpen.play();
        this.instructionsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideInstructions(){
        //this.scene.audioManager.buttonClick.play();
        this.instructionsContainer.setVisible(false);
        this.panelContainer.setVisible(false);
        if (this.hideInstructions.callback) this.hideInstructions.callback();
    }

    showOptions(){
        this.panel.setTexture('panel');
        //this.scene.audioManager.pageOpen.play();
        this.optionsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideOptions(){
        //this.scene.audioManager.buttonClick.play();
        this.optionsContainer.setVisible(false);
        this.panelContainer.setVisible(false);

        if (this.scene.currentScene.scene.key === 'MainScene') this.showPause();
    }

    showCredits(){
        this.panel.setTexture('panelCredits');
        //this.scene.audioManager.pageOpen.play();
        this.creditsContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideCredits(){
        //this.scene.audioManager.buttonClick.play();
        this.creditsContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    showPause(){
        this.panel.setTexture('panel');
        //this.scene.audioManager.pageOpen.play();
        this.pauseContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hidePause(){
        //this.scene.audioManager.buttonClick.play();
        this.pauseContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    showScore(score, newHighScore, gameplayTime){
        this.panel.setTexture('panel').setPosition(this.gameWidth/2-10, this.gameWidth/2-20);
        this.scoreText.setText(score);
        this.recordText.setText(newHighScore);
        this.timeText.setText(this.secondsToString(gameplayTime));
        this.scoreContainer.setVisible(true);
        this.panelContainer.setVisible(true);
    }

    hideScore(){
        this.panel.setTexture('panel').setPosition(this.gameWidth/2, this.gameWidth/2);
        this.scoreContainer.setVisible(false);
        this.panelContainer.setVisible(false);
    }

    secondsToString(seconds) {
        const time = Math.floor(seconds)
        let hour = Math.floor(time / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        let minute = Math.floor((time / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        let second = time % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
    }
}
