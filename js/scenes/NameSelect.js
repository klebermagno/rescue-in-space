(function (window) {

	window.game = window.game || {}

	function NameSelect() {
		this.initialize();
	}

	var p = NameSelect.prototype = new createjs.Container();

	p.PADDING = 15;

	p.Container_initialize = p.initialize;
	p.selectContainer = null;
	p.unlockedLevel = null;
	p.currentLevel = 1;

	p.male = null;
	p.female = null;

	//10
	//10
	//7

	p.letras = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
	p.botoes = [null];

	p.bmpTexto = null;
	p.texto = "";

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
		var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(0, 0, 59, 59);

		var fundo = new createjs.Bitmap('assets/bg.png');

		var label = new createjs.Text("Seu nome:", "50px KristenITC-Regular", "#ededed");
		label.textBaseline = "middle";
		label.textAlign = "center";
		label.x = screen_width/2;
		label.y = 75;

		//NAME
		this.bmpTexto = new createjs.Text(this.texto, "50px KristenITC-Regular", "#ededed");
		this.bmpTexto.textBaseline = "middle";
		this.bmpTexto.textAlign = "center";
		this.bmpTexto.x = screen_width/2;
		this.bmpTexto.y = 175;

		var menuBtn = new createjs.Bitmap('assets/menu_botao_jogar.png');
		menuBtn.on('click', this.mainMenu, this);
		menuBtn.x = (screen_width/2) - 135; menuBtn.y = 500;

		var teclado = new createjs.Bitmap('assets/teclado.png');
		//teclado.scaleX = .9;
		//teclado.scaleY = .9;
		teclado.x = 6;
		teclado.y = 256;

		for(var i = 0; i < 10; i++) {
			this.botoes[i] = new createjs.Shape(graphics);
			this.botoes[i].id = this.letras[i];
			this.botoes[i].x = 4 + (i * 59);
			this.botoes[i].y = 256;
			this.botoes[i].alpha = 0.01;
			//this.botoes[i].hitArea = new createjs.Shape(graphics);
			this.botoes[i].on('click', this.adicionaLetra, this, false);
			//this.botoes[i].cache(-32, -32, 128, 128);
			this.selectContainer.addChild(this.botoes[i]);
		}

		for(var i = 0; i < 10; i++) {
			this.botoes[10 + i] = new createjs.Shape(graphics);
			this.botoes[10 + i].id = this.letras[10 + i];
			this.botoes[10 + i].x = 4 + (i * 59);
			this.botoes[10 + i].y = 256 + 59;
			this.botoes[10 + i].alpha = 0.01;
			//this.botoes[10 + i].hitArea = new createjs.Shape(graphics);
			this.botoes[10 + i].on('click', this.adicionaLetra, this, false);
			//this.botoes[10 + i].cache(-32, -32, 128, 128);
			this.selectContainer.addChild(this.botoes[10 + i]);
		}

		for(var i = 0; i < 7; i++) {
			this.botoes[20 + i] = new createjs.Shape(graphics);
			this.botoes[20 + i].id = this.letras[20 + i];
			this.botoes[20 + i].x = 4 + 56 + 32 + (i * 59);
			this.botoes[20 + i].y = 256 + 59 + 59;
			this.botoes[20 + i].alpha = 0.01;
			//this.botoes[20 + i].hitArea = new createjs.Shape(graphics);
			this.botoes[20 + i].on('click', this.adicionaLetra, this, false);
			//this.botoes[20 + i].cache(-32, -32, 128, 128);
			this.selectContainer.addChild(this.botoes[20 + i]);
		}

		var borracha = new createjs.Bitmap('assets/Borracha.png');
		borracha.on('click', this.removeLetra, this, false);
		borracha.x = screen_width - 59 - 8;
		borracha.y = 256 + 59 + 60;

		this.selectContainer.addChild(/*fundo,*/ teclado, label, this.bmpTexto, menuBtn, borracha);
	}

	p.adicionaLetra = function (e) {
		if(this.texto.length < 10) {
			this.texto += e.target.id;
			this.bmpTexto.text = this.texto;
		}
	}

	p.removeLetra = function (e) {
		if(this.texto.length > 0) {
			this.texto = this.texto.substr(0, this.texto.length-1);
			this.bmpTexto.text = this.texto;
		}
	}

	p.onStateEvent = function (e, obj) {
		this.changeState(obj.state);
	}

	p.mainMenu = function (e, obj) {
		data.PlayerData.name = this.texto;
		this.dispatchEvent(game.GameStateEvents.PLAYER_CHOICE);
	}

	p.dispose = function () {
		this.removeAllChildren();
	}

	window.game.NameSelect = NameSelect;

}(window));