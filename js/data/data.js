(function () {

	window.data = window.data || {};

	var EnemyData = {};
	var AllyData = {};
	var PowerUpData = {};
	var GameData = {};
	var PlayerData = {};
	var GoalData = {};

	EnemyData = {
		lvl1_asteroid1: {
			frame:'objeto_p1_asteroide1'
		},
		lvl1_asteroid2: {
			frame:'objeto_p1_asteroide2'
		},
		lvl1_asteroid3: {
			frame:'objeto_p1_asteroide3'
		},
		lvl1_asteroid4: {
			frame:'objeto_p1_asteroide4'
		},
		lvl1_asteroid5: {
			frame:'objeto_p1_asteroide5'
		},
		lvl2_asteroid1: {
			frame:'objeto_p2_asteroide1'    
		},
		lvl2_asteroid2: {
			frame:'objeto_p2_asteroide2'
		},
		lvl2_asteroid3: {
			frame:'objeto_p2_asteroide3'
		},
		lvl2_asteroid4: {
			frame:'objeto_p2_asteroide4'
		},
		lvl2_asteroid5: {
			frame:'objeto_p2_asteroide5'
		},
		lvl3_asteroid1: {
			frame:'objeto_p3_asteroide1'    
		},
		lvl3_asteroid2: {
			frame:'objeto_p3_asteroide2'
		},
		lvl3_asteroid3: {
			frame:'objeto_p3_asteroide3'
		},
		lvl3_asteroid4: {
			frame:'objeto_p3_asteroide4'
		},
		lvl3_asteroid5: {
			frame:'objeto_p3_asteroide5'
		},
		lvl4_asteroid1: {
			frame:'objeto_p4_asteroide1'
		},
		lvl4_asteroid2: {
			frame:'objeto_p4_asteroide2'
		},
		lvl4_asteroid3: {
			frame:'objeto_p4_asteroide3'
		},
		lvl4_asteroid4: {
			frame:'objeto_p4_asteroide4'
		},
		lvl4_asteroid5: {
			frame:'objeto_p4_asteroide5'
		},
		lvl5_asteroid1: {
			frame:'objeto_p5_asteroide1'
		},
		lvl5_asteroid2: {
			frame:'objeto_p5_asteroide2'
		},
		lvl5_asteroid3: {
			frame:'objeto_p5_asteroide3'
		},
		lvl5_asteroid4: {
			frame:'objeto_p5_asteroide4'
		},
		lvl5_asteroid5: {
			frame:'objeto_p5_asteroide5'
		},

		bar: {
			frame:'objeto_barra'
		},
		anvil: {
			frame:'objeto_bigorna'
		},
		gold_asteroid: {
			frame:'objeto_meteouro'
		},
	};

	EnemyData.exemplo = {
		frame:'gold',
		maxHP:15,
		weakness:'fire',
		power:8,
		defense:4,
		reward:10
	};

	AllyData = {
		astronaut: {
			frame:'npc_astronauta1',
			score:30
		},
		astronaut_dog: {
			frame:'npc_cao',
			score:30
		},
		spacecraft: {
			frame:'objeto_nave',
			score:30
		},
	};

	PowerUpData = {
		fuel: {
			frame:'objeto_combustivel'
		},
		life: {
			frame:'objeto_vida'
		},
		bomb: {
			frame:'objeto_bomba'
		},
	};

	GoalData = {
		lvl1_goal: {
			frame:'objeto_p1'
		},
		lvl2_goal: {
			frame:'objeto_p2'
		},
		lvl3_goal: {
			frame:'objeto_p3'
		},
		lvl4_goal: {
			frame:'objeto_p4'
		},
		lvl5_goal: {
			frame:'objeto_p5'
		},
	};

	GameData = {
		currentLevelScore:0,
		currentLevel:1,
	}
	GameData.levelData = [
	{

			goal:'lvl1_goal',
			enemies:[
				'lvl1_asteroid1',
				'lvl1_asteroid2',
				'lvl1_asteroid3',
				'lvl1_asteroid4',
				'lvl1_asteroid5'
			],
			powerups:[
				'fuel',
				'life',
				'bomb'
			],
			allies:[
				'astronaut',
				'astronaut_dog',
				'spacecraft'
			],
			maxEnemys:3,
			time:60000,
			bestScore:0,
		},
		{
			goal:'lvl2_goal',
			enemies:[
				'lvl2_asteroid1',
				'lvl2_asteroid2',
				'lvl2_asteroid3',
				'lvl2_asteroid4',
				'lvl2_asteroid5'
			],
			powerups:[
				'fuel',
				'life',
				'bomb'
			],
			allies:[
				'astronaut',
				'astronaut_dog',
				'spacecraft'
			],
			maxEnemys:4,
			time:60000,
			bestScore:0,
		},
		{
			goal:'lvl3_goal',
			enemies:[
				'lvl3_asteroid1',
				'lvl3_asteroid2',
				'lvl3_asteroid3',
				'lvl3_asteroid4',
				'lvl3_asteroid5'
			],
			powerups:[
				'fuel',
				'life',
				'bomb'
			],
			allies:[
				'astronaut',
				'astronaut_dog',
				'spacecraft'
			],
			maxEnemys:4,
			time:60000,
			bestScore:0,
		},
		{
			goal:'lvl4_goal',
			enemies:[
				'lvl4_asteroid1',
				'lvl4_asteroid2',
				'lvl4_asteroid3',
				'lvl4_asteroid4',
				'lvl4_asteroid5'
			],
			powerups:[
				'fuel',
				'life',
				'bomb'
			],
			allies:[
				'astronaut',
				'astronaut_dog',
				'spacecraft'
			],
			maxEnemys:5,
			time:60000,
			bestScore:0,
		},
		{
			goal:'lvl5_goal',
			enemies:[
				'lvl5_asteroid1',
				'lvl5_asteroid2',
				'lvl5_asteroid3',
				'lvl5_asteroid4',
				'lvl5_asteroid5'
			],
			powerups:[
				'fuel',
				'life',
				'bomb'
			],
			allies:[
				'astronaut',
				'astronaut_dog',
				'spacecraft'
			],
			maxEnemys:6,
			time:60000,
			bestScore:0,
		},
	];

	PlayerData = {
		level:1,
		character:'male',
		score:0,
		name:'',
		userID:-1,
		lives:3,
		time:0,
	}

	PlayerData.male = {
		character:'personagem_f',
		hand:'cenario_maos_m',
		spacecraft:'cenario_painel_m'
	}

	PlayerData.female = {
		character:'personagem_f',
		hand:'cenario_maos_f',
		spacecraft:'cenario_painel_f'
	}

	window.data.EnemyData = EnemyData;
	window.data.AllyData = AllyData;
	window.data.PowerUpData = PowerUpData;
	window.data.GameData = GameData;
	window.data.GoalData = GoalData;
	window.data.PlayerData = PlayerData;

}());