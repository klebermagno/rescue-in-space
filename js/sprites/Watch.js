(function () {

	var Watch = function (speedRate) {
		this.initialize(speedRate);
	}

	var p = Watch.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	p.score = 0;
	
	p.initialize = function (speedRate) {
		this.Bitmap_initialize('assets/powerup_relogio' + String(speedRate) + '.png');
		this.score = speedRate * 1000;

		this.scale = 0.15;
		this.scaleRate = 0.005;

		this.scaleX = this.scaleY = this.scale;
		this.regX = 55;
		this.regY = 60;
		this.on('tick', this.update, this);
	}
	
	p.update = function () {
		if (this.scale > 1.25) {
			this.dispatchEvent(this.SIZE_EXEEDED);
		} else {
			this.rotation += this.rotationSpeed;
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
		}
	}

	window.Watch = Watch;
	
}());