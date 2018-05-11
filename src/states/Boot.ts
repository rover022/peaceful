class R {
    public static URL: string = "resource/";
    public static P_PAIHAI: string = "my_awesome_leaderboard.";
    static PREVIDEO_AD: string = "433380667096621_433969653704389";
    static PRELOAD_AD: String = "433380667096621_433969653704389";
    public static dian_start: string = "Tap To Start!";
    public static game_name: string = "兔子钻洞";
}

class Boot extends Phaser.State {
    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.mz = {};
    }

    create() {
        this.game.mz.i18n = new i18n({
            game: this.game
        });

        this.state.onStateChange.add(this.handleStateChange, this);

        this.state.start('Loading', true, false, {
            assets: [
                ['pack', 'initial', null, pack],
                ['pack', 'help' + (Phaser.Device.desktop ? 'Desktop' : 'Touch'), null, pack]
            ],
            nextState: ['StartMenu']
        });
    }

    handleStateChange() {
        this.game.mz.i18n.clear();
    }
}


