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
var Preloade = /** @class */ (function (_super) {
    __extends(Preloade, _super);
    function Preloade() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadbar = null;
        _this.ready = false;
        _this.waiting = false;
        return _this;
    }
    Preloade.prototype.preload = function () {
        this.loadbar = this.add.sprite(60, 0, 'preloader');
        this.loadbar.anchor.setTo(0, 0.5);
        this.loadbar.y = this.game.height / 2;
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.loadbar);
        this.load.atlas('images', R.URL + 'assets/atlas.png', R.URL + 'assets/atlas.json');
        //this.load.audio('atlas', [R.URL + 'assets/atlas.ogg', R.URL + 'assets/atlas.mp3'], true);
    };
    Preloade.prototype.create = function () {
        this.loadbar.cropEnabled = false;
    };
    Preloade.prototype.update = function () {
        if (!!this.ready && !this.waiting) {
            // A time delay is necessary to get the google webfonts to work.
            // This is a known issue with Phaser.
            this.game.time.events.add(1000, function () {
                this.game.state.start('menu');
            }, this);
            this.game.add.tween(this.loadbar).to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            this.waiting = true;
        }
    };
    Preloade.prototype.onLoadComplete = function () {
        this.ready = true;
    };
    return Preloade;
}(Phaser.State));
//# sourceMappingURL=Preload.js.map