<?php
header("Content-Type:text/html; charset=utf-8");

$name = $_POST['name'];
$gender = $_POST['gender'];

if ($name) {
	require_once('mysqli.php');

	$response = '';

	//$sql = "INSERT INTO `user` (`name`, `gender`) VALUES ('".$name."', '".$gender."')";					
	$sql = "INSERT INTO user (name, gender) VALUES ('".$name."', '".$gender."')";
	if ($MySQLi->query($sql) == true) {
		$response .= $MySQLi->insert_id;
	} else {
		$response .= "&error=3&error_desc=Erro ao inserir usuario no banco.";
	}

	echo $response;
} else {
	echo 'Você está tentando trapacear?!?';
}
?>