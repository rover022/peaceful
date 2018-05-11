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
 * 土地
 */
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block(game, x, y, leftFace, aboveFace) {
        var _this = _super.call(this, game, x, y, "images") || this;
        _this.leftFace = leftFace;
        _this.topFace = aboveFace;
        _this.rightFace = game.rnd.integerInRange(0, 1);
        _this.bottomFace = game.rnd.integerInRange(0, 1);
        _this.frameName = "tileset_dirt" + "000" + getFrame(_this, _this.leftFace, _this.topFace, _this.rightFace, _this.bottomFace) + ".png";
        // scale up! //
        _this.smoothed = false;
        _this.scale.x = 2;
        _this.scale.y = 2;
        _this.anchor.setTo(0.5, 0.5);
        _this.x += _this.width / 2;
        _this.y += _this.height / 2;
        return _this;
    }
    return Block;
}(Phaser.Sprite));
function getFrame(block, left, top, right, bottom) {
    var type = left * 1000 + top * 100 + right * 10 + bottom;
    var sum = left + top + right + bottom;
    var frameNum = 0;
    if (sum !== 2) {
        frameNum = sum;
        if (type === 1)
            block.angle = 180;
        if (type === 10)
            block.angle = 90;
        if (type === 1000)
            block.angle = 270;
        if (type === 1011)
            block.angle = 90;
        if (type === 1101)
            block.angle = 180;
        if (type === 1110)
            block.angle = 270;
    }
    else {
        if (type === 11) {
            frameNum = 2;
            block.angle = 90;
        }
        else if (type === 110) {
            frameNum = 2;
        }
        else if (type === 101) {
            frameNum = 5;
        }
        else if (type === 1100) {
            frameNum = 2;
            block.angle = 270;
        }
        else if (type === 1010) {
            frameNum = 5;
            block.angle = 90;
        }
        else {
            frameNum = 2;
            block.angle = 180;
        }
    }
    return frameNum;
}
;
//# sourceMappingURL=Block.js.map