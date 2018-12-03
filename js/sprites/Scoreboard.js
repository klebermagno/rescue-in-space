(function (window) {

	window.game = window.game || {}

	function Scoreboard() {
		this.initialize();
	}

	var p = Scoreboard.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;

	p.scoreTxt = null;
	p.score = 0;
    
	p.initialize = function () {
		this.Container_initialize();
		this.x = 140;
		this.y = 552;
		this.rotation -= 5;
		this.scoreTxt = new createjs.BitmapText("0000000", numbersheet);
		this.addChild(this.scoreTxt);
	}
   
	p.updateScore = function (points) {
		var formattedScore;
		this.score += points;
		formattedScore = this.addLeadingZeros(this.score, 7); 
		this.scoreTxt.text = formattedScore;     
	}

	p.addLeadingZeros = function (score, width) {
		score = score + '';
		return score.length >= width ? score : new Array(width - score.length + 1).join(0) + score;
	}

	p.getScore = function () {
		return this.score;
	}

	p.clearScore = function () {
		this.score = 0;
		this.scoreTxt = new createjs.BitmapText("0000000", numbersheet);
	}

	p.getScoreWithZeros = function () {
		return this.addLeadingZeros(this.score, 7);
	}

	window.game.Scoreboard = Scoreboard;

}(window));