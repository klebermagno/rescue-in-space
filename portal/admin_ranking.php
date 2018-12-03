<?php
session_start();
/*	
if ($_SESSION["logged"] != '1')	{
	header("location:acesso_invalido.php");	
}
*/
include 'header.php'; 

?>

<section id="desempenho">
<span class="col-md-12 col-md-offset-12" style="height:100px">&nbsp;</span>
	<div class="panel panel-default">
	  <div class="panel-heading">
		<h3 class="panel-title">Relat&oacute;rios das Partidas dos Jogadores</h3>
	  </div>
	  <div class="panel-body">
	   
	

	   
	<?php  
	require_once('dbconnect.php');
	
	$limit = 20;  
	if (isset($_GET["page"])) {
		$page  = $_GET["page"]; 
	} 
	else { 
		$page=1; 
	}
	
	if (isset($_GET["playername"])) {
		$player_name  = $_GET["playername"]; 
	} 
	
	$start_from = ($page-1) * $limit;  
	 
	if ( $player_name == "" ) {
		$sql = "SELECT * FROM user ORDER BY id DESC LIMIT $start_from, $limit";  
	} else {
		$sql = "SELECT * FROM user WHERE name LIKE '%".$player_name."%' ORDER BY id DESC LIMIT $start_from, $limit";  
	}
	$rs_result = mysql_query($sql);  
	?>  
	<table class="table table-bordered table-striped">  
	<thead>  
	<tr>  
	<th>Código</th> 
	<th>Usuário</th>  
	<th>Avatar</th>  
	<th>Data do Cadastro</th>  
	<th>Ação</th>  
	</tr>  
	<thead>  
	<tbody>  
	<?php  

	while ($row = mysql_fetch_assoc($rs_result)) {  	
		
	$action_view = '<a href= "performance.php?user='.$row['id'].'" class="btn btn-default" role="button"><span class="glyphicon glyphicon-signal" aria-hidden="true"></span>&nbsp;Relat&oacute;rio</a>';

	$action_remove = '<a href= "remove_view.php?user='.$row['id'].'" class="btn btn-default" role="button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>';


	?>  
				<tr>  
				<td><?php echo $row['id']; ?></td>  
				<td><?php echo $row['name']; ?></td>  
				<td><?php echo ($row['gender'] == 'F' ? 'Feminino' : 'Masculino'); ?></td>  
				<td><?php echo $row['creation']; ?></td> 
				<td><?php echo $action_view; ?>&nbsp;&nbsp;<?php echo $action_remove; ?></td>  
				</tr>  
	<?php  
	};  
	?>  
	</tbody>  
	
	<div align="left">	
		<form action="admin_ranking.php" method="GET">
		<fieldset>	
			<input type="hidden" name="page" value="<?php echo $page; ?>"/>
			<input type="text" placeholder="Nome do jogador" name="playername" value="<?php echo ($playername == "" ? "" : $playername); ?>"/>
			<button class="btn btn-default"  type="submit">Filtrar </button>
			<a href= "admin_ranking.php" class="btn btn-default" role="button">Limpar</span></a>
		</fieldset>
		</form>
	</div>
	
	</table>  
	<?php 

	if ( $player_name == "" ) {
		$sql = "SELECT COUNT(id) FROM user";  
	} else {
		$sql = "SELECT COUNT(id) FROM user WHERE name LIKE '%".$player_name."%'";  
	}
	
	
	$rs_result = mysql_query($sql);  
	$row = mysql_fetch_row($rs_result);  
	$total_records = $row[0];  
	$total_pages = ceil($total_records / $limit);  
	$pagLink = '<nav> <ul class="pagination">';  
	$pagLink .= '<li><a href="admin_ranking.php?page='.(($page > 1)? $page-1 : 1).'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;   
	for ($i=1; $i<=$total_pages; $i++) {  
				 $pagLink .= "<li".($page==$i ? ' class="active"' : '')."><a href='admin_ranking.php?page=".$i."'>".$i."</a></li>";  
	};  

	$pagLink .= '<li><a href="admin_ranking.php?page='.(($page = $total_pages)? $page : $page+1).'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
	echo '<div class="row"><div class="col-lg-12 text-center">';
	echo $pagLink . "</ul></nav>";  
	echo '</div></div>';
	?>
	</div>
	</div>
	</div>
	</div>
</section>
<?php include 'footer.php'; ?>

</body>
</html>