<?php
header("Content-Type:text/html; charset=utf-8");

$user_id = $_POST['user_id'];
$level = $_POST['level'];
$trigger = $_POST['trigger'];

if ($user_id	) {
	require_once('mysqli.php');

	$response = '';
		
	$sql = "INSERT INTO `triggers` ( `level`, `trigger`, `user_id`) VALUES (".$level.",'".$trigger."',".$user_id.")";
				
	if ($MySQLi->query($sql) == true) {
		$response .= "&id=".$MySQLi->insert_id;
	} else {
		$response .= "&error=3&error_desc=Erro ao inserir trigger no banco.".$sql;
	}

	echo $response;
} else {
	echo 'Você está tentando trapacear?!?';
}
?>