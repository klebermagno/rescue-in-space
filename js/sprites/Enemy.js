(function () {

	var Enemy = function (speedRate, type) {
		this.data = data.EnemyData[type];
		this.initialize(speedRate);
	}
	
	var p = Enemy.prototype = new createjs.Sprite();
	p.Sprite_initialize = p.initialize;
	
	p.SIZE_EXEEDED = 'size exceeded';

	p.data = null;
	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	p.score = null;
	
	p.initialize = function (speedRate) {
		this.Sprite_initialize(fullSpritesheet);

		this.scale = .5;
		this.scaleRate = speedRate;

		//var frame = Math.round(Math.random() * 3.49) + 1;
		this.gotoAndStop(this.data.frame);
		this.scaleX = this.scaleY = this.scale;	
		this.regX = this.getBounds().width / 2;
		this.regY = this.getBounds().height / 2;
		this.on('tick', this.update, this);
	}

	p.update = function () {
		if (this.scale > 1.2) {
			this.stop();
			this.dispatchEvent(this.SIZE_EXEEDED);
		} else if (this.scale > 0.85) {
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
			if(Math.round(this.scale * 100) % 2 == 0) {
				this.alpha = 0.1;
				//this.visible = true;
			} else {
				this.alpha = 1;
				//this.visible = false;
			}
		} else {
			this.rotation += this.rotationSpeed;
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
		}
	}

	window.Enemy = Enemy;
	
}());