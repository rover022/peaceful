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
var TOUGH_WEIGHT = 0.25; // percentage of rocks that are 'tough'
var LARGE_WEIGHT = 0.25; // percentage of rocks that are large
/**
 * 岩石
 */
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock(game, x, y, key, frame) {
        var _this = _super.call(this, game, x, y, "images", 0) || this;
        _this.large = game.rnd.realInRange(0, 1) < LARGE_WEIGHT;
        _this.tough = game.rnd.realInRange(0, 1) < TOUGH_WEIGHT;
        if (_this.large) {
            if (_this.tough) {
                _this.frameName = "rocks_lg0001.png";
            }
            else {
                _this.frameName = "rocks_lg0000.png";
            }
        }
        else {
            if (_this.tough) {
                _this.frameName = "rocks_sm0001.png";
            }
            else {
                _this.frameName = "rocks_sm0000.png";
            }
        }
        // scale up!
        _this.smoothed = false;
        _this.scale.x = _this.scale.y = game.rnd.realInRange(2, 4);
        // center rotations
        _this.anchor.setTo(0.5, 0.5);
        _this.game.physics.arcade.enableBody(_this);
        if (!_this.large) {
            _this.body.setSize(24, 24, -4, -6);
        }
        else {
            _this.body.setSize(48, 48, -4, -6);
        }
        _this.body.rotation = game.rnd.realInRange(-180, 180);
        // automatically kill after 15 seconds
        _this.lifespan = 15000;
        return _this;
    }
    return Rock;
}(Phaser.Sprite));
//# sourceMappingURL=Rock.js.map