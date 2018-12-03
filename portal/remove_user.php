<?php 
session_start();
if ($_SESSION["logged"] != '1')	{
	header("location:acesso_invalido.php");
}
?>
<?php

require_once('dbconnect.php');

$user_id = '';

if (isset($_POST['user'])) {
	$user_id  = $_POST['user']; 
} 
else { 
	die("Informe o id do usuário!");
}
  
$sql = "DELETE FROM score WHERE user_id=".$user_id;;  

$result= mysql_query($sql);
$err   = mysql_error();
      
if ($err == "") {
	echo "Pontos do Usuário removidos com sucesso.";
	
	$sql = "DELETE FROM user WHERE id=".$user_id;;  

	$result= mysql_query($sql);
	$err   = mysql_error();
	
	if ($err == "") {
		include 'header.php'; 
		
		echo '<section id="desempenho">
			<span class="col-md-12 col-md-offset-12" style="height:100px">&nbsp;</span>
			<div class="container">
				<div class="row">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">Sucesso!</h3>
						</div>
						<div class="panel-body">';
			
		echo "Usu&aacute;rio removido com sucesso.";
		echo '<nav>
		<ul class="pager">
			<li class="previous"><a href="admin_ranking.php"><span aria-hidden="true">&larr;</span> Voltar</a></li>    
		</ul>
		</nav>';

		echo '		</div>
				</div>
			</div>
			</section>';
		include 'footer.php'; 
		echo '</body></html>';
	} else {		
		echo "Error deleting record: " . $conn->error;
	}    
} else {
	echo "Error deleting record: " . $conn->error;
}

mysql_close();
?>