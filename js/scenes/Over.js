(function (window) {

	window.game = window.game || {}

	function Over() {
		this.initialize();
	}

	var p = Over.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.formDOMElement = null;

	p.initialize = function () {
		this.Container_initialize();       
		var fundo = new createjs.Bitmap('assets/tela_fimdejogo.png');
		stage.addChild(fundo);
		createjs.Sound.play(game.assets.GAMEOVER_SOUND);

		this.updateScore();		
		this.addMessage();
		this.addButtons();
		this.submitScore();
	}

	p.updateScore = function () {
		if (data.GameData.levelData[data.GameData.currentLevel-1].bestScore < data.GameData.currentLevelScore) {
			data.GameData.levelData[data.GameData.currentLevel-1].bestScore = data.GameData.currentLevelScore;
			data.GameData.levelData[data.GameData.currentLevel-1].bestTime = data.GameData.currentLevelTime;
		}
	}

	p.addMessage = function () {
		var gameOverMsg;
		gameOverMsg = new createjs.Text("", "30px Arial", "#ff7700");
		//gameOverMsg.textBaseline = "middle";
		//gameOverMsg.textAlign = "center";
		gameOverMsg.regX = gameOverMsg.getMeasuredWidth() / 2;
		gameOverMsg.regY = gameOverMsg.getMeasuredHeight() / 2;
		gameOverMsg.x = screen_width / 2;
		gameOverMsg.y = screen_height / 3;
		gameOverMsg.scaleX = gameOverMsg.scaleY = 0;
		createjs.Tween.get(gameOverMsg).to({scaleX:1, scaleY:1, rotation:360}, 500).call(this.addScore, null, this);
		this.addChild(gameOverMsg);
	}

	p.addScore = function () {
		var scoreWidth;

		scoreWidth = String(data.GameData.currentLevelScore).length * 23;
		this.scoreTxt = new createjs.BitmapText(String(data.GameData.currentLevelScore), numbersheet);
		this.scoreTxt.x = screen_width / 2 - scoreWidth / 2;
		this.scoreTxt.y = screen_height / 3 + 30;
		this.scoreTxt.alpha = 0;     
		createjs.Tween.get(this.scoreTxt).to({alpha: 1}, 500).call(this.addButtons, null, this);
		//this.addChild(this.scoreTxt);
	}

	p.addButtons = function () {
		var shape = new createjs.Shape(new createjs.Graphics().beginFill("#f00000").drawRect(0,0,330,105));
		shape.alpha = 0.01;
		shape.x = (screen_width / 2) - 160;
		shape.y = (screen_height / 2) - 130;
		shape.on('click', this.playAgain, this);
		this.addChild(shape);

		var shape2 = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,330,105));
		shape2.alpha = 0.01;
		shape2.x = (screen_width / 2) - 160;
		shape2.y = (screen_height / 2);
		shape2.on('click', this.mainMenu, this);
		this.addChild(shape2);

		/*var playBtn, menuBtn;

		//createjs.Tween.get(this.formDOMElement).to({alpha:1}, 1000, createjs.Ease.cubicOut).call(this.tweenComplete, null, this);

		playBtn.alpha = menuBtn.alpha = 0;     
		playBtn.x = menuBtn.x = screen_width / 2;

		this.addChild(playBtn, menuBtn);
		createjs.Tween.get(playBtn).to({alpha:1}, 1000, createjs.Ease.cubicOut);
		createjs.Tween.get(menuBtn).to({alpha:1}, 1000, createjs.Ease.cubicOut);*/
	}

	p.tweenComplete = function() {
		this.removeChild(this.formDOMElement);
	}
/*
	p.submitScore = function (e) {
		var that = this;

		var s_user_id = 1;//data.PlayerData.userID;
		var s_point = 10;//data.GameData.currentLevelScore;
		var s_level = 10;//data.PlayerData.level;
		var s_life = 10;//data.PlayerData.lives;

		$.ajax({
			url:"http://fisiogames.com/resgate/webservice/addScore.php",
			type:"POST",
			data:{user_id:s_user_id,point:s_point,level:s_level,life:s_life}            
		})
		.done(function(result, textStatus, jqXHR ) {
			console.log(result);
			//that.dispose();
			//that.dispatchEvent(game.GameStateEvents.RANK);
		})
		.fail(function(textStatus, jqXHR, errorThrow) {   
			console.log("fail, erro ao adicionar score");
		});

		/*var username = $("#username").val();
		$.ajax({
			url:"http://fisiogames.com/resgate/webservice/addScore.php",
			type:"POST",
			data:{name:username, score:game.score, destroyed:game.asteroidsDestroyed}
		})
	}
	*/
	
	
	p.submitScore = function (e) {
		var that = this;

		//console.log(Game.tempoLevado);

		var s_user_id = data.PlayerData.userID;
		var s_point = data.GameData.currentLevelScore;
		var s_level = data.GameData.currentLevel;
		var s_life = data.PlayerData.lives;
		var s_level_completed = 0;
		var s_time_elapsed = data.PlayerData.time;

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

	p.mainMenu = function (e) {
		this.dispose();
		this.dispatchEvent(game.GameStateEvents.LEVEL_CHOICE);
	}

	p.dispose = function () {
		$("#submitform").attr("style", "opacity: 0;visibility: hidden;");
		this.removeAllChildren();
	}
	window.game.Over = Over;

}(window));