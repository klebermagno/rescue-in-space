(function () {

	var SpaceTrash = function (speedRate) {
		//this.initialize(speedRate);
	}

	var p = SpaceTrash.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	p.tipo = null;

	p.initialize = function (speedRate) {
		if(this.tipo == 'anvil') {
			this.Bitmap_initialize('assets/objeto_bigorna.png');
		}
		if(this.tipo == 'space_trash') {
			this.Bitmap_initialize('assets/objeto_lixo.png');
		}
		if(this.tipo == 'bar') {
			this.Bitmap_initialize('assets/objeto_barra.png');
		}

		this.scale = .3;
		this.scaleRate = speedRate;

		this.scaleX = this.scaleY = this.scale;	
		this.regX = 55;
		this.regY = 60;
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
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
			this.rotation += this.rotationSpeed;
		}
	}

	window.SpaceTrash = SpaceTrash;
	
}());