<!DOCTYPE html>
<html lang="en-US">
<head>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

<meta charset="UTF-8">
</head>
<body>

<div class="container">
	<div class="row">
		<div class="page-header">
			<h1>Jogo Super Resgate no Espa&ccedil;o <small>Paraíso Softwares</small></h1>
		</div>
	
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Ranking Geral</h3>
		</div>
		<div class="panel-body">			  
			<?php  
			require_once('dbconnect.php');
			  
			$limit = 2;  
			if (isset($_GET["page"])) {
				$page  = $_GET["page"]; 
			} 
			else { 
				$page=1; 
			}
			$start_from = ($page-1) * $limit;  
			  
			$sql = "SELECT * FROM user ORDER BY name ASC LIMIT $start_from, $limit";  
			$rs_result = mysql_query($sql);  
			
			echo 'Daniel San';
			?>  
			<table class="table table-bordered table-striped">  
			<thead>  
			<tr>  
			<th>Usuário</th>  
			<th>Gênero</th>  
			</tr>  
			<thead>  
			<tbody>  
			<?php  
			while ($row = mysql_fetch_assoc($rs_result)) {  	
			?>  
						<tr>  
						<td><?php echo $row['name']; ?></td>  
						<td><?php echo $row['gender']; ?></td>  
						</tr>  
			<?php  
			};  
			?>  
			</tbody>  
			</table>  
			<?php  
			$sql = "SELECT COUNT(id) FROM user";  
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
		</div>
	</div>
	</div>
</div>
</body>
</html>