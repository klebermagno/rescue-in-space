(function () {

	var Explosion = function (x, y, scale) {
		this.initialize(x, y, scale);
	}
	
	var p = Explosion.prototype = new createjs.Sprite();
	p.Sprite_initialize = p.initialize;

	p.EXPLOSION_COMPLETE = 'explosion complete';

	p.initialize = function (x, y, scale) {
		this.Sprite_initialize(spritesheet);
		this.scaleX = this.scaleY = scale*2.5;
		this.x = x;
		this.y = y;
		this.regX = this.getBounds().width / 2;
		this.regY = this.getBounds().height / 2;
	}

	p.explode = function() {
		this.on('animationend', this.explosionComplete, this);
		this.gotoAndPlay('explosion');
		createjs.Sound.play(game.assets.EXPLOSION);
	}

	p.explosionComplete = function(e) {
		this.stop();
		this.dispatchEvent(this.EXPLOSION_COMPLETE);
	}

	window.Explosion = Explosion;
	
}());