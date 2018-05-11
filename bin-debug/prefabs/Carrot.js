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
 * 胡萝卜
 */
var Carrot = /** @class */ (function (_super) {
    __extends(Carrot, _super);
    function Carrot(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, "images") || this;
        _this.frameName = "carrot.png";
        // scale up!
        _this.smoothed = false;
        _this.scale.x = 2;
        _this.scale.y = 2;
        // center rotations
        _this.anchor.setTo(0.5, 0.5);
        _this.game.physics.arcade.enableBody(_this);
        _this.body.setSize(6, 6, 0, 0);
        _this.body.rotation = game.rnd.realInRange(-180, 180);
        // automatically kill after 15 seconds
        _this.lifespan = 15000;
        return _this;
    }
    return Carrot;
}(Phaser.Sprite));
//# sourceMappingURL=Carrot.js.map