(function () {

	var Bomba = function (speedRate) {
		this.initialize(speedRate);
	}

	var p = Bomba.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;

	p.initialize = function (speedRate) {
		this.Bitmap_initialize('assets/powerup_bomba.png');

		this.scale = .3;
		this.scaleRate = speedRate;

		this.scaleX = this.scaleY = this.scale;
		this.regX = 55;
		this.regY = 50;
		this.on('tick', this.update, this);
	}

	p.update = function () {
		if (this.scale > 1.5) {
			this.dispatchEvent(this.SIZE_EXEEDED);
		} else {
			this.rotation += this.rotationSpeed;
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
		}
	}

	window.Bomba = Bomba;

}());