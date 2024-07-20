import * as Phaser from 'phaser';
export class AudioManager
{
    constructor(scene){
        this.scene = scene;
    }

    load(){
        //main Themes
        //this.scene.load.audio(`mainTheme`, [ `./src/audios/menu_loop.ogg`, `./src/audios/menu_loop.m4a` ]);
        //this.scene.load.audio(`gameplayTheme`, [ `./src/audios/gameplay_loop.ogg`, `./src/audios/gameplay_loop.m4a` ]);
        this.scene.load.audio(`mainTheme`, [ `./src/audios/m4a/mus_Carreras_Title_loop.m4a`, `./src/audios/ogg/mus_Carreras_Title_loop.ogg` ]);
        this.scene.load.audio(`gameplayTheme`, [ `./src/audios/m4a/mus_Carreras_Gameplay_loop.m4a`, `./src/audios/ogg/mus_Carreras_Gameplay_loop.ogg` ]);
        //sfx
        this.scene.load.audio(`aterrizaje`, [ `./src/audios/m4a/sfx_aterrizaje.m4a`, `./src/audios/ogg/sfx_aterrizaje.ogg` ]);
        this.scene.load.audio(`golpe`, [ `./src/audios/m4a/sfx_golpe.m4a`, `./src/audios/ogg/sfx_golpe.ogg` ]);
        this.scene.load.audio(`salto`, [ `./src/audios/m4a/sfx_salto.m4a`, `./src/audios/ogg/sfx_salto.ogg` ]);
        

        this.scene.load.audio(`trote_1`, [ `./src/audios/m4a/sfx_trote_1.m4a`, `./src/audios/ogg/sfx_trote_1.ogg` ]);
        this.scene.load.audio(`trote_2`, [ `./src/audios/m4a/sfx_trote_2.m4a`, `./src/audios/ogg/sfx_trote_2.ogg` ]);
        this.scene.load.audio(`trote_3`, [ `./src/audios/m4a/sfx_trote_3.m4a`, `./src/audios/ogg/sfx_trote_3.ogg` ]);
        this.scene.load.audio(`trote_4`, [ `./src/audios/m4a/sfx_trote_4.m4a`, `./src/audios/ogg/sfx_trote_4.ogg` ]);
        this.scene.load.audio(`trote_5`, [ `./src/audios/m4a/sfx_trote_5.m4a`, `./src/audios/ogg/sfx_trote_5.ogg` ]);
        this.scene.load.audio(`trote_6`, [ `./src/audios/m4a/sfx_trote_6.m4a`, `./src/audios/ogg/sfx_trote_6.ogg` ]);
        this.scene.load.audio(`trote_7`, [ `./src/audios/m4a/sfx_trote_7.m4a`, `./src/audios/ogg/sfx_trote_7.ogg` ]);
        this.scene.load.audio(`trote_8`, [ `./src/audios/m4a/sfx_trote_8.m4a`, `./src/audios/ogg/sfx_trote_8.ogg` ]);

        this.scene.load.audio(`ui_click`, [ `./src/audios/m4a/sfx_ui_button_click.m4a`, `./src/audios/ogg/sfx_ui_button_click.ogg` ]);
        this.scene.load.audio(`page_click`, [ `./src/audios/m4a/sfx_ui_button_page.m4a`, `./src/audios/ogg/sfx_ui_button_page.ogg` ]);
        
    }

