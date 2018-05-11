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
/**
 *
 * 岩浆
 */
var Lava = /** @class */ (function (_super) {
    __extends(Lava, _super);
    function Lava(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, "images") || this;
        // scale up!
        _this.smoothed = false;
        _this.scale.x = _this.scale.y = game.rnd.realInRange(2, 4);
        // center rotations
        _this.anchor.setTo(0.5, 0.5);
        _this.game.physics.arcade.enableBody(_this);
        _this.body.setSize(25, 25, 0, 0);
        _this.body.rotation = game.rnd.realInRange(-180, 180);
        _this.animations.add('lava', [37, 38, 39], 1, true);
        _this.animations.play('lava');
        // automatically kill after 15 seconds
        _this.lifespan = 15000;
        return _this;
    }
    return Lava;
}(Phaser.Sprite));
//# sourceMappingURL=Lava.js.map