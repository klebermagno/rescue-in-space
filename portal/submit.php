<?php

$username = $_POST['username'];
$password = $_POST['password'];


if($username&&$password)
{
	if($username=='admin' and $password='admin')
	{
		session_start();
		$_SESSION["logged"]	= '1';
		header("location:admin_ranking.php");
	}
	else 
		die("That user doesn't exist!");

}
else
	die("ERROR");


?>