    init(){
        this.scene.sound.pauseOnBlur = false

        //trotes
        this.trotesSfx = [];

        //sfx
        this.sfx = [];
        this.driverSfx = [];
        this.addSFX();
        
        
        //menuTheme
        this.menuMusic = this.scene.sound.add(`mainTheme`, {
            volume: .5,
            loop: true
        });  

        //gameplayTheme
        this.gameplayMusic = this.scene.sound.add(`gameplayTheme`, {
            volume: .5,
            loop: true
        });      

        if (!this.scene.sound.locked)
        {
            // already unlocked so play
            this.getCurrentTheme().play();
            
            this.setAudioVolume(this.scene.data.get('musicVolume'));
        }
        else
        {
            // wait for `unlocked` to fire and then play
            this.scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.getCurrentTheme().play();
                
                this.setAudioVolume(this.scene.data.get('musicVolume'));
            })
        }

        this.scene.game.events.on(Phaser.Core.Events.BLUR, () => {
            this.handleLoseFocus();
        })
    
        document.addEventListener(`visibilitychange`, () => {
            if (!document.hidden)
            {
                return
            }
    
            this.handleLoseFocus();
        })
        
    }

    addSFX(){
        /*
        let name = this.scene.sound.add(`name`, {
            volume: .5,
            loop: false
        });
        this.sfx.push(name);
        this.chaufaChopsticks.push(name);
        */

        this.trote_1 = this.scene.sound.add('trote_1', { volume: 0.5, loop: false })
        this.sfx.push(this.trote_1);
        this.trotesSfx.push(this.trote_1);

        this.trote_2 = this.scene.sound.add('trote_2', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_2);
        this.trotesSfx.push(this.trote_2);

        this.trote_3 = this.scene.sound.add('trote_3', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_3);
        this.trotesSfx.push(this.trote_3);

        this.trote_4 = this.scene.sound.add('trote_4', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_4);
        this.trotesSfx.push(this.trote_4);

        this.trote_5 = this.scene.sound.add('trote_5', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_5);
        this.trotesSfx.push(this.trote_5);

        this.trote_6 = this.scene.sound.add('trote_6', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_6);
        this.trotesSfx.push(this.trote_6);

        this.trote_7 = this.scene.sound.add('trote_7', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_7);
        this.trotesSfx.push(this.trote_7); 

        this.trote_8 = this.scene.sound.add('trote_8', { volume: 0.5, loop: false });
        this.sfx.push(this.trote_8);
        this.trotesSfx.push(this.trote_8);

        this.aterrizaje = this.scene.sound.add('aterrizaje', { volume: 0.5, loop: false });
        this.sfx.push(this.aterrizaje);

        this.golpe = this.scene.sound.add('golpe', { volume: 0.5, loop: false });
        this.sfx.push(this.golpe);

        this.salto = this.scene.sound.add('salto', { volume: 0.5, loop: false });
        this.sfx.push(this.salto);

        this.ui_click = this.scene.sound.add('ui_click', { volume: 0.5, loop: false });
        this.sfx.push(this.ui_click);

        this.ui_click = this.scene.sound.add('ui_click', { volume: 0.5, loop: false });
        this.sfx.push(this.ui_click);

    }

    getCurrentTheme(){
        let currentScene;
        if (this.scene.currentScene != null) currentScene = this.scene.currentScene.scene.key;
        else currentScene = 'MenuScene'
        switch(currentScene){
            case `MenuScene`:
                return this.menuMusic;
            case `MainScene`:
                return this.gameplayMusic;
            default:
                break;
        }
    }

    
    handleLoseFocus()
    {
        if (this.scene.currentScene != null) {
            // assuming a Paused scene that has a pause modal
            if (this.scene.currentScene.isPaused)
            {
                return
            }
            // pause music or stop all sounds
            this.pauseMusic();
            this.scene.currentScene.pauseGame();
            this.scene.currentScene.isPaused = true;
        }
    }

    setAudioVolume(value){
        this.menuMusic.volume = value;
        this.gameplayMusic.volume = value;
        this.updateSFXVolume(value);
    }

    playMusic(){
        this.getCurrentTheme().play();
    }

    resumeMusic(){
        if (this.scene.currentScene.isPaused) {
            this.volumeDownTween?.remove();
            this.volumeDownTween = null;

            let audio = this.getCurrentTheme()
            audio.resume();
            let volumeUpTween = this.scene.tweens.add({
                targets: audio,
                ease: 'sine.inout',
                duration: 500,
                repeat: 0,
                volume: {
                    getStart: () => 0,
                    getEnd: () => this.scene.data.get('musicVolume')
                },
                onComplete: () => {
                    volumeUpTween?.remove();
                    volumeUpTween = null;
                }
            });
        }
    }

    playRandomTroteSound() {
        let randomIndex = Phaser.Math.Between(0, this.trotesSfx.length - 1);
        let randomTroteSound = this.trotesSfx[randomIndex];
        randomTroteSound.play();
    }

    pauseMusic(){
        let audio = this.getCurrentTheme();
        this.volumeDownTween = this.scene.tweens.add({
            targets: audio,
            ease: 'sine.inout',
            duration: 500,
            repeat: 0,
            volume: {
                getStart: () => this.scene.data.get('musicVolume'),
                getEnd: () => 0
            },
            onComplete: () => {
                this.volumeDownTween?.remove();
                this.volumeDownTween = null;
                audio.pause();
            }
        });
    }

    stopMusic(){
        this.getCurrentTheme().stop();
    }

    updateSFXVolume(value){
        for(let i = 0; i < this.sfx.length; i++){
            if (this.sfx[i].key != 'scoreMarkSound') this.sfx[i].volume = value;
            else this.sfx[i].volume = value >= 0.05 ? value + .2 : value;
        }
    }
}