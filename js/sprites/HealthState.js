(function (window) {

	window.game = window.game || {}

	function HealthState () {
		this.initialize();
	}
	
	var p = HealthState.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;

	p.PADDING = 8;
	p.fullLife = null;
	p.life = null;

	p.icons = [null, null, null];

	p.initialize = function () {
		this.Container_initialize();

		this.life = this.fullLife = 3;
		this.createHearts();
		
		//this.y = this.PADDING;
		this.y = 545;
		//this.x = screen_width - this.getBounds().width * .7 - this.PADDING;
		this.x = 325;
		this.scaleX = this.scaleY = .7;
	}

	p.createHearts = function () {
		var i, heart;
		for (i = 0; i < this.life; i++) {
			//heart = new createjs.Bitmap(heartFull);
			this.icons[i] = new createjs.Bitmap('assets/heartFull.png');
			this.icons[i].x = (i * 45);
			this.icons[i].y = (i * 5);
			this.addChild(this.icons[i]);
			//heart.x = (i * 45);//heart.getBounds().width);
			//heart.y = (i * 5);

			//this.addChild(heart);
		};
	}

	p.removeHeart = function () {
		//var heart = this.icons[0];//this.getChildAt(this.fullLife - this.life);
		//heart.image = heartEmpty;
		this.removeChild(this.icons[this.life-1]);//icons[this.life] = null;
		this.icons.splice(this.life-1, 1);
		this.life--;
		//for (i = 0; i < this.life; i++) {
			//this.icons[i].x -= 45;
			//this.icons[i].y -= 5;
			//this.addChild(this.icons[i]);
		//};
	}

	p.insertHeart = function () {
		//for (i = 0; i < this.life; i++) {
			//this.icons[i].x -= 45;
			//this.icons[i].y -= 5;
			//this.addChild(this.icons[i]);
		//};
		this.life++;
		this.icons[this.life-1] = new createjs.Bitmap('assets/heartFull.png');//var heart
		this.icons[this.life-1].x = this.getChildAt(this.life-2).x + 45;
		this.icons[this.life-1].y = this.getChildAt(this.life-2).y + 5;
		this.addChild(this.icons[this.life-1]);
	}

	window.game.HealthState = HealthState;
	
}(window));