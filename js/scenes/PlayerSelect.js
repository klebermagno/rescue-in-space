(function (window) {

	window.game = window.game || {}

	function PlayerSelect() {
		this.initialize();
	}

	var p = PlayerSelect.prototype = new createjs.Container();

	p.PADDING = 15;

	p.Container_initialize = p.initialize;
	p.selectContainer = null;
	p.unlockedLevel = null;
	p.currentLevel = 1;

	p.male = null;
	p.male2 = null;
	p.female = null;
	p.female2 = null;

	p.initialize = function () {
		this.Container_initialize();
		this.createLevelContainer();
		this.addPlayers();
	}

	p.createLevelContainer = function() {
		this.selectContainer = new createjs.Container();
		//this.selectContainer.x = screen_width*.10;
		//this.selectContainer.y = screen_height*.10;
		this.addChild(this.selectContainer);
	}

	p.addPlayers = function () {
		var scale = 1.8;

		var fundo = new createjs.Bitmap('assets/tela_escolhapersonagem.png');

		this.male = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,215,365));
		this.male.alpha = 0.01;
		this.male.x = 35;
		this.male.y = 250;
		this.male.on('click', this.mainMenu, this, true, {player:'male'});
		//this.male.cache(-72.5, -128, 290, 512);
		this.addChild(this.male);

		this.female = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0,0,200,365));
		this.female.alpha = 0.01;
		this.female.x = 365;
		this.female.y = 250;
		this.female.on('click', this.mainMenu, this, true, {player:'female'});
		//this.female.cache(-70, -125, 280, 500);
        this.addChild(this.female);

		this.selectContainer.addChild(fundo, this.male, this.female);
	}

	p.onStateEvent = function (e, obj) {
		this.changeState(obj.state);
	}

	p.mainMenu = function (e, obj) {
		data.PlayerData.character = obj.player;
		this.registerUser();
		this.dispatchEvent(game.GameStateEvents.LEVEL_CHOICE);
	}

	p.dispose = function () {
		this.male.uncache();
		this.female.uncache();
		this.removeAllChildren();
	}

	window.game.PlayerSelect = PlayerSelect;

	p.registerUser = function () {//e) {
		var that = this;
		//var username = $("#username").val();
		var s_name = data.PlayerData.name;
		var s_gender;
		var s_id;
		if (data.PlayerData.character == 'male'){
			s_gender = 'M';
		} else {
			s_gender = 'F';
		}

		var url_web = "webservice/registerUser.php";
		var url_tablet = "http://fisiogames.com/resgate/webservice/registerUser.php";
		
		$.ajax({
			url:url_web,
			type:"POST",
			data:{name:s_name,gender:s_gender}            
		})
		.done(function(result, textStatus, jqXHR ) {
			// \TODO
			//colocar o result que é o id do usuario atual em uma variavel que dure para ao final de cada fase postar sua pontuacao.
			//console.log(result);
			s_id = result;
			data.PlayerData.userID = s_id;
			that.dispose();
			that.dispatchEvent(game.GameStateEvents.RANK);
		})
		.fail(function(textStatus, jqXHR, errorThrow) {   
			console.log("fail, erro ao registrar jogador");
			data.PlayerData.userID = 1;//s_id;
			that.dispose();
			that.dispatchEvent(game.GameStateEvents.RANK);
		});

	}

}(window));