(function (window) {

	window.game = window.game || {}

	function LevelComplete() {
		this.initialize();
	}

	var p = LevelComplete.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.formDOMElement = null;

	p.initialize = function () {
		this.Container_initialize();
		var fundo;
		if(data.PlayerData.character == 'male') {
			fundo = new createjs.Bitmap('assets/tela_pontuacao_m.png');
		} else {
			fundo = new createjs.Bitmap('assets/tela_pontuacao_f.png');
		}
		stage.addChild(fundo);

		this.updateLevel();
		this.updateScore();
		this.submitScore();
		this.addMessage();
	}

	p.updateLevel = function () {
		/*if (data.GameData.currentLevel == data.PlayerData.level) {
			if (data.PlayerData.level < data.GameData.levelData.length) {
				data.PlayerData.level += 1;
			}
		}*/
		data.PlayerData.level = data.GameData.currentLevel + 1;
	}

	p.updateScore = function () {
		if (data.GameData.levelData[data.GameData.currentLevel-1].bestScore < data.GameData.currentLevelScore) {
			data.GameData.levelData[data.GameData.currentLevel-1].bestScore = data.GameData.currentLevelScore;
		}
	}

	p.addMessage = function () {
		var lvlCompleteMsg;
		scoreWidth = String(data.PlayerData.name).length * 30;
		lvlCompleteMsg = new createjs.Text(data.PlayerData.name, "28px KristenITC-Regular", "#fff");
		//lvlCompleteMsg.regX = lvlCompleteMsg.getMeasuredWidth() / 2;
		//lvlCompleteMsg.regY = lvlCompleteMsg.getMeasuredHeight() / 2;
		lvlCompleteMsg.x = screen_width / 2 - scoreWidth / 2;
		lvlCompleteMsg.y = (screen_height / 3) + 330;
		lvlCompleteMsg.alpha = 0;
		createjs.Tween.get(lvlCompleteMsg).to({alpha: 1}, 500).call(this.addScore, null, this);
		this.addChild(lvlCompleteMsg);
	}

	p.addScore = function () {
		var scoreWidth;

		scoreWidth = String(data.GameData.currentLevelScore).length * 23;
		this.scoreTxt = new createjs.Text(String(data.GameData.currentLevelScore), "40px KristenITC-Regular", "#fff");
		this.scoreTxt.x = screen_width / 2 - scoreWidth / 2;
		this.scoreTxt.y = (screen_height / 3) + 260;
		this.scoreTxt.alpha = 0;
		createjs.Tween.get(this.scoreTxt).to({alpha: 1}, 500).call(this.addButtons, null, this);
		this.addChild(this.scoreTxt);
	}

	p.addButtons = function () {
		var playBtn, menuBtn, form;

		//this.addChild(this.formDOMElement);
		//createjs.Tween.get(this.formDOMElement).to({alpha:1}, 1000, createjs.Ease.cubicOut).call(this.tweenComplete, null, this);        

		playBtn = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,160,50));
		playBtn.alpha = 0.01;
		playBtn.on('click', this.playAgain, this);
		playBtn.cache(-80, -25, 320, 100);
		playBtn.x = 220; playBtn.y = 620;

		nextBtn = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,160,50));
		nextBtn.alpha = 0.01;
		nextBtn.on('click', this.nextLevel, this);
		nextBtn.cache(-80, -25, 320, 100);
		nextBtn.x = 384; nextBtn.y = 620;

		menuBtn = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,160,50));
		menuBtn.alpha = 0.01;
		menuBtn.on('click', this.mainMenu, this);
		//menuBtn.cache(-80, -25, 320, 100);
		menuBtn.x = 48; menuBtn.y = 620;

		//playBtn.alpha = menuBtn.alpha = nextBtn.alpha = 0;     
		//playBtn.x = menuBtn.x = nextBtn.x = screen_width / 2;        

		this.addChild(playBtn, nextBtn, menuBtn);
	}

	p.tweenComplete = function() {
		this.removeChild(this.formDOMElement);
	}

	p.submitScore = function (e) {
		var that = this;

		var s_user_id = data.PlayerData.userID;
		var s_point = data.GameData.currentLevelScore;
		var s_level = (data.PlayerData.level - 1); // ou data.GameData.currentLevel
		var s_life = data.PlayerData.lives;
		var s_level_completed = 1;
		var s_time_elapsed = 60;

		var url_web = "webservice/addScore.php";
		var url_tablet = "http://fisiogames.com/resgate/webservice/addScore.php";

		$.ajax({
			url:url_web,
			type:"POST",
			data:{user_id:s_user_id,point:s_point,level:s_level,life:s_life,level_completed:s_level_completed,time_elapsed:s_time_elapsed}            
		})
		.done(function(result, textStatus, jqXHR ) {
			//console.log(result);
			//that.dispose();
			//that.dispatchEvent(game.GameStateEvents.RANK);
		})
		.fail(function(textStatus, jqXHR, errorThrow) {
			console.log("fail, erro ao adicionar score");
		});
	}

	p.playAgain = function (e) {
		this.dispose();
		this.dispatchEvent(game.GameStateEvents.GAME);
	}

	p.nextLevel = function (e) {
		data.GameData.currentLevel = data.PlayerData.level;
		this.dispose();
		this.dispatchEvent(game.GameStateEvents.GAME);
	}

	p.mainMenu = function (e) {
		this.dispose();
		this.dispatchEvent(game.GameStateEvents.LEVEL_CHOICE);
	}

	p.dispose = function () {
		$("#submitform").attr("style", "opacity: 0;visibility: hidden;");
		this.removeAllChildren();
	}

	window.game.LevelComplete = LevelComplete;

}(window));