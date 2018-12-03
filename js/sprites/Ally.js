(function () {

	var Ally = function (speedRate) {
		this.initialize(speedRate);
	}

	var p = Ally.prototype = new createjs.Bitmap();
	p.Bitmap_initialize = p.initialize;

	p.SIZE_EXEEDED = 'ally size exceeded';

	p.rotationSpeed = null;
	p.scale = null;
	p.scaleRate = 0;
	
	p.initialize = function (speedRate) {
		if (data.GameData.currentLevel == 5) {
			var randomObject = Math.random() * 100;
			if (randomObject < 33) {
				this.Bitmap_initialize('assets/npc_cao1.png');
			} else if (randomObject >= 33 && randomObject < 66) {
				this.Bitmap_initialize('assets/npc_astronauta1.png');
			} else {
				this.Bitmap_initialize('assets/npc_nave1.png');
			}
		} else if (data.GameData.currentLevel == 2) {
			this.Bitmap_initialize('assets/npc_cao1.png');
		} else if (data.GameData.currentLevel == 3) {
			this.Bitmap_initialize('assets/npc_astronauta1.png');
		} else if (data.GameData.currentLevel == 4) {
			this.Bitmap_initialize('assets/npc_nave1.png');
		}

		this.scale = 0.35;
		this.scaleRate = speedRate * 2;

		this.scaleX = this.scaleY = this.scale;
		this.regX = 55;
		this.regY = 60;
		this.on('tick', this.update, this);
	}
	
	p.update = function () {
		if (this.scale > 0.85) {
			this.dispatchEvent(this.SIZE_EXEEDED);
		} else {
			this.rotation += this.rotationSpeed;
			this.scale += this.scaleRate;
			this.scaleX = this.scaleY = this.scale;
		}
	}

	window.Ally = Ally;
	
}());