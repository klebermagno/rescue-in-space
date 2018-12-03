(function () {

	var StickingEnemy = function (speedRate) {
		this.initialize(speedRate);
	}

	var p = StickingEnemy.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'size exceeded';
	p.GLUE = 'glue';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	p.tipo = null;
	p.arrasto = 0;

	p.initialize = function (speedRate) {
		if(speedRate == 'meleca') {
			this.Bitmap_initialize('assets/objeto_inimigo1.png');
		}
		if(speedRate == 'space_invader') {
			this.Bitmap_initialize('assets/objeto_inimigo2.png');
		}
		if(speedRate == 'robo') {
			this.Bitmap_initialize('assets/objeto_inimigo3.png');
		}

		this.scale = .25;
		this.scaleRate = 0.3;//speedRate;

		this.scaleX = this.scaleY = this.scale;	
		this.regX = 55;
		this.regY = 60;
		this.on('tick', this.update, this);
	}

	p.update = function () {
		if (this.scale > 1) {
			this.y++;
			this.arrasto++;
			if(this.arrasto % 30 == 0) {
				this.dispatchEvent(this.GLUE);
			}
			if(this.arrasto % 100 == 0) {
				this.dispatchEvent(this.SIZE_EXEEDED);
				//-30 pontos
			}
		} else {
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
		}
	}

	window.StickingEnemy = StickingEnemy;
	
}());