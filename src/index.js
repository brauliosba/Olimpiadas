import { MainScene } from "./scripts/scenes/mainScene.js";
import { MenuScene } from "./scripts/scenes/menuScene.js";
import { UIScene } from "./scripts/scenes/uiScene.js";
import { BootScene } from "./scripts/scenes/bootScene.js";
import * as Phaser from 'phaser';
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

// -------------------------------------------
// Initializing Phaser Game
// -------------------------------------------
/**
 * Runs the game with the specified options.
 * @param {Object} opts - The options for the game.
 * @param {Function} opts.onGameStart - The callback function to be executed when the game starts.
 * @param {Function} opts.onGameEnd - The callback function to be executed when the game ends.
 */
function run(opts) {
    // Set GA
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-MK9TTZTNT1');

    const metadata = {
        highScore: opts?.highScore || 0,
        sponsor: opts?.sponsor || false,
        seasonId: opts?.seasonId || 0,
        gameId: opts?.gameId || 0,
        onGameStart: (evt) => {
            // Run GA
            gtag("event", "game_started");

            // Run the optional callback
            opts?.onGameStart(evt) || (() => { })()
        },
        onGameEnd: (evt) => {
            // Run GA
            gtag("event", "game_finished");

            // Run the optional callback
            opts?.onGameEnd(evt) || (() => { })();
        },
        onDataSend: opts?.onDataSend || (() => {}),
    };
    const isIOS = /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent) && !window.MSStream;

    const gameOptions = {
        type: isIOS ? Phaser.CANVAS : Phaser.WEBGL,
        parent: 'phaser-div',
        width: 1080,
        height: 1080,

        
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [BootScene, UIScene, MenuScene, MainScene],

        physics: {
            default: 'arcade',
            arcade: {
              gravity: { y: 300 },
              debug: false
            }
          },

        fps: { target: 60 },

        plugins: {
            global: [{
                key: 'rexWebFontLoader',
                plugin: WebFontLoaderPlugin,
                start: true
            }],
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }]
        },

        // Overwrite the default game options with the provided options
        ...opts,
        }

    // gama instance
    const game = new Phaser.Game(gameOptions);
    game.config.metadata = metadata;
}

// Attach the game to the window object
if (typeof window !== 'undefined') {
    if (!window.Tapatlon) {
      window.Tapatlon = {
        run,
      };
    }
}