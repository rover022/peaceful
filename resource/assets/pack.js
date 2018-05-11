const pack = {
    initial: [
        {
            type: 'spritesheet',
            key: 'langButtons',
            url: require('./langButtons.png'),
            frameWidth: 50,
            frameHeight: 50
        }
    ],
    helpTouch: [
        {
            type: 'spritesheet',
            key: 'helpMove',
            url: require('./helpMoveTouch.png'),
            frameWidth: 100,
            frameHeight: 100
        },
        {
            type: 'spritesheet',
            key: 'helpRun',
            url: require('./helpRunTouch.png'),
            frameWidth: 100,
            frameHeight: 100
        },
        {
            type: 'spritesheet',
            key: 'helpPoster',
            url: require('./posterButton.png'),
            frameWidth: 70,
            frameHeight: 70
        }
    ],
    helpDesktop: [
        {
            type: 'spritesheet',
            key: 'helpMove',
            url: require('./helpMoveDesktop.png'),
            frameWidth: 150,
            frameHeight: 50
        },
        {
            type: 'spritesheet',
            key: 'helpRun',
            url: require('./helpRunDesktop.png'),
            frameWidth: 150,
            frameHeight: 50
        },
        {
            type: 'spritesheet',
            key: 'helpPoster',
            url: require('./helpPosterDesktop.png'),
            frameWidth: 250,
            frameHeight: 50
        }
    ],
    levelCommon: [
        {
            type: 'spritesheet',
            key: 'playButton',
            url: require('./playButton.png'),
            frameWidth: 100,
            frameHeight: 100
        },
        {
            type: 'spritesheet',
            key: 'repeatButton',
            url: require('./repeatButton.png'),
            frameWidth: 100,
            frameHeight: 100
        },
        {
            type: 'spritesheet',
            key: 'soundButtons',
            url: require('./soundButtons.png'),
            frameWidth: 50,
            frameHeight: 50
        },
        {
            type: 'audio',
            key: 'theme',
            urls: require('./audio/theme.mp3')
        },
        {
            type: 'audio',
            key: 'punch01',
            urls: require('./audio/punch01.mp3')
        },
        {
            type: 'audio',
            key: 'punch02',
            urls: require('./audio/punch02.mp3')
        },
        {
            type: 'audio',
            key: 'applause',
            urls: require('./audio/applause.mp3')
        },
        {
            type: 'audio',
            key: 'boo',
            urls: require('./audio/boo.mp3')
        },
        {
            type: 'audio',
            key: 'croud',
            urls: require('./audio/croud.mp3')
        },
        {
            type: 'audio',
            key: 'scream03',
            urls: require('./audio/scream03.mp3')
        },
        {
            type: 'audio',
            key: 'truck',
            urls: require('./audio/truck.mp3')
        },
        {
            type: 'audio',
            key: 'pick',
            urls: require('./audio/pick.mp3')
        }
    ],
    level1: [
        {
            type: 'spritesheet',
            key: 'border',
            url: require('./border.png'),
            frameWidth: 100,
            frameHeight: 50
        },
        {
            type: 'spritesheet',
            key: 'auto',
            url: require('./auto.png'),
            frameWidth: 290,
            frameHeight: 135
        },
        {
            type: 'spritesheet',
            key: 'cop',
            url: require('./cop01.png'),
            frameWidth: 44,
            frameHeight: 49
        },
        {
            type: 'spritesheet',
            key: 'shield',
            url: require('./shield.png'),
            frameWidth: 316,
            frameHeight: 140
        },
        {
            type: 'spritesheet',
            key: 'journalist',
            url: require('./journalist01.png'),
            frameWidth: 32,
            frameHeight: 49
        },
        {
            type: 'spritesheet',
            key: 'player',
            url: require('./player.png'),
            frameWidth: 30,
            frameHeight: 46
        },
        {
            type: 'spritesheet',
            key: 'protester1',
            url: require('./protester01.png'),
            frameWidth: 32,
            frameHeight: 48
        },
        {
            type: 'spritesheet',
            key: 'protester2',
            url: require('./protester02.png'),
            frameWidth: 30,
            frameHeight: 46
        },
        {
            type: 'spritesheet',
            key: 'protester3',
            url: require('./protester03.png'),
            frameWidth: 30,
            frameHeight: 47
        },
        {
            type: 'spritesheet',
            key: 'injury',
            url: require('./injury.png'),
            frameWidth: 30,
            frameHeight: 31
        },
        {
            type: 'spritesheet',
            key: 'poster',
            url: require('./poster.png'),
            frameWidth: 60,
            frameHeight: 71
        },
        {
            type: 'image',
            key: 'ground',
            url: require('./ground01.png'),
            overwrite: false
        }
    ],
    level2: [
        {
            type: 'spritesheet',
            key: 'border',
            url: require('./border.png'),
            frameWidth: 100,
            frameHeight: 50
        },
        {
            type: 'spritesheet',
            key: 'auto',
            url: require('./auto.png'),
            frameWidth: 290,
            frameHeight: 135
        },
        {
            type: 'spritesheet',
            key: 'cop',
            url: require('./cop02.png'),
            frameWidth: 46,
            frameHeight: 54
        },
        {
            type: 'spritesheet',
            key: 'swat',
            url: require('./swat.png'),
            frameWidth: 30,
            frameHeight: 46
        },
        {
            type: 'spritesheet',
            key: 'shield',
            url: require('./shield.png'),
            frameWidth: 316,
            frameHeight: 140
        },
        {
            type: 'spritesheet',
            key: 'journalist',
            url: require('./journalist01.png'),
            frameWidth: 32,
            frameHeight: 49
        },
        {
            type: 'spritesheet',
            key: 'player',
            url: require('./player.png'),
            frameWidth: 30,
            frameHeight: 46
        },
        {
            type: 'spritesheet',
            key: 'protester1',
            url: require('./protester01.png'),
            frameWidth: 32,
            frameHeight: 48
        },
        {
            type: 'spritesheet',
            key: 'protester2',
            url: require('./protester02.png'),
            frameWidth: 30,
            frameHeight: 46
        },
        {
            type: 'spritesheet',
            key: 'protester3',
            url: require('./protester03.png'),
            frameWidth: 30,
            frameHeight: 47
        },
        {
            type: 'spritesheet',
            key: 'injury',
            url: require('./injury.png'),
            frameWidth: 30,
            frameHeight: 31
        },
        {
            type: 'spritesheet',
            key: 'poster',
            url: require('./poster.png'),
            frameWidth: 60,
            frameHeight: 71
        },
        {
            type: 'image',
            key: 'ground',
            url: require('./ground02.png'),
            overwrite: false
        }
    ]
};

export default JSON.stringify(pack);
