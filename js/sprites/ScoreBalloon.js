(function () {

	var ScoreBalloon = function (x, y, scale, score) {
		this.initialize(x, y, scale, score);
	}
	
	var p = ScoreBalloon.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;

	p.TWEEN_COMPLETE = 'tween complete';

	p.initialize = function (x, y, scale, score) {
		this.Container_initialize();
		this.x = x;
		this.y = y;	

		var balloon = new createjs.Bitmap('assets/objeto_explosao_pontos.png');
		balloon.scaleX = 1.15; balloon.scaleY = 1.15;
		balloon.x = balloon.y = 0;
		this.addChild(balloon);

		var scoreTxt = new createjs.Text(score, '28px HoboStd-Regular', '#368DEE');
		scoreTxt.textBaseline = "middle";
		scoreTxt.textAlign = "center";
		scoreTxt.x = 95;
		scoreTxt.y = 63;

		this.addChild(scoreTxt);
		this.scaleX = this.scaleY = scale;
		this.regX = 75;
		this.regY = 45;		

		//createjs.Tween.get(this).to({y: y-70, alpha: 0}, 800).call(this.tweenComplete, null, this);
		createjs.Tween.get(this).to({alpha: 0}, 800).call(this.tweenComplete, null, this);
	}

	p.tweenComplete = function(e) {
		this.dispatchEvent(this.TWEEN_COMPLETE);
	}

	window.ScoreBalloon = ScoreBalloon;
	
}());