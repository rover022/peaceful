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
var GEM_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/**
 * 宝石
 */
var Gem = /** @class */ (function (_super) {
    __extends(Gem, _super);
    function Gem(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, "images") || this;
        // scale up!
        _this.gemValue = _this.game.rnd.integerInRange(0, 9);
        _this.frameName = "gems000" + _this.gemValue + ".png";
        // scale up!
        _this.smoothed = false;
        _this.scale.x = 2;
        _this.scale.y = 2;
        //
        // center rotations
        _this.anchor.setTo(0.5, 0.5);
        _this.game.physics.arcade.enableBody(_this);
        _this.body.setSize(8, 8, 0, 0);
        _this.body.rotation = game.rnd.realInRange(-180, 180);
        // automatically kill after 15 seconds
        _this.lifespan = 15000;
        return _this;
    }
    Gem.prototype.value = function () {
        return GEM_VALUES[this.gemValue];
    };
    return Gem;
}(Phaser.Sprite));
//# sourceMappingURL=Gem.js.map