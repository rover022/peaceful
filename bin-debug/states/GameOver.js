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
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOver.prototype.preload = function () {
    };
    ;
    GameOver.prototype.create = function () {
        var style = { font: '65px 微软雅黑', fill: '#ffffff', align: 'center' };
        this.titleText = this.game.add.text(this.game.world.centerX, 100, '游戏结束!', style);
        this.titleText.anchor.setTo(0.5, 0.5);
        this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', {
            font: '32px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        this.congratsText.anchor.setTo(0.5, 0.5);
        this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', {
            font: '16px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        this.instructionText.anchor.setTo(0.5, 0.5);
    };
    GameOver.prototype.update = function () {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    };
    return GameOver;
}(Phaser.State));
//# sourceMappingURL=GameOver.js.map