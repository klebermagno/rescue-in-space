(function () {

	var PowerUp = function (speedRate) {
		this.initialize(speedRate);
	}
	
	var p = PowerUp.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;
	
	p.SIZE_EXEEDED = 'size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	
	p.initialize = function (speedRate) {
		this.Bitmap_initialize('assets/powerup_vida.png');

		this.scale = .3;
		this.scaleRate = speedRate;

		this.scaleX = this.scaleY = this.scale;	
		this.regX = 50;
		this.regY = 65;
		this.on('tick', this.update, this);
	}
	
	p.update = function () {
		if (this.scale > 1.35) {
			this.dispatchEvent(this.SIZE_EXEEDED);
		} else {
			this.rotation += this.rotationSpeed;
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
		}
	}

	window.PowerUp = PowerUp;
	
}());