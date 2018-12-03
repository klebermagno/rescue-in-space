(function () {

	var PlanetGoal = function (type) {		
		this.initialize(type);
	}
	
	var p = PlanetGoal.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	p.velY = 0.2;
	
	p.initialize = function (type) {
		this.Bitmap_initialize('assets/' + type + '.png');

		this.scale = .1;
		this.scaleRate = 0.0004;

		this.scaleX = this.scaleY = this.scale;
		this.x = 375;
		this.y = 300;
		this.on('tick', this.update, this);
	}
	
	p.update = function () {
		if (this.scale > 1.49) {
			this.scale += (this.scaleRate*0.01);
			this.scaleX = this.scaleY = this.scale;
			//this.stop();
			//this.dispatchEvent(this.SIZE_EXEEDED);
		} else {
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
			this.y += this.velY;
		}
	}

	window.PlanetGoal = PlanetGoal;
	
}());