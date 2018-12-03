(function () {

	window.game = window.game || {};

	var AssetManager = function () {
		this.initialize();
	}
	var p = AssetManager.prototype = new createjs.EventDispatcher();

	p.EventDispatcher_initialize = p.initialize;

	//extras
	p.FULL_GAME_DATA = 'full game data';
	p.PLAYER_DATA = 'player data';

	//sounds
	p.SOUNDTRACK = 'soundtrack';
	p.EXPLOSION = 'explosion';
	p.ASTEROID_DESTROYER = 'asteroid destroyer';
	p.GAMEOVER_SOUND = 'gameover sound';

	//graphics
	p.ASTEROID_SPRITE = 'asteroid sprite';
	p.NUMBER_SPRITE = 'number sprite';

	//data
	p.ASTEROID_SPRITE_DATA = 'asteroid sprite data';
	p.NUMBER_SPRITE_DATA = 'number sprite data';

	//events
	p.ASSETS_PROGRESS = 'assets progress';
	p.ASSETS_COMPLETE = 'assets complete';

	p.assetsPath = 'assets/';

	p.manifest = null;
	p.queue = null;
	p.loadProgress = 0;

	p.initialize = function () {
		this.EventDispatcher_initialize();
		this.manifest = [
			{id:this.FULL_GAME_DATA, src:this.assetsPath + 'assets.json'},
			{id:this.PLAYER_DATA, src:this.assetsPath + 'player.json'},

			{id:this.EXPLOSION, src:this.assetsPath + 'explosion.mp3'},
			{id:this.ASTEROID_DESTROYER, src:this.assetsPath + 'bow_fire.mp3'},
			{id:this.GAMEOVER_SOUND, src:this.assetsPath + 'over.mp3'},
			{id:this.SOUNDTRACK, src:this.assetsPath + 'soundtrack.mp3'},

			{id:this.ASTEROID_SPRITE, src:this.assetsPath + 'gameSprites.png'},
			{id:this.ASTEROID_SPRITE_DATA, src:this.assetsPath + 'gameSpritesData.json'},
			{id:this.NUMBER_SPRITE, src:this.assetsPath + 'number.png'},
			{id:this.NUMBER_SPRITE_DATA, src:this.assetsPath + 'numberData.json'},
		];
	}

	p.preloadAssets = function () {
		createjs.Sound.initializeDefaultPlugins();
		this.queue = new createjs.LoadQueue();
		this.queue.installPlugin(createjs.Sound);
		this.queue.on('progress', this.assetsProgress, this);
		this.queue.on('complete', this.assetsLoaded, this);        
		createjs.Sound.alternateExtensions = ["ogg"];
		this.queue.loadManifest(this.manifest);
	}
	p.assetsProgress = function (e) {
		this.loadProgress = e.progress;
		this.dispatchEvent(this.ASSETS_PROGRESS);
	}
	p.assetsLoaded = function (e) {
		this.dispatchEvent(this.ASSETS_COMPLETE);
	}
	p.getAsset = function (asset) {
		return this.queue.getResult(asset);
	}

	window.game.AssetManager = AssetManager;

}());