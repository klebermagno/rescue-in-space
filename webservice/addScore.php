<?php
header("Content-Type:text/html; charset=utf-8");

$user_id = $_POST['user_id'];
$point = $_POST['point'];
$level = $_POST['level'];
$life = $_POST['life'];
$level_completed = $_POST['level_completed'];
$time_elapsed = $_POST['time_elapsed'];

if ($user_id	) {
	require_once('mysqli.php');

	$response = '';

	//$sql = "INSERT INTO user (name, gender) VALUES ('".$name."', '".$gender."')";
	//$sql = "INSERT INTO `score` (`user_id`, `point`, `level`,`life`) VALUES ('$user_id', '$point','$level','$life')";					
	$sql = "INSERT INTO score (user_id, point, level,life,level_completed,time_elapsed) VALUES ('".$user_id."', '".$point."','".$level."','".$life."', '".$level_completed."','".$time_elapsed."')";					
	if ($MySQLi->query($sql) == true) {
		$response .= "&id=".$MySQLi->insert_id;
	} else {
		$response .= "&error=3&error_desc=Erro ao inserir score no banco.".$mysqli->error;
	}

	echo $response;
} else {
	echo 'Você está tentando trapacear?!?';
}
?>