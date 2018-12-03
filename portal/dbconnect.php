<?php
	/**
	version:
		prod - produчуo (online)
		dev - desenvolvimento
	*/
	
	$version = 'prod';
		
	$dbhost = '';  
	$dbuser = '';  
	$dbpass = '';  		
	$dbname = '';  	
	
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
	
	$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql');  	
	$connection = mysql_select_db($dbname);
?>