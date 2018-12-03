(function (window) {

	window.game = window.game || {}

	function asteroidGame() {
		this.initialize();
	}

	var p = asteroidGame.prototype;

	p.currentGameStateFunction = null;
	p.currentScene = null;
	p.queue = null;

	p.initialize = function () {
		// set globals
		staticCanvas = document.getElementById('static_canvas');
		canvas = document.getElementById('canvas');
		staticStage = new createjs.Stage(staticCanvas);
		stage = new createjs.Stage(canvas);
		screen_width = canvas.width;
		screen_height = canvas.height;

		// mobile
		this.optimizeForTouchAndScreens();
		stage.enableMouseOver();
		staticStage.enableMouseOver();

		createjs.Ticker.setFPS(30);
		createjs.Ticker.on("tick", this.onTick, this);

		game.assets = new game.AssetManager();
		this.preloadAssets();
	}

	p.optimizeForTouchAndScreens = function() {
		if (typeof window.orientation !== 'undefined') {
			window.onorientationchange = this.onOrientationChange;

			if (createjs.Touch.isSupported()) {
				createjs.Touch.enable(stage);
				createjs.Touch.enable(staticStage);
			}

			this.onOrientationChange();
		} else {
			window.onresize = this.resizeGame;
			this.resizeGame();
		}
	}

	p.onOrientationChange = function() {
		setTimeout(this.resizeGame, 100);
	}

	p.resizeGame = function() {
		var nTop, nLeft, scale;
		var gameWrapper = document.getElementById('gameWrapper');
		var bg = document.getElementById('bg');
		var form = document.getElementById('formResizer');
		var w = window.innerWidth;
		var h = window.innerHeight;
		var nWidth = window.innerWidth;
		var nHeight = window.innerHeight;
		var widthToHeight = canvas.width / canvas.height;
		var nWidthToHeight = nWidth / nHeight;

		if (nWidthToHeight > widthToHeight) {
			nWidth = nHeight * widthToHeight;
			scale = nWidth / canvas.width;
			nLeft = (w / 2) - (nWidth / 2);
			gameWrapper.style.left = (nLeft) + "px";
			gameWrapper.style.top = "0px";
		} else {
			nHeight = nWidth / widthToHeight;
			scale = nHeight / canvas.height;
			nTop= (h / 2) - (nHeight / 2);
			gameWrapper.style.top = (nTop) + "px";
			gameWrapper.style.left = "0px";
		}

		staticCanvas.setAttribute("style", "-webkit-transform:scale(" + scale + ")");
		staticCanvas.setAttribute("style", "-moz-transform:scale(" + scale + ")");
		canvas.setAttribute("style", "-webkit-transform:scale(" + scale + ")");
		canvas.setAttribute("style", "-moz-transform:scale(" + scale + ")");
		bg.setAttribute("style", "-webkit-transform:scale(" + scale + ")");
		bg.setAttribute("style", "-moz-transform:scale(" + scale + ")");
		form.setAttribute("style", "-webkit-transform:scale(" + scale + ")");
		form.setAttribute("style", "-moz-transform:scale(" + scale + ")");
		screen_width = canvas.width;
		screen_height = canvas.height;
		window.scrollTo(0, 0);
	}

	p.preloadAssets = function() {
		this.preloader = new ui.Preloader('#0F0', '#FFF');
		this.preloader.x = (screen_width / 2) - (this.preloader.width / 2);
		this.preloader.y = (screen_height / 2) - (this.preloader.height / 2);
		stage.addChild(this.preloader);
		game.assets.preloadAssets();
		game.assets.on(game.assets.ASSETS_PROGRESS, this.onAssetsProgress, this);
		game.assets.on(game.assets.ASSETS_COMPLETE, this.assetsReady, this);
	}

	p.onAssetsProgress = function () {
		this.preloader.update(game.assets.loadProgress);
		stage.update();
	}

	p.assetsReady = function () {
		stage.removeChild(this.preloader);
		this.createSpriteSheet();
	}

	p.createSpriteSheet = function () {
		var assets = game.assets;
		fullSpritesheet = new createjs.SpriteSheet(assets.getAsset(assets.FULL_GAME_DATA));
		playerSheet = new createjs.SpriteSheet(assets.getAsset(assets.PLAYER_DATA));
		spritesheet = new createjs.SpriteSheet(assets.getAsset(assets.ASTEROID_SPRITE_DATA));
		numbersheet = new createjs.SpriteSheet(assets.getAsset(assets.NUMBER_SPRITE_DATA));

	this.gameReady();
	}

	p.gameReady = function () {
		this.changeState(game.GameStates.MAIN_MENU);
	}

	p.changeState = function (state) {
		switch (state) {
			case game.GameStates.RUN_SCENE:
				this.currentGameStateFunction = this.gameStateRunScene;
				break;
			case game.GameStates.MAIN_MENU:
				this.currentGameStateFunction = this.gameStateMainMenu;
				break;
			case game.GameStates.PLAYER_CHOICE:
				this.currentGameStateFunction = this.gameStatePlayerSelect;
				break;
			case game.GameStates.NAME_CHOICE:
				this.currentGameStateFunction = this.gameStateNameSelect;
				break;
			case game.GameStates.LEVEL_CHOICE:
				this.currentGameStateFunction = this.gameStateLevelChoice;
				break;
			case game.GameStates.GAME:
				this.currentGameStateFunction = this.gameStateGame;
				break;
			case game.GameStates.LEVEL_COMPLETE:
				this.currentGameStateFunction = this.gameStateLevelComplete;
				break;
			case game.GameStates.GAME_OVER:
				this.currentGameStateFunction = this.gameStateGameOver;
				break;
			case game.GameStates.RANK:
				this.currentGameStateFunction = this.gameStateRank;
				break;
			case game.GameStates.REALLY_OVER:
				this.currentGameStateFunction = this.gameStateReallyOver;
				break;
		}
	}

	p.onStateEvent = function (e, obj) {
		this.changeState(obj.state);
	}

	p.disposeCurrentScene = function () {
		if (this.currentScene != null) {
			stage.removeChild(this.currentScene);
			if (this.currentScene.dispose){
				this.currentScene.dispose();
			}
			this.currentScene = null;
		}
	}

	p.gameStateRunScene = function (tickEvent) {
		if (this.currentScene.run) {
			this.currentScene.run(tickEvent);
		}
	}

	p.gameStateMainMenu = function (tickEvent) {
		var scene = new game.Menu();
		scene.on(game.GameStateEvents.NAME_CHOICE, this.onStateEvent, this, true, {state:game.GameStates.NAME_CHOICE});
		scene.on(game.GameStateEvents.RANK, this.onStateEvent, this, true, {state:game.GameStates.RANK});
		stage.removeAllChildren();
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStatePlayerSelect = function (tickEvent) {
		var scene = new game.PlayerSelect();
		scene.on(game.GameStateEvents.LEVEL_CHOICE, this.onStateEvent, this, true, {state:game.GameStates.LEVEL_CHOICE});
		stage.removeAllChildren();
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateNameSelect = function (tickEvent) {
		var scene = new game.NameSelect();
		scene.on(game.GameStateEvents.PLAYER_CHOICE, this.onStateEvent, this, true, {state:game.GameStates.PLAYER_CHOICE});
		stage.removeAllChildren();
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateLevelChoice = function (tickEvent) {
		var scene = new game.LevelSelect();
		scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, true, {state:game.GameStates.GAME});
		scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, true, {state:game.GameStates.MAIN_MENU});
		stage.removeAllChildren();
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateGame = function (tickEvent) {
		var scene = new game.Game();
		scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, true, {state:game.GameStates.GAME_OVER});
		scene.on(game.GameStateEvents.LEVEL_COMPLETE, this.onStateEvent, this, true, {state:game.GameStates.LEVEL_COMPLETE});
		scene.on(game.GameStateEvents.LEVEL_CHOICE, this.onStateEvent, this, true, {state:game.GameStates.LEVEL_CHOICE});
		scene.on(game.GameStateEvents.REALLY_OVER, this.onStateEvent, this, true, {state:game.GameStates.REALLY_OVER});
		stage.removeAllChildren();
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateLevelComplete = function (tickEvent) {
		var scene = new game.LevelComplete();
		stage.addChild(scene);
		scene.on(game.GameStateEvents.LEVEL_CHOICE, this.onStateEvent, this, true, {state:game.GameStates.LEVEL_CHOICE});
		scene.on(game.GameStateEvents.RANK, this.onStateEvent, this, true, {state:game.GameStates.RANK});
		scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, true, {state:game.GameStates.GAME});
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateGameOver = function (tickEvent) {
		var scene = new game.Over();
		scene.on(game.GameStateEvents.LEVEL_CHOICE, this.onStateEvent, this, true, {state:game.GameStates.LEVEL_CHOICE});
		scene.on(game.GameStateEvents.RANK, this.onStateEvent, this, true, {state:game.GameStates.RANK});
		scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, true, {state:game.GameStates.GAME});
		//stage.removeAllChildren();
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateRank = function (tickEvent) {
		var scene = new game.Rank();
		scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, true, {state:game.GameStates.GAME});
		scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, true, {state:game.GameStates.MAIN_MENU});
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}

	p.gameStateReallyOver = function (tickEvent) {
		var scene = new game.ReallyOver();
		scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, true, {state:game.GameStates.GAME});
		scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, true, {state:game.GameStates.MAIN_MENU});
		stage.addChild(scene);
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GameStates.RUN_SCENE);
	}
   
	p.onTick = function (e) {
		if (this.currentGameStateFunction != null) {
			this.currentGameStateFunction(e);
		}
		stage.update();
	}

	window.game.asteroidGame = asteroidGame;

}(window));