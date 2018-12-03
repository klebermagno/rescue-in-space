(function (window) {

	window.game = window.game || {}

	function Game() {
		this.initialize();
	}

	var p = Game.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.levelData = null;

	p.asteroidContainer = null;
	p.glueEnemyContainer = null;
	p.PlayerContainer = null;
	p.explosionContainer = null;

	p.healthState = null;
	p.scoreboard = null;

	p.numAsteroids = null;
	p.maxAsteroids = null;
	p.numAsteroidsDestroyed = null;
	p.startTime = null;

	p.speedRate = null;

	p.noBombButton = null;
	p.bombButton = null;
	p.temBomba = false;
	p.temAliado = false;

	p.tempo = null;
	p.maoEsquerda = null;

	p.rotacaoMao = true;

	p.fundo = null;

	p.nomeDoLevel = ['Aquarios', 'Purpura-Y', 'Nabuu', 'Zona retro', 'Destino final'];
	p.comecou = false;
	p.popUp = null;
	p.tempoDaFase = 60000;
	p.t = null;

	p.initialize = function () {
		this.fundo = new createjs.Bitmap('assets/cenario_fundo' + String(data.GameData.currentLevel) + '.png');
		this.Container_initialize();
		this.addChild(this.fundo);
		this.levelData = data.GameData.levelData[data.GameData.currentLevel - 1];
		console.log(data.GameData.currentLevel);

		this.numAsteroids = 0;
		this.maxAsteroids = this.levelData.maxEnemys;
		this.numAsteroidsDestroyed = 1;

		this.speedRate = .003;

		this.createHealthState();
		this.createScoreboard();
		this.createContaianers();
		this.createPlayer();
		if(data.PlayerData.character == 'male') {
			this.maoEsquerda = new createjs.Bitmap('assets/cenario_maos_m.png');
		} else {
			this.maoEsquerda = new createjs.Bitmap('assets/cenario_maos_f.png');
		}
		this.maoEsquerda.x = 100;
		this.maoEsquerda.y = 625;
		this.addChild(this.maoEsquerda);

		var menuBtn = new createjs.Bitmap('assets/menu_botao_sairdojogo.png');
		menuBtn.on('click', this.mainMenu, this);
		menuBtn.scaleX = 1.6; menuBtn.scaleY = 1.6;
		menuBtn.x = (screen_width/2) - 25; menuBtn.y = 0;

		this.addChild(menuBtn);

		this.noBombButton = new createjs.Bitmap('assets/cenario_painel_f_botaobomba2.png');
		this.noBombButton.scaleX = 1.15; this.noBombButton.scaleY = 1.15;
		this.noBombButton.x = 475; this.noBombButton.y = 590;

		this.addChild(this.noBombButton);

		this.tempo = new createjs.Text(/*this.startTime*/'00:00', "30px KristenITC-Regular", "#fff");
		this.tempo.textBaseline = "middle";
		this.tempo.textAlign = "center";
		this.tempo.x = 100;
		this.tempo.y = 35;
		this.addChild(this.tempo);
		var relogio = new createjs.Bitmap('assets/menu_icone_tempo.png');
		relogio.scaleX = 1.15; relogio.scaleY = 1.15;
		relogio.x = 40; relogio.y = 17;
		this.addChild(relogio);

		var nomeDoPlaneta = new createjs.Text(this.nomeDoLevel[data.GameData.currentLevel - 1], "30px KristenITC-Regular", "#fff");
		nomeDoPlaneta.textBaseline = "middle";
		nomeDoPlaneta.textAlign = "center";
		nomeDoPlaneta.x = 460;
		nomeDoPlaneta.y = 35;
		this.addChild(nomeDoPlaneta);
		this.popUp = new createjs.Bitmap('assets/menu_caixa_missao' + String(data.GameData.currentLevel) + '.png');
		this.popUp.x = (screen_width/2) - 219; this.popUp.y = (screen_height/2) - 246;
		this.popUp.on('click', this.inicializaFase, this);
		this.addChild(this.popUp);
	}

	p.inicializaFase = function (e) {
		this.removeChild(this.popUp);
		this.comecou = true;
		createjs.Sound.play(game.assets.SOUNDTRACK,createjs.Sound.INTERRUPT_NONE,0,0,-1);
		//this.createPlanetGoal();
		this.createObjects();
	}

	p.mainMenu = function (e) {
		//this.dispose();
		this.dispatchEvent(game.GameStateEvents.LEVEL_CHOICE);
	}

	p.createHealthState = function () {
		this.healthState = new game.HealthState();
		//this.addChild(this.healthState);
	} 

	p.removeLife = function () {
		this.submitTrigger('Perda de vida');
		this.healthState.removeHeart();
	}

	p.insertLife = function () {
		this.submitTrigger('Ganho de vida');
		this.healthState.insertHeart();
	}

	p.createScoreboard = function () {
		this.scoreboard = new game.Scoreboard();
		//this.addChild(this.scoreboard);
	}

	p.createContaianers = function () {
		this.asteroidContainer = new createjs.Container();
		this.asteroidContainer.setBounds(screen_width*.15, screen_height*.15, screen_width*.7, screen_height*.55);
		this.glueEnemyContainer = new createjs.Container();
		this.glueEnemyContainer.setBounds(screen_width*.15, screen_height*.15, screen_width*.7, screen_height*.55);
		this.PlayerContainer = new createjs.Container();
		this.explosionContainer = new createjs.Container();

		this.addChild(this.asteroidContainer, this.glueEnemyContainer, this.explosionContainer, this.PlayerContainer);
	}

	p.createPlanetGoal = function () {
		this.planet = new PlanetGoal(this.levelData.goal);
		//this.planet.cache(-128, -128, 512, 512);
		this.addChildAt(this.planet, 0);
	}

	p.createPlayer = function () {
		this.PlayerContainer.addChild(new Player(data.PlayerData.character));
		this.PlayerContainer.addChild(this.scoreboard);
		this.PlayerContainer.addChild(this.healthState);
		//staticStage.addChild(new Player(data.PlayerData.character));
	}

	p.createObjects = function () {
		while (this.numAsteroids < this.maxAsteroids) {
			var randomObject = Math.random() * 100;

			if(data.GameData.currentLevel == 1) {
				if(randomObject < 75) {
					var newerRandomObject = Math.random() * 100;
					if(newerRandomObject < 33) {
						this.createSpaceTrash('space_trash');
					} else if(newerRandomObject >= 33 && newerRandomObject < 66) {
						this.createSpaceTrash('anvil');
					} else {
						this.createSpaceTrash('bar');
					}
				} else {
					var newerRandomObject = Math.random() * 100;
					if(newerRandomObject < 50) {
						this.createEnemy();
					} else if (newerRandomObject >= 50 && newerRandomObject < 65) {
						var newnewerRandomObject = Math.random() * 100;
						if(newnewerRandomObject < 50) {
							this.createFlyingEnemy();
						} else {
							this.createStickingEnemy('meleca');
						}
					} else {
						if(this.temBomba == false) {
							this.temBomba = true;
							this.createBomb();
						}
					}
				}
			} else if(data.GameData.currentLevel > 1 && data.GameData.currentLevel < 5) {
				if(randomObject < 35) {
					this.createEnemy();
				} else if (randomObject >= 35 && randomObject < 50) {
					var newerRandomObject = Math.random() * 100;
					if(newerRandomObject < 25) {
						this.createSpaceTrash('space_trash');
					} else if(newerRandomObject >= 25 && newerRandomObject < 50) {
						this.createSpaceTrash('anvil');
					} else if(newerRandomObject >= 50 && newerRandomObject < 75) {
						this.createSpaceTrash('bar');
					} else {
						var newnewerRandomObject = Math.random() * 100;
						if(newnewerRandomObject < 50) {
							this.createFlyingEnemy();
						} else {
							if (data.GameData.currentLevel > 3) {
								this.createStickingEnemy('space_invader');
							} else {
								this.createStickingEnemy('meleca');
							}
						}
					}
				} else {
					var newrandomObject = Math.random() * 100;
					if(newrandomObject < 70) {
						if(this.temAliado == false) {
							this.temAliado = true;
							this.createAlly();
						}
					} else if(newrandomObject < 90) {
						if(this.temBomba == false) {
							this.temBomba = true;
							this.createBomb();
						}
					} else {
						this.createWatch();
					}
				}
			} else {
				if (randomObject < 15) {
					if(this.temAliado == false) {
						this.temAliado = true;
						this.createAlly();
					}
				} else {
					var newrandomObject = Math.random() * 100;
					if(newrandomObject < 50) {
						this.createEnemy();
					} else if(newrandomObject >= 50 && newrandomObject < 75) {
						var newerRandomObject = Math.random() * 100;
						if(newerRandomObject < 25) {
							this.createSpaceTrash('space_trash');
						} else if(newerRandomObject >= 25 && newerRandomObject < 50) {
							this.createSpaceTrash('anvil');
						} else if(newerRandomObject >= 50 && newerRandomObject < 75) {
							this.createSpaceTrash('bar');
						} else {
							var newnewerRandomObject = Math.random() * 100;
							if(newnewerRandomObject < 50) {
								this.createFlyingEnemy();
							} else {
								this.createStickingEnemy('robo');
							}
						}
					} else if(newrandomObject >= 75 && newrandomObject < 95) {
						if(this.temBomba == false) {
							this.temBomba = true;
							this.createBomb();
						}
					} else {
						var randomObject2 = Math.random() * 10;
						if(randomObject2 < 5) {
							if(this.healthState.life < 3) {
								this.createPowerUp();
							}
						}else{
							this.createSpeed();
						}
					}
				}
			}
		}
	}

	p.createPowerUp = function () {
		var powerUp;

		var speed = (Math.random() * .001) + this.speedRate/5;

		var numAllies = this.levelData.allies.length;
		var randomAlly = Math.floor(Math.random() * (numAllies-0.01));

		powerUp = new PowerUp(speed, this.levelData.allies[2]);

		powerUp.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		powerUp.x = (Math.random() * containerBounds.width) + containerBounds.x;
		powerUp.y = (Math.random() * containerBounds.height) + containerBounds.y;
		powerUp.on('click', this.onPowerUpClick, this);
		powerUp.on(powerUp.SIZE_EXEEDED, this.onAllySizeExceed, this);
		this.asteroidContainer.addChildAt(powerUp, 0);
		this.numAsteroids++;
	}

	p.createSpeed = function () {
		var powerUp;

		var speed = (Math.random() * .001) + this.speedRate/5;

		var numAllies = this.levelData.allies.length;
		var randomAlly = Math.floor(Math.random() * (numAllies-0.01));

		powerUp = new Speed(speed);

		powerUp.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		powerUp.x = (Math.random() * containerBounds.width) + containerBounds.x;
		powerUp.y = (Math.random() * containerBounds.height) + containerBounds.y;
		powerUp.on('click', this.onSpeedClick, this);
		powerUp.on(powerUp.SIZE_EXEEDED, this.onAllySizeExceed, this);
		this.asteroidContainer.addChildAt(powerUp, 0);
		this.numAsteroids++;
	}

	p.createEnemy = function () {
		var enemy;

		var speed = (Math.random() * .002) + this.speedRate;

		var numEnemies = this.levelData.enemies.length;
		var randomEnemy = Math.floor(Math.random() * (numEnemies-0.01));

		enemy = new Enemy(speed, this.levelData.enemies[randomEnemy]);
		enemy.score = randomEnemy;

		enemy.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		enemy.x = (Math.random() * containerBounds.width) + containerBounds.x;
		enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
		enemy.on('click', this.onAsteroidClick, this);
		enemy.on(enemy.SIZE_EXEEDED, this.onSizeExceed, this);
		this.asteroidContainer.addChildAt(enemy, 0);
		this.numAsteroids++;
	}

	p.createFlyingEnemy = function () {
		var enemy;

		var numEnemies = this.levelData.enemies.length;
		var randomEnemy = Math.floor(Math.random() * (numEnemies-0.01));

		enemy = new FlyingEnemy();
		enemy.score = randomEnemy * 5;

		//enemy.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		enemy.x = -200;
		enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
		enemy.on('click', this.onAsteroidClick, this);
		enemy.on(enemy.SIZE_EXEEDED, this.onSizeExceed, this);
		this.asteroidContainer.addChildAt(enemy, 0);
		this.numAsteroids++;
	}

	p.createStickingEnemy = function (tipo) {
		var enemy;

		var numEnemies = this.levelData.enemies.length;
		var randomEnemy = Math.floor(Math.random() * (numEnemies-0.01));

		enemy = new StickingEnemy(tipo);
		enemy.score = randomEnemy * 5;

		//enemy.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.glueEnemyContainer.getBounds();
		enemy.x = (Math.random() * containerBounds.width) + containerBounds.x;
		enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
		enemy.on('click', this.onStickingEnemyClick, this);
		enemy.on(enemy.SIZE_EXEEDED, this.onStickingEnemySizeExceed, this);
		enemy.on(enemy.GLUE, this.onGlue, this);
		this.glueEnemyContainer.addChildAt(enemy, 0);
		//stage.setChildIndex( displayObject, stage.getNumChildren()-1);
		this.numAsteroids++;
	}

	p.createSpaceTrash = function (tipo) {
		var enemy;

		var speed = (Math.random() * .002) + this.speedRate;

		var numEnemies = this.levelData.enemies.length;
		var randomEnemy = Math.floor(Math.random() * (numEnemies-0.01));

		enemy = new SpaceTrash(speed);
		enemy.tipo = tipo;
		enemy.initialize(speed);

		enemy.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		enemy.x = (Math.random() * containerBounds.width) + containerBounds.x;
		enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
		enemy.on('click', this.onTrashClick, this);
		enemy.on(enemy.SIZE_EXEEDED, this.onSizeExceed, this);
		//enemy.cache(-55, -60, 220, 240);
		this.asteroidContainer.addChildAt(enemy, 0);
		this.numAsteroids++;
	}

	p.createAnvil = function () {
		var enemy;

		var speed = (Math.random() * .002) + this.speedRate;

		var numEnemies = this.levelData.enemies.length;
		var randomEnemy = Math.floor(Math.random() * (numEnemies-0.01));

		enemy = new Anvil(speed, this.levelData.enemies[3]);

		enemy.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		enemy.x = (Math.random() * containerBounds.width) + containerBounds.x;
		enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
		enemy.on('click', this.onTrashClick, this);
		enemy.on(enemy.SIZE_EXEEDED, this.onSizeExceed, this);
		this.asteroidContainer.addChildAt(enemy, 0);
		this.numAsteroids++;
	}

	p.createWatch = function () {
		var enemy;
		var tempos = [5, 10, 15, 20, 25];
		
		var speed = Math.floor(Math.random() * (4 - 0) + 0);

		if(this.t > tempos[speed]) {
			enemy = new Watch(tempos[speed]);

			enemy.rotationSpeed = Math.random() * 2 - 1;
			var containerBounds = this.asteroidContainer.getBounds();
			enemy.x = (Math.random() * containerBounds.width) + containerBounds.x;
			enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
			enemy.on('click', this.onWatchClick, this);
			enemy.on(enemy.SIZE_EXEEDED, this.onWatchSizeExceed, this);
			this.asteroidContainer.addChildAt(enemy, 0);
			this.numAsteroids++;
		}
	}

	p.createBomb = function () {
		var enemy;

		var speed = (Math.random() * .002) + this.speedRate;

		var numEnemies = this.levelData.enemies.length;
		var randomEnemy = Math.floor(Math.random() * (numEnemies-0.01));

		enemy = new Bomba(speed, this.levelData.enemies[3]);

		enemy.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		enemy.x = (Math.random() * containerBounds.width) + containerBounds.x;
		enemy.y = (Math.random() * containerBounds.height) + containerBounds.y;
		enemy.on('click', this.onBombClick, this);
		enemy.on(enemy.SIZE_EXEEDED, this.onBombSizeExceed, this);
		this.asteroidContainer.addChildAt(enemy, 0);
		this.numAsteroids++;
	}

	p.createAlly = function () {
		var ally;

		var speed = (Math.random() * .001) + this.speedRate/5;

		var numAllies = this.levelData.allies.length;
		var randomAlly = Math.floor(Math.random() * (numAllies-0.01));

		ally = new Ally(speed, this.levelData.allies[randomAlly]);

		ally.rotationSpeed = Math.random() * 2 - 1;
		var containerBounds = this.asteroidContainer.getBounds();
		ally.x = (Math.random() * containerBounds.width) + containerBounds.x;
		ally.y = (Math.random() * containerBounds.height) + containerBounds.y;
		ally.on('click', this.onAllyClick, this);
		ally.on(ally.SIZE_EXEEDED, this.onAllySizeExceed, this);
		this.asteroidContainer.addChildAt(ally, 0);
		this.numAsteroids++;
	}

	p.createExplosion = function (x, y, scale) {
		var explosion = new Explosion(x, y, scale);
		explosion.on(explosion.EXPLOSION_COMPLETE, this.removeExplosion, this);
		this.explosionContainer.addChild(explosion);
		explosion.explode();
	}

	p.removeExplosion = function (e) {
		var explosion = e.target;
		this.removeLife();
		this.explosionContainer.removeChild(explosion);
		//this.healthState.life--;
	}

	p.createScoreBalloon = function (x, y, scale, score) {
		var scoreBalloon = new ScoreBalloon(x, y, scale, score);
		scoreBalloon.on(scoreBalloon.TWEEN_COMPLETE, this.removeScoreBalloon, this);
		this.explosionContainer.addChild(scoreBalloon);
	}

	p.removeScoreBalloon = function (e) {
		var scoreBalloon = e.target;

		this.explosionContainer.removeChild(scoreBalloon);
	}

	p.onAsteroidClick = function (e) {
		//this.startTime -= 10000;
		var asteroid = e.target;

		var asteroidScore;
		var randomObject = Math.random() * 100;
		if (asteroid.score == 0) {
			asteroidScore = 20;
		} else if (asteroid.score == 1) {
			asteroidScore = 30;
		} else if (asteroid.score == 2) {
			asteroidScore = 40;
		} else if (asteroid.score == 3) {
			asteroidScore = 50;
		} else {
			asteroidScore = 60;
		}

		//var asteroidScore = Math.round(asteroid.scale * 10);
		this.scoreboard.updateScore(asteroidScore);
		this.updateAsteroidsCount();
		this.createScoreBalloon(asteroid.x, asteroid.y, asteroid.scale, asteroidScore);
		createjs.Sound.play(game.assets.ASTEROID_DESTROYER);
		this.asteroidContainer.removeChild(asteroid);   	
		this.updateDifficult();
	}

	p.onStickingEnemyClick = function (e) {
		var asteroid = e.target;

		var asteroidScore = Math.round(asteroid.scale * 10);
		this.scoreboard.updateScore(asteroidScore);
		this.updateAsteroidsCount();
		this.createScoreBalloon(asteroid.x, asteroid.y, asteroid.scale, asteroidScore);
		createjs.Sound.play(game.assets.ASTEROID_DESTROYER);
		this.glueEnemyContainer.removeChild(asteroid);   	
		this.updateDifficult();
	}

	p.onTrashClick = function (e) {
		var asteroid = e.target;
		var asteroidScore = Math.round(asteroid.scale * 2.5);
		this.scoreboard.updateScore(asteroidScore);
		this.createScoreBalloon(asteroid.x, asteroid.y, asteroid.scale, asteroidScore);
		createjs.Sound.play(game.assets.ASTEROID_DESTROYER);
		this.updateAsteroidsCount();
		//asteroid.uncache();
		this.asteroidContainer.removeChild(asteroid);   	
		this.updateDifficult();
	}

	p.updateDifficult = function () {
		if (this.numAsteroidsDestroyed % 5 == 0) {
			this.speedRate += .00005;
		}
		if (this.numAsteroidsDestroyed % 50 == 0) {
			//this.speedRate = .0005;
			this.maxAsteroids++;
		}
	}

	p.onSizeExceed = function (e) {
		var asteroid = e.target;

		//this.removeLife();
		this.updateAsteroidsCount();
		this.createExplosion(asteroid.x, asteroid.y, asteroid.scale);
		//asteroid.uncache();
		// TODO - Danificar o vidro da nave
		// guardar em um novo container para que possa ser restaurado se o usuario recuperar vida

		this.asteroidContainer.removeChild(asteroid);
		this.updateDifficult();
	}

	p.onStickingEnemySizeExceed = function (e) {
		var asteroid = e.target;

		//this.removeLife();
		this.updateAsteroidsCount();
		this.createExplosion(asteroid.x, asteroid.y, asteroid.scale);
		//asteroid.uncache();
		// TODO - Danificar o vidro da nave
		// guardar em um novo container para que possa ser restaurado se o usuario recuperar vida

		this.glueEnemyContainer.removeChild(asteroid);
		this.updateDifficult();
	}

	p.onGlue = function (e) {
		var asteroid = e.target;
		var asteroidScore = -25;//Math.round(asteroid.scale * 2.5);
		this.scoreboard.updateScore(asteroidScore);
		this.createScoreBalloon(asteroid.x, asteroid.y, asteroid.scale, asteroidScore);
		//createjs.Sound.play(game.assets.ASTEROID_DESTROYER);
		//this.createScoreBalloon(asteroid.x, asteroid.y, asteroid.scale, asteroidScore);
		//createjs.Sound.play(game.assets.ASTEROID_DESTROYER);
		//this.asteroidContainer.removeChild(asteroid);   	
		//this.updateDifficult();
	}

	p.onAllyClick = function (e) {
		var ally = e.target;        
		this.temAliado = false;
		//this.removeLife();
		this.updateAsteroidsCount();
		this.createExplosion(ally.x, ally.y, ally.scale);
		this.asteroidContainer.removeChild(ally);
		this.updateDifficult();
	}

	p.onPowerUpClick = function (e) {
		var ally = e.target;        
		this.insertLife();
		this.updateAsteroidsCount();

		this.asteroidContainer.removeChild(ally);
		this.healthState.life++;
		this.submitTrigger('Ganho de vida');
	}

	p.onSpeedClick = function (e) {
		var ally = e.target;
		//this.planet.scaleRate += 0.001;
		//this.planet.velY += 0.1;
		this.updateAsteroidsCount();

		this.asteroidContainer.removeChild(ally);
	}

	p.onWatchClick = function (e) {
		var ally = e.target;
		this.updateAsteroidsCount();
		this.asteroidContainer.removeChild(ally);
	}

	p.onBombClick = function (e) {
		var ally = e.target;
		this.updateAsteroidsCount();
		this.asteroidContainer.removeChild(ally);
		this.temBomba = false;
	}

	p.onAllySizeExceed = function (e) {
		var ally = e.target;

		this.updateAsteroidsCount();
		ally.removeAllEventListeners();
		//this.removeObjectFromContainer(e);
		createjs.Tween.get(ally).to({x: screen_width/2, y: screen_height}, 400).call(this.onAllyCompleteAnimation, null, this);
		this.temAliado = false;
	}

	p.onBombSizeExceed = function (e) {
		var ally = e.target;

		this.updateAsteroidsCount();
		ally.removeAllEventListeners();
		//this.removeObjectFromContainer(e);
		createjs.Tween.get(ally).to({x: screen_width/2, y: screen_height}, 400).call(this.onBombCompleteAnimation, null, this);
	}

	p.onBombCompleteAnimation = function (e) {
		//this.asteroidContainer.removeChild(ally);
		//this.updateDifficult();

		this.bombButton = new createjs.Bitmap('assets/cenario_painel_f_botaobomba.png');
		this.bombButton.on('click', this.explodeAll, this);
		this.bombButton.scaleX = 1.15; this.bombButton.scaleY = 1.15;
		this.bombButton.x = 475; this.bombButton.y = 590;

		this.addChild(this.bombButton);
	}

	p.explodeAll = function (e) {
		this.submitTrigger('Uso de bomba');
		this.createHarmlessExplosion(300, 300, 2.5);
		this.createHarmlessExplosion(100, 150, 1.25);
		this.createHarmlessExplosion(100, 525, 1.25);
		this.createHarmlessExplosion(500, 200, 1.25);
		this.asteroidContainer.removeAllChildren();
		this.glueEnemyContainer.removeAllChildren();
		this.numAsteroids = 0;
		this.temBomba = false;
		this.removeChild(this.bombButton);
		this.bombButton = null;
	}

	p.createHarmlessExplosion = function (x, y, scale) {
		var explosion = new Explosion(x, y, scale);
		explosion.on(explosion.EXPLOSION_COMPLETE, this.removeHarmlessExplosion, this);
		this.explosionContainer.addChild(explosion);
		explosion.explode();
	}

	p.removeHarmlessExplosion = function (e) {
		var explosion = e.target;

		this.explosionContainer.removeChild(explosion);
	}

	p.onAllyCompleteAnimation = function (e) {
		var ally = e.target;
		var allyScore = 300;//ally.data.score;
		this.temAliado = false;
		this.scoreboard.updateScore(allyScore);
		this.createScoreBalloon(screen_width/2, screen_height*.7, 1.3, allyScore);
		this.asteroidContainer.removeChild(ally);
		this.updateDifficult();
		this.submitTrigger('Resgate');
	}

	p.onWatchSizeExceed = function (e) {
		var ally = e.target;
		ally.removeAllEventListeners();
		//this.createScoreBalloon(screen_width/2, screen_height*.7, 1.3, allyScore);
		createjs.Tween.get(ally).to({x: screen_width/2, y: screen_height}, 400).call(this.onWatchCompleteAnimation, null, this);
		this.updateAsteroidsCount();
		//this.updateDifficult();
	}

	p.onWatchCompleteAnimation = function (e) {
		var ally = e.target;
		//this.tempoDaFase += ally.score;
		
		this.startTime += ally.score;

		//this.createScoreBalloon(screen_width/2, screen_height*.7, 1.3, allyScore);
		this.asteroidContainer.removeChild(ally);
		//this.updateDifficult();
	}

	p.updateAsteroidsCount = function () {
		this.numAsteroids--;
		this.numAsteroidsDestroyed++;
	}

	p.update = function () {
		if (this.numAsteroids < this.maxAsteroids) {
			this.createObjects();
		}
		if(this.rotacaoMao == true) {
			this.maoEsquerda.x ++;
			if(this.maoEsquerda.x > 100 + 10) {
				this.rotacaoMao = false;
			}
		} else {
			this.maoEsquerda.x --;
			if(this.maoEsquerda.x < 100) {
				this.rotacaoMao = true;
			}
		}
	}

	p.render = function () {
	}

	p.checkGame = function (tickEvent) {
		if (this.healthState.life <= 0) {
			this.updateScore();
			this.healthState.life = 0;
			game.asteroidsDestroyed = this.numAsteroidsDestroyed;
			data.PlayerData.lives = this.healthState.life;
			//this.tempoLevado = parseInt((tickEvent.time - this.startTime) / 1000);
			data.PlayerData.time = parseInt((tickEvent.time - this.startTime) / 1000);
			//this.tempo.text = '00:' + t;
			this.dispose();
			this.dispatchEvent(game.GameStateEvents.GAME_OVER);
		}
		if (tickEvent.time > this.tempoDaFase + this.startTime){
			// TODO - substituir por scene de level complete
			this.updateScore();
			game.asteroidsDestroyed = this.numAsteroidsDestroyed;
			data.PlayerData.lives = this.healthState.life;
			data.PlayerData.time = this.tempoDaFase;//parseInt((tickEvent.time - this.startTime) / 1000);
			this.dispose();
			if(data.GameData.currentLevel == 5) {
				this.dispatchEvent(game.GameStateEvents.REALLY_OVER);
			} else {
				this.dispatchEvent(game.GameStateEvents.LEVEL_COMPLETE);
			}
		}
	}

	p.updateScore = function () {
		//if(this.scoreboard.getScore() < 0) {
			//data.GameData.currentLevelScore = 0;
			//this.scoreboard.clearScore();
		//} else {
			data.GameData.currentLevelScore = this.scoreboard.getScore();//////////////////A UNICA LINHA NECESSARIA
		//}
	}

	p.dispose = function () {
		createjs.Sound.stop();
		//this.planet.uncache();
		//createjs.Sound.removeSound(game.assets.SOUNDTRACK);
		this.removeAllChildren();
	}

	p.run = function (tickEvent) {
		if(this.comecou) {
			if (this.startTime == null) {
				this.startTime = tickEvent.time;
			}
			this.update();
			this.t = parseInt((tickEvent.time - this.startTime) / 1000);
			this.tempo.text = '00:' + this.t;
			//this.render();
			this.checkGame(tickEvent);
		}
	}

	p.submitTrigger = function (trigger_name) {
		var that = this;

		var s_user_id = data.PlayerData.userID;	
		var s_level = data.GameData.currentLevel;
		var s_trigger = trigger_name;				

		var url_web = "webservice/addTrigger.php";
		var url_tablet = "http://fisiogames.com/resgate/webservice/addTrigger.php";
		
		$.ajax({
			url:url_web,
			type:"POST",
			data:{user_id:s_user_id, level:s_level, trigger:trigger_name}            
		})
		.done(function(result, textStatus, jqXHR ) {
			console.log(result);			
		})
		.fail(function(textStatus, jqXHR, errorThrow) {   
			console.log("fail, erro ao adicionar trigger");
		});
	}

	window.game.Game = Game;

}(window));