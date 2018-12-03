(function () {

	var Player = function (type) {
		this.initialize(type);
	}
	
	var p = Player.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;

	p.data = null;
	
	p.initialize = function (type) {
		this.Container_initialize();
		this.x = this.y = 0
		this.data = data.PlayerData[type];

		//var frame = Math.round(Math.random() * 3.49) + 1;
		var spacecraft = new createjs.Sprite(playerSheet);
		spacecraft.gotoAndStop(this.data.spacecraft);
		//var hand = new createjs.Sprite(playerSheet);
		//if(type == 'male') {
			//this.gotoAndStop(0);
		//}else{
			//this.gotoAndStop(1);
		//}
		//hand.gotoAndStop(this.data.hand);
		//hand.regX = hand.getBounds().width / 2;
		//hand.regY = hand.getBounds().height;
		//hand.x = canvas.width / 2;
		//hand.y = canvas.height;

		this.addChild(spacecraft);//, hand);
	}
	
	window.Player = Player;
	
}());