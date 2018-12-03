(function (window) {

	window.game = window.game || {}

	function Rank() {
		this.initialize();
	}

	var p = Rank.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;
	p.rankContainer = null;
	p.topArray = null;

	p.initialize = function () {
		this.Container_initialize();
		this.getTopScore();
	}

	p.createRankContainer = function() {
		var stroke;

		this.rankContainer = new createjs.Container();
		this.rankContainer.x = screen_width*.15;
		this.rankContainer.y = screen_height*.10;
		stroke = new createjs.Shape(new createjs.Graphics().beginStroke('#d2354c').drawRect(0, 0, screen_width*.7, 50*this.topArray.length));
		this.rankContainer.addChild(stroke);
		stroke = new createjs.Shape(new createjs.Graphics().beginStroke('#d2354c').drawRect(0, 0, screen_width*.4, 50*this.topArray.length));
		this.rankContainer.addChild(stroke);
		this.addChild(this.rankContainer);
	}

	p.addPlayersContainers = function () {
		var i, scoreWidth, nameTxt, scoreTxt, container, stroke;

		for (i = 0; i < this.topArray.length; i++) {
			scoreWidth = this.topArray[i].score.length * 23;

			container = new createjs.Container();
			stroke = new createjs.Shape(new createjs.Graphics().beginStroke('#d2354c').drawRect(0, 0, screen_width*.7, 50));
			container.addChild(stroke);
			container.y = i*50;

			nameTxt = new createjs.Text(this.topArray[i].name, "bold 23px Arial", "#E9E9E9");
			nameTxt.textBaseline = "middle";
			nameTxt.x = 15;
			nameTxt.y = 25;

			scoreTxt = new createjs.BitmapText(this.topArray[i].score, numbersheet);
			scoreTxt.x = screen_width*.55 - scoreWidth / 2;
			scoreTxt.y = 10;

			container.addChild(nameTxt, scoreTxt);

			this.rankContainer.addChild(container);
		}
	}

	p.addButtons = function() {
		var playBtn, menuBtn;

		playBtn = new ui.Button('Play Game');
		playBtn.on('click', this.playAgain, this);
		playBtn.setButton({upColor:'#d2354c', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
		playBtn.x = screen_width * .15;

		menuBtn = new ui.Button('Main Menu');
		menuBtn.on('click', this.mainMenu, this);
		menuBtn.setButton({upColor:'#d2354c', color:'#FFF', borderColor:'#FFF', overColor:'#900'});
		menuBtn.x = screen_width * .85 - menuBtn.width;

		playBtn.y = menuBtn.y = screen_height*.10 + 10*50 + 25;

		this.addChild(playBtn, menuBtn);
	}

	p.getTopScore = function (e) {
		var that = this;
		$.ajax({
			url:"webservice/getTopScore.php",
		})
		.done(function(result, textStatus, jqXHR ) {
			that.topArray = JSON.parse(String(result));
			that.createRankContainer();
			that.addPlayersContainers();
		})
		.fail(function(textStatus, jqXHR, errorThrow) {
			console.log("fail, erro ao adicionar score");
		}).then(function() {
			that.addButtons();
		});
	}

	p.playAgain = function (e) {
		//this.dispose();
		this.dispatchEvent(game.GameStateEvents.GAME);
	}

	p.mainMenu = function (e) {
		//this.dispose();
		this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
	}

	p.dispose = function () {
		this.removeAllChildren();
	}

	window.game.Rank = Rank;

}(window));