(function () {

	window.game = window.game || {};

	var GameStates = {
		RUN_SCENE:0,
		MAIN_MENU:10,
		PLAYER_CHOICE:20,
		NAME_CHOICE:30,
		LEVEL_CHOICE:40,
		GAME:50,
		LEVEL_COMPLETE:60,
		GAME_OVER:70,
		RANK:80,
		REALLY_OVER:90
	}

	var GameStateEvents = {
		MAIN_MENU:'main menu event',
		MAIN_MENU_SELECT:'game menu select event',
		PLAYER_CHOICE:'player choice envet',
		NAME_CHOICE:'name choice event',
		LEVEL_CHOICE:'level choice envet',
		GAME:'game event',
		LEVEL_COMPLETE:'level complete envet',
		GAME_OVER:'game over event',
		RANK:'rank event',
		REALLY_OVER:'really over'
	}

	window.game.GameStates = GameStates;
	window.game.GameStateEvents = GameStateEvents;

}());
