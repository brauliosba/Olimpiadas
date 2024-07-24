export class Panel
{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;

        this.credits = 
        [['Programación', 'Diego Johnson', 'Braulio Baldeón'],
        ['Arte, interfaz y animación', 'Lephirea', 'Edward'],
        ['Marketing y diseño', 'Karoline Jiménez'],
        ['Música y sonido', 'Gunter Brenner'],
        ['Dirección', 'Jorge García'],
        ['Productor Ejecutivo', 'Phillip Chu Joy']]
    }

    create(dim){
        let background = this.scene.add.image(dim/2, dim/2, 'fade').setDisplaySize(dim, dim).setInteractive();

        this.panel = this.scene.add.image(dim/2, dim/2, 'panel').setScale(.72);

        this.panelContainer = this.scene.add.container(0, 0, [background, this.panel]);
        this.panelContainer.setDepth(10).setVisible(false);

        this.pauseContainer;
    }

    createPausePanel(dim){
        //let pauseTitleContainer = this.scene.add.image(dim/2, 270, 'panelUI', 'cartel_titulo.png').setScale(.72);

        let pauseTitle = this.scene.add.text(dim/2, 255, 'PAUSA', { font: '800 35px Bungee', color: '#FFFFFF', align: 'center' });
        pauseTitle.setOrigin(0.5).setStroke('#142E1C', 10).setShadow(0, 4, '#738B59', 2, true, false);

        let closeImage = this.scene.add.image(dim-170, 250, 'panelUI', 'salir.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => { this.scene.audioManager.resumeMusic(); this.scene.currentScene.pauseGame(); });

        let continueButton = this.scene.add.image(dim/2, dim/2-125, 'panelUI', 'boton_continuar.png').setInteractive().setScale(.72);
        continueButton.on('pointerdown', () => { this.scene.audioManager.resumeMusic(); this.scene.currentScene.pauseGame(); this.scene.audioManager.buttonClick.play();});

        let optionsButton = this.scene.add.image(dim/2, dim/2, 'panelUI', 'boton_opciones.png').setInteractive().setScale(.72);
        optionsButton.on('pointerdown', () => { this.hidePause(); this.showOptions(); /*this.scene.audioManager.buttonClick.play();*/});

        let exitButton = this.scene.add.image(dim/2, dim/2+125, 'panelUI', 'boton_salir.png').setInteractive().setScale(.72);
        exitButton.on('pointerdown', () => { this.hidePause(); /*this.scene.audioManager.buttonExit.play();*/ this.scene.currentScene.backMenu(); });

        this.pauseContainer = this.scene.add.container(0, 0, [pauseTitle, closeImage, continueButton, optionsButton, exitButton]);
        this.pauseContainer.setVisible(false).setDepth(10.1);
    }

    createFirstTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 380, 'COMBINA DOS BOCADITOS IGUALES PARA \nCREAR UNO MÁS GRANDE Y GANAR PUNTOS', { 
            font: '800 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image1 = this.scene.add.image(dim/2-200, 450, 'tutorialUI', 'dish_01.png').setScale(.65);
        let sumText1 = this.scene.add.text(dim/2-100, 450, '+', { 
            font: '800 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        sumText1.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image2 = this.scene.add.image(dim/2, 450, 'tutorialUI', 'dish_01.png').setScale(.65);
        let equalText1 = this.scene.add.text(dim/2+100, 450, '=', { 
            font: '800 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        equalText1.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image3 = this.scene.add.image(dim/2+200, 450, 'tutorialUI', 'dish_02.png').setScale(.65);

        let image4 = this.scene.add.image(dim/2-200, 530, 'tutorialUI', 'dish_02.png').setScale(.65);
        let sumText2 = this.scene.add.text(dim/2-100, 530, '+', { 
            font: '800 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        sumText2.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image5 = this.scene.add.image(dim/2, 530, 'tutorialUI', 'dish_02.png').setScale(.65);
        let equalText2 = this.scene.add.text(dim/2+100, 530, '=', { 
            font: '800 50px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
            equalText2.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
        let image6 = this.scene.add.image(dim/2+200, 530, 'tutorialUI', 'dish_03.png').setScale(.55);

        let text2 = this.scene.add.text(dim/2, 620, 'EVITA QUE SE LLENE EL ESCENARIO PARA \nNO PERDER Y ROMPER TUS RECORDS', { 
            font: '800 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image7 = this.scene.add.image(dim/2, 705, 'tutorialUI', 'dish_05.png').setScale(.55);
        let image8 = this.scene.add.image(dim/2, 705, 'tutorialUI', 'barra.png').setScale(.55);

        const textContainer1 = this.scene.add.container(0, 0, 
            [text1, image1, sumText1, image2,  equalText1, image3, image4, sumText2, image5, equalText2, image6, text2, image7, image8]).setVisible(false);
        return textContainer1
    }

    createSecondTutorialPage(dim){
        let text1 = this.scene.add.text(dim/2, 380, 'APROVECHA LOS ITEMS DE APOYO PARA \nEVITAR SER DERROTADO', { 
            font: '800 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text1.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image1 = this.scene.add.image(dim/2, 460, 'tutorialUI', 'bomb.png').setScale(.65);
        
        let text2 = this.scene.add.text(dim/2, 530, 'COLOCA EL AJÍ BOMBA Y HAZLE CLICK \nPARA QUE ESTALLE EMPUJANDO TODO \nPERO NO DEJES QUE DOS SE TOQUEN', { 
            font: '800 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text2.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);

        let image2 = this.scene.add.image(dim/2, 630, 'tutorialUI', 'palillos.png').setScale(.65);
        
        let text3 = this.scene.add.text(dim/2, 710, 'RECIBE LOS PALILLOS Y HAZ CLICK A UNA \nFICHA PROBLEMÁTICA PARA ELIMINARLA', { 
            font: '800 20px Bungee', color: '#FCF4D9', align: 'center' }).setOrigin(0.5);
        text3.setStroke('#560F0C', 8).setLineSpacing(-5).setShadow(0, 4, '#560F0C', 2, true, false).setWordWrapWidth(this.panel.displayWidth-450);
        
        const textContainer2 = this.scene.add.container(0, 0, [text1, image1, text2, image2, text3]).setVisible(false);
        return textContainer2
    }

    createInstructionsPanel(dim){      
        this.instructionIndex = 0;
        this.instructionTexts = [this.createFirstTutorialPage(dim), this.createSecondTutorialPage(dim)];

        let closeImage = this.scene.add.image(dim-170, 250, 'panelUI', 'salir.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => this.hideInstructions());

        this.leftArrow = this.scene.add.image(dim/2-75, dim-245, 'panelUI', 'boton_izquierda.png').setInteractive().setScale(.72);
        this.leftArrow.on('pointerdown', () => this.leftArrowClicked());

        this.rightArrow = this.scene.add.image(dim/2+75, dim-245, 'panelUI', 'boton_derecha.png').setInteractive().setScale(.72);
        this.rightArrow.on('pointerdown', () => this.rightArrowClicked());

        this.instructionsContainer = this.scene.add.container(0, 0, 
            [closeImage, this.instructionTexts[0], this.instructionTexts[1], this.leftArrow, this.rightArrow]);
        this.instructionsContainer.setVisible(false).setDepth(10.1);
    }

    createOptionsPanel(dim){
        let optionsTitle = this.scene.add.text(dim/2, 255, 'OPCIONES', { font: '800 35px Bungee', color: '#FFFFFF', align: 'center' });
        optionsTitle.setOrigin(0.5).setStroke('#142E1C', 10).setShadow(0, 4, '#738B59', 2, true, false);

        let closeImage = this.scene.add.image(dim-170, 250, 'panelUI', 'salir.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => this.hideOptions());

        let musicTitle = this.scene.add.text(dim/2-205, dim/2-115, 'Música', { 
            font: '800 30px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        musicTitle.setStroke('#560F0C', 10).setShadow(0, 4, '#560F0C', 2, true, false);

        let musicThumb = this.scene.add.sprite(0,dim/2-115,'panelUI','opciones_volumen_deslizable.png').setScale(.72);
        let musicVolume = this.scene.data.get('musicVolume');
        let musicSlider;
        musicSlider = this.scene.rexUI.add.slider({
            x: dim/2+100,
            y: dim/2-115,
            width: 360,
            height: 50,
            orientation: 'x',
            value: 0,

            track: this.scene.add.sprite(0,0,'panelUI','opciones_volumen_contenedor.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'panelUI','opciones_volumen_barra.png')),
            thumb: this.scene.rexUI.add.roundRectangle(0, 0, 40, 50, 0),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                this.scene.audioManager.menuMusic.volume = value;
                this.scene.audioManager.gameplayMusic.volume = value;
                this.scene.data.set('musicVolume', value);
                if(musicSlider != null) musicThumb.x = musicSlider.getElement('thumb').x;
            },

        }).layout().setScale(1,.72);
        musicSlider.value = musicVolume;

        let sfxTitle = this.scene.add.text(dim/2-205, dim/2-25, 'Sonido', { 
            font: '800 30px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        sfxTitle.setStroke('#560F0C', 10).setShadow(0, 4, '#560F0C', 2, true, false);
        
        let sfxThumb = this.scene.add.sprite(0,dim/2-25,'panelUI','opciones_volumen_deslizable.png').setScale(.72);
        let sfxVolume = this.scene.data.get('sfxVolume');
        let sfxSlider;
        sfxSlider = this.scene.rexUI.add.slider({
            x: dim/2+100,
            y: dim/2-25,
            width: 360,
            height: 50,
            orientation: 'x',
            value: 0,

            track: this.scene.add.sprite(0,0,'panelUI','opciones_volumen_contenedor.png'),
            indicator: this.addCropResizeMethod(this.scene.add.sprite(0,0,'panelUI','opciones_volumen_barra.png')),
            thumb: this.scene.rexUI.add.roundRectangle(0, 0, 40, 50, 0),

            input: 'drag'|'click',
            valuechangeCallback: function (value) {
                this.scene.audioManager.updateSFXVolume(value);
                this.scene.data.set('sfxVolume', value);
                if(sfxSlider != null) sfxThumb.x = sfxSlider.getElement('thumb').x;
            },

        }).layout().setScale(1,.72);
        sfxSlider.value = sfxVolume;

        if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            musicTitle.setPosition(dim/2-205, dim/2-55);
            musicThumb.setPosition(dim/2+5, dim/2-55);
            musicSlider.setPosition(dim/2+100, dim/2-55);
            sfxTitle.setPosition(dim/2-205, dim/2+75);
            sfxThumb.setPosition(dim/2+5, dim/2+75)
            sfxSlider.setPosition(dim/2+100, dim/2+75);
            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, sfxThumb, musicTitle, musicSlider, musicThumb]);
        } else {
            let fullscreenTitle = this.scene.add.text(dim/2-80, dim/2+115, 'Pantalla completa', { 
                font: '800 35px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
            fullscreenTitle.setStroke('#560F0C', 13).setShadow(0, 4, '#560F0C', 2, true, false);
            
            let fullscreenToggleContainer = this.scene.add.image(dim/2+185, dim/2+115, 'panelUI', 'opciones_toggle_contenedor.png').setInteractive();
            fullscreenToggleContainer.on('pointerdown', () => { this.toggle(this.fullscreenToggleBall, dim/2); }).setScale(.72);
    
            this.fullscreenToggleBall = this.scene.add.image(dim/2+205, dim/2+115, 'panelUI', 'opciones_toggle_off.png').setScale(.72);
            this.setToggleFullscreen(this.scene.scale.isFullscreen, dim/2);
    
            this.optionsContainer = this.scene.add.container(0, 0, 
                [optionsTitle, closeImage, sfxSlider, sfxTitle, sfxThumb, musicTitle, musicSlider, musicThumb, fullscreenTitle, fullscreenToggleContainer, this.fullscreenToggleBall]);
        }
        
        this.optionsContainer.setVisible(false).setDepth(10.1);
    }

    createCreditsPanel(dim){
        let closeImage = this.scene.add.image(dim-170, 185, 'panelUI', 'salir.png').setInteractive().setScale(.72);
        closeImage.on('pointerdown', () => this.hideCredits());

        let labels = []
        let previousChildCount = 0;
        for (let i = 0; i < this.credits.length; i++){
            let label, newH;
            if (i < 3) {
                newH = 320+170*i;
                label = this.addCreditsLabel(dim/2-150, newH, i);
            } else {
                if (i == 3) previousChildCount = 0;
                newH = 320+170*(i-3);
                label = this.addCreditsLabel(dim/2+150, newH, i);
            }
            if (previousChildCount < label.list.length - 1) previousChildCount = label.list.length - 1;
            labels.push(label);
        }

        let logo = this.scene.add.image(dim/2, dim-270, 'leapLogo').setScale(.15);

        this.creditsContainer = this.scene.add.container(0, 0, [closeImage, logo]);
        for(let i = 0; i < labels.length; i++){ this.creditsContainer.add(labels[i]); }
        this.creditsContainer.setVisible(false).setDepth(10.1);
    }

    addCreditsLabel(x, y, index){
        let title = this.scene.add.text(x, y, this.credits[index][0], { 
            font: '800 25px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
        title.setStroke('#2D1935', 9);
        
        y+=30
        let names = [];
        for(let i = 1; i < this.credits[index].length; i++){
            let name = this.scene.add.text(x, y+30*i, this.credits[index][i], { 
                font: '800 25px Bungee', color: '#FFFFFF', align: 'center' }).setOrigin(0.5);
            name.setStroke('#2D1935', 9);
            names.push(name);
        }

        let labelContainer = this.scene.add.container(0, 0, [title]);
        for(let i = 0; i < names.length; i++){ labelContainer.add(names[i]); }
        labelContainer.setDepth(10);
        return labelContainer
    }

    createScorePanel(dim){
        let scoreTitle = this.scene.add.text(dim/2, 255, 'FIN DE PARTIDA', { font: '800 35px Bungee', color: '#FFFFFF', align: 'center' });
        scoreTitle.setOrigin(0.5).setStroke('#142E1C', 10).setShadow(0, 4, '#738B59', 2, true, false);

        let scoreImage = this.scene.add.image(dim/2, dim/2-60, 'panelUI', 'fin_puntaje.png').setScale(.72);

        this.scoreText = this.scene.add.text(dim/2, dim/2-50, '10000000', { font: '800 45px Bungee', color: '#FFFFFF' });
        this.scoreText.setStroke('#2D1935', 5).setOrigin(.5).setShadow(0, 4, '#560F0C', 2, true, false);

        let timeLabel = this.scene.add.text(dim/2-185, dim/2+35, 'Tiempo:', { font: '800 35px Bungee', color: '#FFFFFF' });
        timeLabel.setStroke('#2D1935', 5).setShadow(0, 4, '#560F0C', 2, true, false);

        this.timeText = this.scene.add.text(dim/2+190, dim/2+85, '00:08:25', { font: '800 35px Bungee', color: '#FFFFFF' });
        this.timeText.setStroke('#2D1935', 5).setOrigin(1).setShadow(0, 4, '#560F0C', 2, true, false);
        
        let recordLabel = this.scene.add.text(dim/2-185, dim/2+90, 'Récord:', { font: '800 35px Bungee', color: '#FFFFFF' });
        recordLabel.setStroke('#2D1935', 5).setShadow(0, 4, '#560F0C', 2, true, false);

        this.recordText = this.scene.add.text(dim/2+190, dim/2+140, '10000000', { font: '800 35px Bungee', color: '#FFFFFF' });
        this.recordText.setStroke('#2D1935', 5).setOrigin(1).setShadow(0, 4, '#560F0C', 2, true, false);

        let restartButton = this.scene.add.image(dim/2-160, dim/2+300, 'panelUI', 'fin_boton_reiniciar.png').setInteractive();
        restartButton.setScale(.72);
        restartButton.on('pointerdown', () => { this.hideScore(); /*this.scene.audioManager.buttonPlay.play();*/ this.scene.currentScene.restartGame(); });

        let menuButton = this.scene.add.image(dim/2+175, dim/2+300, 'panelUI', 'fin_boton_salir.png').setInteractive();
        menuButton.setScale(.72);
        menuButton.on('pointerdown', () => { this.hideScore(); /*this.scene.audioManager.buttonExit.play();*/ this.scene.currentScene.backMenu();});

        this.scoreContainer = this.scene.add.container(0, 0, 
            [shadowTitle, scoreTitle, scoreImage, this.scoreText, timeLabel, this.timeText, recordLabel, this.recordText, restartButton, menuButton]);
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
        let start = center+165
        let end = center+205
        if (target.x != start) {
            start = center+205
            end = center+165
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
                if (start == center+165){
                    target.setTexture('panelUI', 'opciones_toggle_on.png');
                    this.scene.scale.startFullscreen();
                } else  {
                    target.setTexture('panelUI', 'opciones_toggle_off.png');
                    this.scene.scale.stopFullscreen();
                }
                toggleTween?.remove()
                toggleTween = null;
            }
        });
    }

    setToggleFullscreen(isFullscreen, center){
        if (!(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)){
            if (isFullscreen) this.fullscreenToggleBall.setTexture('panelUI', 'opciones_toggle_on.png').setPosition(center+205, this.fullscreenToggleBall.y);
            else this.fullscreenToggleBall.setTexture('panelUI', 'opciones_toggle_off.png').setPosition(center+165, this.fullscreenToggleBall.y);
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
        this.panel.setTexture('panel');
        this.scoreText.setText(score);
        this.recordText.setText(newHighScore);
        this.timeText.setText(this.secondsToString(gameplayTime));
        this.scoreContainer.setVisible(true);
        this.panelContainer.setVisible(true);
        this.panel.setVisible(false);
    }

    hideScore(){
        this.scoreContainer.setVisible(false);
        this.panelContainer.setVisible(false);
        this.panel.setVisible(true);
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
