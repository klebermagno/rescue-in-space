(function (window) {

	window.game = window.game || {}

	function LevelSelect() {
		this.initialize();
	}

	var p = LevelSelect.prototype = new createjs.Container();

	p.PADDING = 15;

	p.Container_initialize = p.initialize;
	//p.levelContainer = null;
	p.unlockedLevel = null;
	p.currentLevel = 1;

	p.initialize = function () {
		var fundo = new createjs.Bitmap('assets/bg.png');
		staticStage.addChild(fundo);
		this.Container_initialize();
		this.createLevelContainer();
		this.addLevels();
		this.addButtons();
	}

	p.createLevelContainer = function() {
		this.levelContainer = new createjs.Container();
		this.levelContainer.x = 50;
		this.levelContainer.y = screen_height*.10;
		//this.addChild(this.levelContainer);
	}

	p.addLevels = function () {
		var i, levelContainer, level, scoreWidth, scoreTxt;

		var texto = new createjs.Bitmap('assets/menu_texto_planeta.png');
		texto.x = 75; texto.y = 25;

		this.addChild(texto);
		var levelPadding = 33;

		for (i = 1; i <= 5; i++) {
			scoreWidth = String(data.GameData.levelData[i-1].bestScore).length * 23;

			container = new createjs.Container();
			if(i < 5) {
				container.x = ((i%2 != 0) ? 50 : 300);
			} else {
				container.x = 170;
			}
			if(i == 5) {
				container.y = 350;
			} else {
				container.y = ((i/2 > 1) ? 225 : 100);
			}
			level = new createjs.Bitmap('assets/planet' + i.toString() + '.png');
			level.scaleX = 0.5; level.scaleY = 0.5;
			//level.cache(-250, -110, 1000, 440);

			var scoreTxt = new createjs.Text(String(data.GameData.levelData[i-1].bestScore), "30px KristenITC-Regular", "#fff");
			scoreTxt.x = 200 - scoreWidth / 2;
			scoreTxt.y = 70;
			container.addChild(scoreTxt);

			container.addChild(level, scoreTxt);
			container.on('click', this.playGame, this, true, {level:i});

			this.addChild(container);
		}
	}

	p.addButtons = function() {
		var menuBtn;

		menuBtn = new createjs.Bitmap('assets/menu_botao_voltarmenu.png');
		menuBtn.on('click', this.mainMenu, this);
		menuBtn.scaleX = 0.6; menuBtn.scaleY = 0.6;
		menuBtn.x = 205; menuBtn.y = 550;

		this.addChild(menuBtn);
	}

	p.playGame = function (e, obj) {
		data.GameData.currentLevel = obj.level;
		//window.game.SelectedLevel = this.currentLevel;
		this.dispatchEvent(game.GameStateEvents.GAME);
	}

	p.onStateEvent = function (e, obj) {
		this.changeState(obj.state);
	}

	p.mainMenu = function (e) {
		//this.dispose();
		this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
	}

	p.dispose = function () {
		this.removeAllChildren();
	}

	window.game.LevelSelect = LevelSelect;
	//window.game.SelectedLevel = this.currentLevel;

}(window));