import {I18N_GAME_TITLE} from "./Game";

let level1 = {
    id: 'level1',
    worldWidth: 600,
    worldHeight: 600,
    duration: 3 * 60, // s
    winningThreshold: 75,
    cops: {
        count: [
            [60, 0],
            [85, 1],
            [100, 2]
        ],
        speed: {
            value: 50,
            running: 1.7
        },
        fov: {
            distance: 150,
            angle: 100
        }
    },
    press: {
        count: 1,
        speed: {
            value: 50
        },
        fov: {
            distance: 150,
            angle: 100
        },
        duration: 5 // s
    },
    protesters: {
        count: {
            start: 10,
            max: 30,
            add: 8
        },
        speed: {
            value: 60
        },
        mood: 0.3,
        moodUp: 0.001,
        moodDown: 0.0001,
        poster: {
            drop: 0.3,
            alive: 20 // s
        }
    },
    player: {
        speed: {
            value: 100,
            withPoster: 0.6,
            running: 1.5
        },
        radius: 120,
        stamina: 100,
        staminaCooldown: 5, // s
        powerUp: 0.1,
        powerDown: 0.01
    }
};
let level2 = {
    id: 'level2',
    worldWidth: 800,
    worldHeight: 800,
    duration: 4 * 60, // s
    winningThreshold: 75,
    cops: {
        count: [
            [40, 1],
            [50, 2],
            [60, 3],
            [90, 4],
            [100, 5]
        ],
        speed: {
            value: 60,
            running: 1.8
        },
        fov: {
            distance: 150,
            angle: 120
        }
    },
    swat: {
        count: 5,
        speed: {
            value: 200
        },
        frequency: 15000,
        scoreThreshold: 60
    },
    press: {
        count: 5,
        speed: {
            value: 50
        },
        fov: {
            distance: 100,
            angle: 100
        },
        duration: 5
    },
    protesters: {
        count: {
            start: 20,
            max: 60,
            add: 10
        },
        max: 60,
        speed: {
            value: 60
        },
        mood: 0.25,
        moodUp: 0.002,
        moodDown: 0.0001,
        poster: {
            drop: 0.12,
            alive: 20 // s
        }
    },
    player: {
        speed: {
            value: 100,
            withPoster: 0.6,
            running: 1.5
        },
        radius: 120,
        stamina: 200,
        staminaCooldown: 5, // s
        powerUp: 0.1,
        powerDown: 0.01
    }
}
function getFormattedTime(seconds) {
    return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' +
        String(seconds % 60).padStart(2, '0');
}
class StartMenu extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = '#000';
    }

    create() {
        this.game.world.resize(this.game.width, this.game.height);

        this.title = this.game.mz.i18n.createText(
            this.game.width / 2,
            this.game.height / 6,
            I18N_GAME_TITLE,
            {
                fill: '#fff'
            }
        );
        this.title.anchor.set(0.5);

        const menuOffset = this.game.height / 3;
        const menuVerticalSpacing = Math.min(this.game.height / 7, 70);
        this.menu = [
            [I18N_MENU_LEVEL_1, this.handleClickPlay.bind(this, 'level1')],
            [I18N_MENU_LEVEL_2, this.handleClickPlay.bind(this, 'level2')],
            [I18N_MENU_HOW_TO, this.handleClickHelp.bind(this)],
            [I18N_MENU_CONTROLS, this.handleClickControls.bind(this)]
        ].map(([itemTitle, callback], i) => {
            return [
                this.game.mz.i18n.createText(
                    40,
                    i * menuVerticalSpacing + menuOffset,
                    itemTitle,
                    {
                        font: '22px Arial',
                        fill: '#fff'
                    }
                ),
                callback
            ];
        });

        this.langButton = this.game.add.button(
            this.game.world.width - 10,
            0,
            'langButtons',
            this.handleClickLang.bind(this)
        );
        this.langButton.anchor.set(1, 0);

        this.game.input.onDown.add(this.handleClickMenu, this);
    }

    update() {
        this.langButton.frame = this.game.mz.i18n.currentLang === LANG_RU ? 1 : 0;
    }

    handleClickPlay(level) {
        this.state.start('Loading', true, false, {
            assets: [
                ['pack', 'levelCommon', null, pack],
                ['pack', level, null, pack]
            ],
            nextState: [
                'Game', true, false, levels[level]
            ]
        });
    }

    handleClickLang() {
        this.game.mz.i18n.setLang(
            this.game.mz.i18n.currentLang === LANG_RU ? LANG_EN : LANG_RU
        );
    }

    handleClickMenu() {
        this.menu.some(([item, callback]) => {
            if (item.getBounds().contains(this.game.input.x, this.game.input.y)) {
                this.game.input.onDown.remove(this.handleClickMenu, this);
                callback();
                return true;
            }
        });
    }

    handleClickHelp() {
        this.state.start('Help', true, false);
    }

    handleClickControls() {
        this.state.start('Controls', true, false);
    }
}