(function () {

	var Anvil = function (speedRate) {
		this.initialize(speedRate);
	}

	var p = Anvil.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;

	p.initialize = function (speedRate) {
		this.Bitmap_initialize('assets/objeto_bigorna.png');

		this.scale = .3;
		this.scaleRate = speedRate;

		this.scaleX = this.scaleY = this.scale;
		this.regX = 64;
		this.regY = 55;
		this.on('tick', this.update, this);
	}

	p.update = function () {
		if (this.scale > 1.2) {
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

	window.Anvil = Anvil;
	
}());