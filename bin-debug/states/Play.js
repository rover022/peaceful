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
function chanceRoll(game, chanceAsFloat) {
    return (game.rnd.realInRange(0, 1) < chanceAsFloat);
}
;
var GEM_FREQUENCY = 5; // max per chunk
var GEM_WEIGHT = 0.5; // chance of any one gem spawning, 1 = 100%
var ROCK_FREQUENCY = 4; // max per chunk
var ROCK_WEIGHT = 0.5; // chance of any one rock spawning
var CARROT_FREQUENCY = 1; //max per chunk
var CARROT_WEIGHT = 0.25; // chance of any one carrot spawning
var LAVA_FREQUENCY = 2; // max per chunk
var LAVA_WEIGHT = 0.1; //chance of any one lava spawning
var INCREASE_PER_CHUNK = 1.5; // how much faster to go per chunk
var LIGHT_ROCK_DAMAGE = 0.5; // how much damage a light rock does
var DARK_ROCK_DAMAGE = 1.0; // how much damage a dark rock does
var LAVA_DAMAGE = 2.5; // how much damage lava does, per frame
var Play = /** @class */ (function (_super) {
    __extends(Play, _super);
    function Play() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Play.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#000';
        // initialize game variables
        this.cash = 0;
        this.chunkGroup = this.game.add.group();
        this.nextChunkY = 0;
        this.game.world.bounds.x = 0;
        this.game.world.bounds.height = 1024;
        this.game.camera.setBoundsToWorld();
        this.lastChunkIndex = 0;
        this.tephra = this.game.add.group();
        this.rocks = this.game.add.group();
        this.gems = this.game.add.group();
        this.carrots = this.game.add.group();
        this.lastChunk = null;
        this.chunkIndex = 0;
        this.generateChunk();
        this.generateChunk();
        // create the dirt emitter
        this.dirtEmitter = this.game.add.emitter(32, 64, 500);
        this.dirtEmitter.makeParticles('images', [40, 41, 42, 43], 500, false, false);
        this.dirtEmitter.setYSpeed(-5, 200);
        this.dirtEmitter.setRotation(0, 0);
        this.dirtEmitter.start(false, 500, 25);
        // create the dirt effect
        //庄头上冒出洞火花
        this.drilldirt = this.game.add.sprite(32, 64, 'images');
        this.drilldirt.smoothed = false;
        this.drilldirt.scale.set(2, 2);
        this.drilldirt.anchor.setTo(0.5, -0.1);
        this.drilldirt.animations.add('drill', Phaser.Animation.generateFrameNames('drilldirt', 0, 1, '.png', 4), 16, true);
        this.drilldirt.animations.play('drill');
        // create the tunnel
        this.tunnel = this.game.add.emitter(32, 64, 100);
        this.tunnel.makeParticles('images', 48, 100, false, false);
        this.tunnel.setXSpeed(0, 0);
        this.tunnel.setYSpeed(0, 0);
        this.tunnel.gravity = new Phaser.Point(0, 0);
        this.tunnel.start(false, 2000, 25);
        // create the tunnel border
        this.tunnelborder = this.game.add.emitter(32, 64, 200);
        this.tunnelborder.makeParticles('images', [45, 46, 47], 200, false, false);
        this.tunnelborder.setXSpeed(0, 0);
        this.tunnelborder.setYSpeed(0, 0);
        this.tunnelborder.setRotation(0, 0);
        this.tunnelborder.gravity = new Phaser.Point(0, 0);
        this.tunnelborder.start(false, 2000, 15);
        // death fx
        this.deathfade = this.game.add.bitmapData(this.game.width, this.game.height);
        this.deathfade.context.fillStyle = '#000000';
        this.deathfade.context.fillRect(0, 0, this.game.width, this.game.height);
        this.deathfadesprite = this.game.add.sprite(0, 0, this.deathfade);
        this.deathfadesprite.fixedToCamera = true;
        this.deathfadesprite.alpha = 0;
        this.deathfadesprite.kill();
        this.circle = this.game.add.sprite(0, 0, 'images');
        this.circle.frameName = 'circle.png';
        this.circle.alpha = 0.5;
        this.circle.anchor.setTo(0.5, 0.5);
        this.circle.kill();
        // create the player
        this.bunny = new Bunny(this.game, 0, 0);
        this.bunny.x = this.game.width / 2;
        this.bunny.y = -this.bunny.height;
        this.game.add.existing(this.bunny);
        // pickup effect
        this.getEmitter = this.game.add.emitter();
        this.getEmitter.makeParticles('images', 44);
        this.getEmitter.gravity = new Phaser.Point(0, 0);
        this.getEmitter.setAlpha(0, 1);
        this.getEmitter.setXSpeed(-25, 25);
        this.getEmitter.setYSpeed(-25, 25);
        this.getEmitter.bounce.set(0.5, 0.5);
        // follow the bunny!
        this.game.camera.follow(this.bunny);
        this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 320, 128);
        this.fade = this.game.add.bitmapData(this.game.width, this.game.height);
        this.fade.context.fillStyle = '#000000';
        this.fade.context.fillRect(0, 0, this.game.width, this.game.height);
        this.fadesprite = this.game.add.sprite(0, 0, this.fade);
        this.fadesprite.alpha = 1;
        this.game.add.tween(this.fadesprite).to({ alpha: 0 }, 400, null, true);
        // dead flag
        this.dead = false;
        // almost dead flag
        this.beeping = false;
        // JAMS
        this.sfx = this.game.sound.add('atlas');
        this.sfx.addMarker('coral', 2.083, 267.840, 1, true);
        this.sfx.addMarker('carrot', 0.704, 0.535, 1, false);
        this.sfx.addMarker('gem', 1.252, 0.340, 1, false);
        this.sfx.addMarker('ouch', 1.968, 0.1, 1, false);
        this.sfx.addMarker('beep', 0, 0.15, 1, false);
        this.sfx.addMarker('gameover', 387.365, 67.752, 1, true);
        this.sfx.addMarker('boom', 0.162, 0.535, 1, false);
        this.sfx.play('coral');
        // HUD
        this.heatgauge = new Gauge(this.game, this.game.width - 48, this.game.height - 48, 'gauge.png'); // adds itself to the game
        this.powergauge = new Gauge(this.game, 48, this.game.height - 48, 'gauge_DRILL.png'); // same
        this.depthtext = this.game.add.text(96, this.game.height - 48, '0m', { fill: 'white' });
        // this.depthtext.font = "Press Start 2P";
        this.depthtext.fontSize = 18;
        this.depthtext.fixedToCamera = true;
        this.cashtext = this.game.add.text(96, this.game.height - 24, '$0', { fill: 'white' });
        // this.cashtext.font = "Press Start 2P";
        this.cashtext.fontSize = 18;
        this.cashtext.fixedToCamera = true;
    };
    Play.prototype.update = function () {
        if (!this.dead) {
            // collect gems
            this.game.physics.arcade.overlap(this.bunny, this.gems, this.collectGems, null, this);
            // collect carrots
            this.game.physics.arcade.overlap(this.bunny, this.carrots, this.collectCarrot, null, this);
            // rocks
            this.game.physics.arcade.overlap(this.bunny, this.rocks, this.hitRock, null, this);
            // lava
            this.game.physics.arcade.overlap(this.bunny, this.tephra, this.hitLava, null, this);
            // generate a new chunk if we're about to run out
            if (this.bunny.y > this.chunkGroup.children[this.chunkGroup.children.length - 1].y) {
                this.generateChunk();
            }
            // garbage collect old chunks
            var i = this.chunkGroup.children.length;
            while (i >= 0) {
                if (this.chunkGroup.children[i]) {
                    if (this.chunkGroup.children[i].y < this.game.camera.y - 8 * 64) {
                        this.chunkGroup.remove(this.chunkGroup.children[i], false);
                    }
                }
                i--;
            }
            // update dirt particle position
            this.dirtEmitter.emitX = this.bunny.x;
            this.dirtEmitter.emitY = this.bunny.y + 24;
            // update drill dirt effect position/angle
            this.drilldirt.x = this.bunny.x;
            this.drilldirt.y = this.bunny.y;
            this.drilldirt.angle = this.bunny.angle;
            // update tunnel position/angle
            this.tunnel.emitX = this.bunny.x;
            this.tunnel.emitY = this.bunny.y;
            this.tunnel.setRotation(this.bunny.angle, this.bunny.angle);
            // update the tunnel border
            this.tunnelborder.emitX = this.game.rnd.pick([this.bunny.x - this.bunny.width / 2 + 1,
                this.bunny.x - this.bunny.width / 2 + 2,
                this.bunny.x - this.bunny.width / 2 + 3,
                this.bunny.x + this.bunny.width / 2 - 1,
                this.bunny.x + this.bunny.width / 2 - 2,
                this.bunny.x + this.bunny.width / 2 - 3]);
            this.tunnelborder.emitY = this.bunny.y;
            // update heat
            this.heatgauge.updateNeedle(this.bunny.health, this.bunny.getMaxHealth(), 0);
            // update booost
            this.powergauge.updateNeedle(this.bunny.boost, 0, this.bunny.maxBoost());
            if (this.bunny.health < 30 && !this.beeping) {
                // play beeping sound
                this.sfx.play('beep');
                this.game.time.events.add(160, function () {
                    this.beeping = false;
                }, this);
                this.beeping = true;
            }
            else if (this.beeping && this.bunny.health > 30) {
                this.beeping = false;
            }
            // update text
            this.depthtext.text = this.bunny.y > 0 ? Math.round(this.bunny.y / 10) + "m" : "0m";
            this.cashtext.text = "$" + this.cash;
            //游戏结束逻辑处理
            if (this.bunny.health < 0) {
                this.dead = true;
                this.bunny.playDead();
                this.deathfadesprite.revive();
                this.circle.x = this.bunny.x;
                this.circle.y = this.bunny.y;
                this.circle.revive();
                this.game.add.tween(this.deathfadesprite).to({ alpha: 1 }, 500, null, true);
                this.game.add.tween(this.circle).to({ alpha: 0 }, 500, null, true);
                this.game.add.tween(this.circle.scale).to({ x: 16 }, 250, null, true);
                this.game.add.tween(this.circle.scale).to({ y: 16 }, 500, null, true);
                this.drilldirt.kill();
                this.dirtEmitter.kill();
                this.game.add.tween(this.heatgauge).to({ alpha: 0 }, 500, null, true);
                this.game.add.tween(this.powergauge).to({ alpha: 0 }, 500, null, true);
                this.game.add.tween(this.heatgauge.needle).to({ alpha: 0 }, 500, null, true);
                this.game.add.tween(this.powergauge.needle).to({ alpha: 0 }, 500, null, true);
                this.game.add.tween(this.depthtext).to({ alpha: 0 }, 500, null, true);
                this.game.add.tween(this.cashtext).to({ alpha: 0 }, 500, null, true);
                this.gameover = this.game.add.text(32, 160, 'GAME\nOVER', { fill: 'red' });
                this.gameover.font = "Press Start 2P";
                this.gameover.fontSize = 64;
                this.gameover.fixedToCamera = true;
                this.depthyo = this.game.add.text(32, 286, 'DEPTH ' + this.depthtext.text, { fill: 'white' });
                this.depthyo.font = "Press Start 2P";
                this.depthyo.fontSize = 16;
                this.depthyo.fixedToCamera = true;
                this.cashyo = this.game.add.text(32, 304, 'CASH ' + this.cashtext.text, { fill: 'white' });
                this.cashyo.font = "Press Start 2P";
                this.cashyo.fontSize = 16;
                this.cashyo.fixedToCamera = true;
                this.pressspace = this.game.add.text(8, 340, '[F5] 重新开始\n\n' +
                    '返回主菜单!\n' +
                    // 'A GAME BY DREAM\n' +
                    // 'SHOW ADVENTURES\n' +
                    '兔子游戏制作\n' +
                    '代码: rover022\n' +
                    '设计: rover022', { fill: 'white' });
                this.pressspace.font = "Press Start 2P";
                this.pressspace.fontSize = 16;
                this.pressspace.fixedToCamera = true;
                this.sfx.volume = 0;
                this.game.sound.remove(this.sfx);
                this.dfx = this.game.sound.add('atlas');
                this.dfx.volume = 1;
                this.dfx.addMarker('boom', 0.162, 0.535, 1, true);
                this.dfx.addMarker('gameover', 387.365, 67.752, 1, true);
                this.dfx.play('boom');
                this.game.time.events.add(545, function () {
                    this.dfx.play('gameover');
                }, this);
            }
        }
    };
    Play.prototype.generateChunk = function () {
        var newChunk = this.chunkGroup.add(this.game.add.group());
        newChunk.y = this.nextChunkY;
        var xPos = 0;
        var yPos = 0;
        var aboveFace = 0;
        var leftFace = 0;
        var i = 0;
        for (i = 0; i < 5 * 8; i++) {
            if (i !== 0 && i % 5 !== 0) {
                leftFace = newChunk.children[i - 1].rightFace;
            }
            else {
                leftFace = this.game.rnd.integerInRange(0, 1);
            }
            if (i > 4) {
                aboveFace = newChunk.children[i - 5].bottomFace;
            }
            else if (this.chunkGroup.children.length > 1) {
                aboveFace = this.lastChunk.children[this.lastChunk.children.length - (5 - i)].bottomFace;
            }
            else {
                aboveFace = this.game.rnd.integerInRange(0, 1);
            }
            newChunk.add(new Block(this.game, xPos, yPos, leftFace, aboveFace));
            xPos += 64;
            if (xPos >= this.game.width) {
                xPos = 0;
                yPos += 64;
            }
        }
        for (i = 0; i < GEM_FREQUENCY; i++) {
            if (chanceRoll(this.game, GEM_WEIGHT))
                this.gems.add(new Gem(this.game, this.game.rnd.integerInRange(0, 64 * 5), this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY + 64 * 8)));
        }
        if (this.chunkIndex != 0) { // first chunk won't generate rocks, carrots, or lava
            for (i = 0; i < ROCK_FREQUENCY; i++) {
                if (chanceRoll(this.game, ROCK_WEIGHT)) {
                    var newRock = void 0;
                    do { // try to prevent overlapping rocks, kinda
                        newRock = new Rock(this.game, this.game.rnd.integerInRange(0, 64 * 5), this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY + 64 * 8));
                    } while (this.game.physics.arcade.overlap(newRock, this.rocks));
                    this.rocks.add(newRock);
                }
            }
            for (i = 0; i < CARROT_FREQUENCY; i++) {
                if (chanceRoll(this.game, CARROT_WEIGHT))
                    this.carrots.add(new Carrot(this.game, this.game.rnd.integerInRange(0, 64 * 5), this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY + 64 * 8)));
            }
            for (i = 0; i < LAVA_FREQUENCY; i++) {
                if (chanceRoll(this.game, LAVA_WEIGHT))
                    this.tephra.add(new Lava(this.game, this.game.rnd.integerInRange(0, 64 * 5), this.game.rnd.integerInRange(this.nextChunkY, this.nextChunkY + 64 * 8)));
            }
        }
        this.nextChunkY += 64 * 8;
        this.lastChunkIndex = this.chunkGroup.getIndex(newChunk);
        this.lastChunk = newChunk;
        this.chunkIndex++;
        this.game.world.bounds.y = newChunk.y - 8 * 64;
        this.game.camera.bounds.height += 64 * 8;
        this.game.physics.arcade.setBoundsToWorld();
        // FASTER FASTER BUNNY
        if (this.bunny) {
            this.bunny.updateSpeed(INCREASE_PER_CHUNK);
        }
    };
    Play.prototype.collectGems = function (player, gem) {
        this.getEmitter.emitX = gem.x;
        this.getEmitter.emitY = gem.y;
        this.cash += gem.value();
        this.gems.remove(gem, true);
        this.getEmitter.start(true, 1000, null, 25);
        this.sfx.play('gem');
    };
    Play.prototype.collectCarrot = function (player, carrot) {
        this.getEmitter.emitX = carrot.x;
        this.getEmitter.emitY = carrot.y;
        this.carrots.remove(carrot, true);
        this.getEmitter.start(true, 1000, null, 25);
        this.bunny.powerup();
        this.sfx.play('carrot');
    };
    Play.prototype.hitRock = function (player, rock) {
        if (rock.frame === 1) {
            this.bunny.hitRock(DARK_ROCK_DAMAGE);
        }
        else {
            this.bunny.hitRock(LIGHT_ROCK_DAMAGE);
        }
        this.sfx.play('ouch');
    };
    Play.prototype.hitLava = function (player, lava) {
        this.bunny.hitRock(LAVA_DAMAGE);
        this.sfx.play('ouch');
    };
    return Play;
}(Phaser.State));
//# sourceMappingURL=Play.js.map