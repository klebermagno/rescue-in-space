<?php
	header("Content-Type:text/html; charset=utf-8");
	require_once('mysqli.php');

	$sql = "SELECT name, score FROM `score` ORDER BY `score` DESC LIMIT 10;";
	// Executa a consulta OU mostra uma mensagem de erro
	$cursor = $MySQLi->query($sql) OR trigger_error($MySQLi->error, E_USER_ERROR); 	

	$players = array();		
	while ($row = $cursor->fetch_object()) {
		$player = array();
		
		$player["name"] = utf8_encode($row->name);
		$player["score"] = $row->score;
		
		$players[] = $player; 
	}
	$cursor->free();
	
	//header('Content-Type: application/json; charset=utf-8');
	echo json_encode($players);
	//echo $players;
?>
	