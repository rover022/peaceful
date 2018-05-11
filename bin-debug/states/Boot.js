var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var R = /** @class */ (function () {
    function R() {
    }
    R.URL = "resource/";
    R.P_PAIHAI = "my_awesome_leaderboard.";
    R.PREVIDEO_AD = "433380667096621_433969653704389";
    R.PRELOAD_AD = "433380667096621_433969653704389";
    R.dian_start = "Tap To Start!";
    R.game_name = "兔子钻洞";
    return R;
}());
var Boot = /** @class */ (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boot.prototype.preload = function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.align(true, true);
        this.load.image('preloader', R.URL + 'assets/preloader.png');
    };
    ;
    Boot.prototype.create = function () {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    };
    return Boot;
}(Phaser.State));
//# sourceMappingURL=Boot.js.map