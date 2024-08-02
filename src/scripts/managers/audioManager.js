import * as Phaser from 'phaser';
import { config } from '../../config.js';
const { pchujoyPublicFilesPath } = config; 

export class AudioManager
{
    constructor(scene){
        this.scene = scene;
    }

    load(){
        //main Themes
        //this.scene.load.audio(`mainTheme`, [ `./src/audios/menu_loop.ogg`, `./src/audios/menu_loop.m4a` ]);
        //this.scene.load.audio(`gameplayTheme`, [ `${pchujoyPublicFilesPath}/audios/gameplay_loop.ogg`, `${pchujoyPublicFilesPath}/audios/gameplay_loop.m4a` ]);
        this.scene.load.audio(`mainTheme`, [ `${pchujoyPublicFilesPath}/audios/m4a/maintheme.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/maintheme.ogg` ]);
        this.scene.load.audio(`gameplayTheme`, [ `${pchujoyPublicFilesPath}/audios/m4a/gameplay.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/gameplay.ogg` ]);
        //sfx
        this.scene.load.audio(`aterrizaje`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_aterrizaje.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_aterrizaje.ogg` ]);
        this.scene.load.audio(`golpe`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_golpe.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_golpe.ogg` ]);
        this.scene.load.audio(`salto`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_salto.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_salto.ogg` ]);
        

        this.scene.load.audio(`trote_1`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_1.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_1.ogg` ]);
        this.scene.load.audio(`trote_2`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_2.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_2.ogg` ]);
        this.scene.load.audio(`trote_3`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_3.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_3.ogg` ]);
        this.scene.load.audio(`trote_4`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_4.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_4.ogg` ]);
        this.scene.load.audio(`trote_5`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_5.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_5.ogg` ]);
        this.scene.load.audio(`trote_6`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_6.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_6.ogg` ]);
        this.scene.load.audio(`trote_7`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_7.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_7.ogg` ]);
        this.scene.load.audio(`trote_8`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_trote_8.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_trote_8.ogg` ]);

        this.scene.load.audio(`ui_click`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_ui_button_click.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_ui_button_click.ogg` ]);
        this.scene.load.audio(`page_click`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_ui_button_page.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_ui_button_page.ogg` ]);

        this.scene.load.audio(`estadio_u`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_estadio_uhh.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_estadio_uhh.ogg` ]);
        this.scene.load.audio(`corazon`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_powerup_corazon.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_powerup_corazon.ogg` ]);
        this.scene.load.audio(`zapatilla`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_powerup_zapatilla.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_powerup_zapatilla.ogg` ]);

        this.scene.load.audio(`cd_1`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_countdown_1.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_countdown_1.ogg` ]);
        this.scene.load.audio(`cd_2`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_countdown_2.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_countdown_2.ogg` ]);
        this.scene.load.audio(`cd_3`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_countdown_3.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_countdown_3.ogg` ]);

        this.scene.load.audio(`tambaleo`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_tambaleo.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_tambaleo.ogg` ]);

        this.scene.load.audio(`ui_play`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_ui_button_play.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_ui_button_play.ogg` ]);
        this.scene.load.audio(`ui_reload`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_ui_button_reiniciar.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_ui_button_reiniciar.ogg` ]);
        this.scene.load.audio(`ui_exit`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_ui_button_salir.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_ui_button_salir.ogg` ]);

        this.scene.load.audio(`milestone`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_milestone.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_milestone.ogg` ]);
        this.scene.load.audio(`gunshot`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_countdown_gunshot.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_countdown_gunshot.ogg` ]);

        this.scene.load.audio(`estadio_1`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_estadio_1.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_estadio_1.ogg` ]);
        this.scene.load.audio(`estadio_2`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_estadio_2.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_estadio_2.ogg` ]);
        this.scene.load.audio(`estadio_3`, [ `${pchujoyPublicFilesPath}/audios/m4a/sfx_estadio_3.m4a`, `${pchujoyPublicFilesPath}/audios/ogg/sfx_estadio_3.ogg` ]);

        this.scene.load.audio(`alarma_1`, [ `./src/audios/m4a/sfx_alarma_1.m4a`, `./src/audios/ogg/sfx_alarma_1.ogg` ]);
        this.scene.load.audio(`alarma_2`, [ `./src/audios/m4a/sfx_alarma_2.m4a`, `./src/audios/ogg/sfx_alarma_2.ogg` ]);


        
    }

    init(){
        this.scene.sound.pauseOnBlur = false

        //trotes
        this.trotesSfx = [];
        this.estadioSfx = [];
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
            //this.updateSFXVolume(.7)
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

        this.page_click = this.scene.sound.add('page_click', { volume: 0.5, loop: false });
        this.sfx.push(this.page_click);

        this.estadio_u = this.scene.sound.add('estadio_u', { volume: 0.5, loop: false });
        this.sfx.push(this.estadio_u);

        this.corazon = this.scene.sound.add('corazon', { volume: 0.5, loop: false });
        this.sfx.push(this.corazon);

        this.zapatilla = this.scene.sound.add('zapatilla', { volume: 0.5, loop: false });
        this.sfx.push(this.zapatilla);

        this.cd_1 = this.scene.sound.add('cd_1', { volume: 0.5, loop: false });
        this.sfx.push(this.cd_1);

        this.cd_2 = this.scene.sound.add('cd_2', { volume: 0.5, loop: false });
        this.sfx.push(this.cd_2);

        this.cd_3 = this.scene.sound.add('cd_3', { volume: 0.5, loop: false });
        this.sfx.push(this.cd_3);

        this.tambaleo = this.scene.sound.add('tambaleo', { volume: 0.5, loop: false });
        this.sfx.push(this.tambaleo);

        this.ui_play = this.scene.sound.add('ui_play', { volume: 0.5, loop: false });
        this.sfx.push(this.ui_play);

        this.ui_reload = this.scene.sound.add('ui_reload', { volume: 0.5, loop: false });
        this.sfx.push(this.ui_reload);

        this.ui_exit = this.scene.sound.add('ui_exit', { volume: 0.5, loop: false });
        this.sfx.push(this.ui_exit);

        this.milestone = this.scene.sound.add('milestone', { volume: 0.5, loop: false });
        this.sfx.push(this.milestone);

        this.gunshot = this.scene.sound.add('gunshot', { volume: 0.5, loop: false });
        this.sfx.push(this.gunshot);

        this.alarma_1 = this.scene.sound.add('alarma_1', { volume: 0.5, loop: false });
        this.sfx.push(this.alarma_1);

        this.alarma_2 = this.scene.sound.add('alarma_2', { volume: 0.5, loop: false });
        this.sfx.push(this.alarma_2);

        this.estadio_1 = this.scene.sound.add('estadio_1', { volume: 0.5, loop: false });
        this.sfx.push(this.estadio_1);
        this.estadioSfx.push(this.estadio_1)

        this.estadio_2 = this.scene.sound.add('estadio_2', { volume: 0.5, loop: false });
        this.sfx.push(this.estadio_2);
        this.estadioSfx.push(this.estadio_2)

        this.estadio_3 = this.scene.sound.add('estadio_3', { volume: 0.5, loop: false });
        this.sfx.push(this.estadio_3);
        this.estadioSfx.push(this.estadio_3)

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
    playRandomStadioSound(){
        let randomIndex = Phaser.Math.Between(0, this.estadioSfx.length - 1);
        let randomStadioSound = this.estadioSfx[randomIndex];
        
        randomStadioSound.play();
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