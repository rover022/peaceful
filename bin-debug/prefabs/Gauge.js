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
 * 测量仪
 */
var Gauge = /** @class */ (function (_super) {
    __extends(Gauge, _super);
    function Gauge(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, "images") || this;
        _this.frameName = key;
        // scale up!
        _this.smoothed = false;
        _this.scale.x = _this.scale.y = 2;
        // center rotations
        _this.anchor.setTo(0.5, 0.5);
        game.add.existing(_this);
        _this.needle = game.add.sprite(x, y, 'images');
        _this.needle.frameName = "gauge_needle.png";
        // scale up!
        _this.needle.smoothed = false;
        _this.needle.scale.x = _this.needle.scale.y = 2;
        // center rotations
        _this.needle.anchor.setTo(0.5, 0.5);
        _this.minAngle = -90;
        _this.maxAngle = 90;
        _this.range = _this.maxAngle - _this.minAngle;
        _this.needle.angle = _this.maxAngle;
        _this.fixedToCamera = true;
        _this.needle.fixedToCamera = true;
        return _this;
    }
    Gauge.prototype.update = function () {
        // write your prefab's specific update code here
    };
    ;
    Gauge.prototype.updateNeedle = function (value, min, max) {
        if (min < max) {
            if (value > max) {
                this.needle.angle = this.maxAngle;
            }
            else if (value < min) {
                this.needle.angle = this.minAngle;
            }
            else {
                this.needle.angle = (value - min) / (max - min) * this.range + this.minAngle;
            }
        }
        else {
            if (value > min) {
                this.needle.angle = this.minAngle;
            }
            else if (value < max) {
                this.needle.angle = this.maxAngle;
            }
            else {
                this.needle.angle = (value - min) / (max - min) * this.range + this.minAngle;
            }
        }
    };
    return Gauge;
}(Phaser.Sprite));
//# sourceMappingURL=Gauge.js.map