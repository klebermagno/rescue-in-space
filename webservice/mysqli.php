<?php


	/**
	version:
		prod - produчуo (online)
		dev - desenvolvimento
	*/
	
	$version = 'prod';
	
	$MySQL = array(	'servidor' => '', 'usuario' => '','senha' => '','banco' => '');
		
	if ( $version == 'dev' ) {
		$dbhost = 'localhost';  
		$dbuser = 'root';  
		$dbpass = '';  		
		$dbname = 'game';  		 
	} 
	elseif ( $version == 'prod' ) {
		$dbhost = 'mysql.fisiogames.com.br';  
		$dbuser = 'fisiogames06';  
		$dbpass = 'r3s84t33';  		  
		$dbname = 'fisiogames06'; 
	}


$MySQL = array(
	'servidor' => $dbhost,	
	'usuario' => $dbuser,		
	'senha' => $dbpass ,				
	'banco' => $dbname	
);

$MySQLi = new MySQLi($MySQL['servidor'], $MySQL['usuario'], $MySQL['senha'], $MySQL['banco']);

// Verifica se ocorreu um erro e exibe a mensagem de erro
if (mysqli_connect_errno())
    trigger_error(mysqli_connect_error(), E_USER_ERROR);

?>