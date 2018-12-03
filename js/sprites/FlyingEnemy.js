(function () {

	var FlyingEnemy = function () {
		this.initialize();
	}

	var p = FlyingEnemy.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	p.tipo = null;

	p.sobeOuDesce = true;//true = sobe / false = desce
	p.range = 0;//range = 15
	p.retoOuZigZag = true;//true = reto / false / zig-zag

	p.initialize = function () {
		//if(this.tipo == 'anvil') {
		var randomObject = Math.random() * 100;
		var randomObject2 = Math.random() * 100;
		if(randomObject < 50) {
			this.retoOuZigZag = true;
			if(randomObject2 < 50) {
				this.Bitmap_initialize('assets/objeto_naveinimiga_reto1.png');
			} else {
				this.Bitmap_initialize('assets/objeto_naveinimiga_reto2.png');
			}
		} else {
			this.retoOuZigZag = false;
			if(randomObject2 < 50) {
				this.Bitmap_initialize('assets/objeto_naveinimiga_zigzag1.png');
			} else {
				this.Bitmap_initialize('assets/objeto_naveinimiga_zigzag2.png');
			}
		}

		//}
		//if(this.tipo == 'space_trash') {
			//this.Bitmap_initialize('assets/objeto_lixo.png');
		//}
		//if(this.tipo == 'bar') {
			//this.Bitmap_initialize('assets/objeto_barra.png');
		//}

		this.scale = .1;
		this.scaleRate = 0.005;//speedRate;

		this.scaleX = this.scaleY = this.scale;	
		this.regX = 55;
		this.regY = 60;
		this.on('tick', this.update, this);
	}

	p.update = function () {
		if (this.x > 600) {
			this.dispatchEvent(this.SIZE_EXEEDED);
		} else {
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
			//this.rotation += this.rotationSpeed;
			this.x+=3;
			if(!this.retoOuZigZag) {
				if(this.sobeOuDesce) {
					if(this.range <= 15) {
						this.range++;
					} else {
						this.range = 0;
						this.sobeOuDesce = false;
					}
					this.y+=2;
				} else {
					if(this.range <= 15) {
						this.range++;
					} else {
						this.range = 0;
						this.sobeOuDesce = true;
					}
					this.y-=2;
				}
			}
		}
	}

	window.FlyingEnemy = FlyingEnemy;
	
}());