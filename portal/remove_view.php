<?php 
session_start();
if ($_SESSION["logged"] != '1')	{
	header("location:acesso_invalido.php");
}
include 'header.php'; 
?>

<section id="desempenho">
<span class="col-md-12 col-md-offset-12" style="height:100px">&nbsp;</span>

<div class="container">
    <div class="row">

		<div class="panel panel-danger">
			<div class="panel-heading">
				<h3 class="panel-title">Exclus&atilde;o de Jogador</h3>
			</div>
			<div class="panel-body">
	   
			<nav>
			<ul class="pager">
				<li class="previous"><a href="admin_ranking.php"><span aria-hidden="true">&larr;</span> Voltar</a></li>    
			</ul>
			</nav>
		  
			<?php  
			require_once('dbconnect.php');			
			
			if (isset($_POST["remove"])) {
				$remove = $_POST["remove"]; 
			} 
			else { 
				$remove = 0;
			}
			  
			$limit = 10;  
			if (isset($_GET["user"])) {
				$player_id  = $_GET["user"]; 
			} 
			else { 
				echo "Defina o id do jogador";
			}

			$page = 1;
			$start_from = ($page-1) * $limit;  
			  
			$sql = "SELECT * FROM `user` WHERE `id`=".$player_id;  

			$rs_result = mysql_query($sql);  
			?>
			
			<div align="center">	
				<h3>Deseja realmente excluir o jogador?</h3>

				<form action="remove_user.php" method="POST">
					<input type="hidden" name="user" value="<?php echo $player_id ?>" />			
					<button class="btn btn-default"  type="submit">Remover </button>
					<a href= "admin_ranking.php" class="btn btn-default" role="button">Cancelar</span></a>
				</form>
			</div>
			
			<h5> Dados Cadastrais</h5>
			<table class="table table-bordered table-striped">  
				<thead>  
				<tr>  
				
				<th>Usu&aacute;rio</th>  
				<th>Gênero</th>  
				<th>Data do Cadastro</th>  
				</tr>  
				<thead>  
				<tbody>  
				<?php  

				while ($row = mysql_fetch_assoc($rs_result)) {  	
					
				?>  
							<tr>  
							<td><?php echo $row['name']; ?></td>  
							<td><?php echo $row['gender']; ?></td>  
							<td><?php echo $row['creation']; ?></td> 
							</tr>  
				<?php  
				};  
				?>  
				</tbody>  
			</table>  
			
			<?php
			// carregando dados do grafico
			$sql_graph = "SELECT * FROM `score` WHERE `user_id`=".$player_id." ORDER BY level ASC";  

			$rs_graph_result = mysql_query($sql_graph);  
			$levels = '';
			$points = '';
			$lifes = '';
			while ($row_graph = mysql_fetch_assoc($rs_graph_result)) { 		
				$levels .= '"Fase '.$row_graph['level'].'",';
				$points .= $row_graph['point'].',';
				$lifes .= $row_graph['life'].',';
			}
			// fim do carregando dados do grafico
			?>  
			
			<h5>Desempenho</h5>
			<table class="table table-bordered table-striped">  
			<thead>  
			<tr>  
			<th>Fase</th>  
			<th>Pontos</th>  
			<th>Vidas</th>  
			</tr>  
			<thead>  
			<tbody>  
			<?php  
			
			
			while ($row = mysql_fetch_assoc($rs_result)) { 		
			?>  
						<tr>  
							<td><?php echo $row['level']; ?></td>  
							<td><?php echo $row['point']; ?></td>  
							<td><?php echo $row['life']; ?></td>  
						</tr>  
			<?php  
			};  
			?>  
			</tbody>  
			</table>  
			<?php  			
			$sql = "SELECT COUNT(id) FROM score WHERE user_id=".$player_id;  
			$rs_result = mysql_query($sql);  
			$row = mysql_fetch_row($rs_result);  
			$total_records = $row[0];  
			$total_pages = ceil($total_records / $limit);  
			$pagLink = '<nav> <ul class="pagination">';  
			$pagLink .= '<li><a href="ranking.php?page='.(($page > 1)? $page-1 : 1).'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;   
			for ($i=1; $i<=$total_pages; $i++) {  
						 $pagLink .= "<li".($page==$i ? ' class="active"' : '')."><a href='ranking.php?page=".$i."'>".$i."</a></li>";  
			};  

			$pagLink .= '<li><a href="ranking.php?page='.(($page = $total_pages)? $page : $page+1).'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
			echo '<div class="row"><div class="col-lg-12 text-center">';
			echo $pagLink . "</ul></nav>";  
			echo '</div></div>';
			?>		
			</div> <!-- fim panel-body-->
	
		</div>
	</div>
</div>
</section>

<?php include 'footer.php' ?>

</body>
</html>