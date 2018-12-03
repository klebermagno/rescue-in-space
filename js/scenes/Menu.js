(function (window) {

	window.game = window.game || {}

	function Menu() {
		this.initialize();
	}

	var p = Menu.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;

	p.playBtn = null;
	p.rankBtn = null;

	p.shape = null;
	p.bRank = null;

	p.initialize = function () {
		this.Container_initialize();
		this.addTitle();
		this.addButton();
	}

	p.addTitle = function () {
		var fundo = new createjs.Bitmap('assets/tela_inicio.png');
		this.addChild(fundo);
	}

	p.addButton = function () {
		this.shape = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,260,120));
		this.shape.alpha = 0.01;
		this.shape.x = 180;
		this.shape.y = 390;
		this.shape.on('click', this.showTutorial, this);
		this.shape.cache(-130, -60, 520, 240);
		this.addChild(this.shape);

		//this.bRank = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,260,120));
		//this.bRank.alpha = 0.01;
		//this.bRank.x = 180;
		//this.bRank.y = 530;
		//this.bRank.on('click', this.rank, this);
		//this.bRank.cache(-130, -60, 520, 240);
		//this.addChild(this.bRank);
	}

	p.playGame = function (e) {
		this.shape.uncache();
		//this.bRank.uncache();
		staticStage.removeAllChildren();
		this.dispatchEvent(game.GameStateEvents.NAME_CHOICE);
	}

	p.showTutorial = function (e) {
		var fundo = new createjs.Bitmap('assets/tela_tutorial.png');
		fundo.on('click', this.playGame, this);
		this.addChild(fundo);
	}

	p.rank = function (e) {
		this.dispatchEvent(game.GameStateEvents.RANK);
	}

	window.game.Menu = Menu;

}(window));