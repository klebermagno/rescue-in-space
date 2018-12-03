<?php
session_start(); 
/*if ($_SESSION["logged"] != '1')	{
	header("location:acesso_invalido.php");
}
*/
?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Jogo Super Resgate no Espa&ccedil;o</title>

    <!-- Bootstrap Core CSS - Uses Bootswatch Flatly Theme: http://bootswatch.com/flatly/ -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/freelancer.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesnt work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	
	<script type="text/javascript" charset="utf-8" src="http://www.chartjs.org/assets/Chart.min.js"></script>

</head>

<body id="page-top" class="index">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#page-top">Super Resgate no Espa&ccedil;o</a>
            </div>
				<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">				
					<li class="dropdown" >
						<a href="login.php">Logout</a>					
					</li>			
				</ul>
			</div>
		</div>
        <!-- /.container-fluid -->       
    </nav>

	<section id="desempenho">
		<span class="col-md-12 col-md-offset-12" style="height:100px">&nbsp;</span>

		<div class="container">
            <div class="row">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Relat&oacute;rio dos Eventos durante o Jogo</h3>
					</div>
					<div class="panel-body">	
						
						<?php  					
						require_once('dbconnect.php');
						$limit = 10;  
						
						if (isset($_GET["user"])) {
							$player_id  = $_GET["user"]; 
						} 
						else { 
							echo "Defina o id do jogador";
						}
						
						if (isset($_GET["page"])) {
							$page  = $_GET["page"]; 
						} 
						else { 
							$page=1; 
						}
						?>
					
						<nav>
							<ul class="pager">
							<li class="previous"><a href="performance.php<?php echo '?user='.$player_id.'&page=1'; ?>"><span aria-hidden="true">&larr;</span> Voltar</a></li> 
							<li><a href="javascript:window.print()"><span class='glyphicon glyphicon-print'></span> Imprimir</a></li> 
							</ul>
						</nav>
						
	  
						<?php
						
						if (isset($_GET["level"])) {
							$level_filter  = $_GET["level"]; 
						} 
						else { 
							$level_filter=0; 
						}

						$start_from = ($page-1) * $limit;  
						
						
						// carregando dados do jogador
						$sql = "SELECT * FROM `user` WHERE `id`=".$player_id;  

						$user_result = mysql_query($sql);
						
						$user_data_row = mysql_fetch_assoc($user_result);
						
						// fim do carregando dados do grafico
						?>  
						<div class="jumbotron">
							<table> 
							<tr>
								<td align="right">
								<strong>Nome do Jogo:&nbsp;&nbsp;</strong>
								</td>
								<td>
									Super Resgate no Espa&ccedil;o
								</td>
							<tr>
							<tr>
								<td align="right">
								<strong>Nome do Jogador:&nbsp;&nbsp;</strong>
								</td>
								<td>
									<?php echo $user_data_row['name']; ?>
								</td>
							<tr>
							<tr>
								<td align="right">
								<strong>Avatar:&nbsp;&nbsp;</strong>
								</td>
								<td>
									<?php echo ($user_data_row['gender'] == 'F' ? 'Feminino' : 'Masculino'); ?>
								</td>
							<tr>
							<tr>
								<td align="right">
								<strong>Data do Cadastro:&nbsp;&nbsp;</strong>
								</td>
								<td>
									<?php echo $user_data_row['creation']; ?>
								</td>
							<tr>						
							</table>
						</div>
									

						<!-- TRIGGERS DA PARTIDA -->		
						<DIV>
							<center>
								<hr>
								<h5>
									Hist&oacute;rico de Eventos
								</h5>
								<div>
								<span> Filtrar por:&nbsp;</span>
								<?php
				echo "<a href='triggers_history.php?user=".$player_id."&page=".$page."&level=1'>Aquarious</a> |";
				echo "&nbsp;<a href='triggers_history.php?user=".$player_id."&page=".$page."&level=2'>Purpura-Y</a> |";
				echo "&nbsp;<a href='triggers_history.php?user=".$player_id."&page=".$page."&level=3'>Nabuu</a> |";
				echo "&nbsp;<a href='triggers_history.php?user=".$player_id."&page=".$page."&level=4'>Zona retro</a> |";
				echo "&nbsp;<a href='triggers_history.php?user=".$player_id."&page=".$page."&level=5'>Destino Final</a>";
				echo "&nbsp;&nbsp;&nbsp;[<a href='triggers_history.php?user=".$player_id."&page=".$page."&level=0'><strong>Limpar Filtro</strong></a>]";
								?>
								</div>
								<br>
							<center>	
							<table class="table table-bordered table-striped">  
							<thead>  
							<tr>  
							<th>Fase</th>							
							<th>Planeta</th>	
							<th>Trigger (Evento)</th>  							
							<th>Data</th>  
							<th>Hora</th>  														
							</tr>  
							<thead>  
							<tbody>  
													
							<?php 	
							
							
							if ($level_filter > 0) {
								$sql = "SELECT `level`,`trigger`, DATE_FORMAT(creation,'%m/%d/%Y') as trigger_date, DATE_FORMAT(creation,'%T') as hour FROM `triggers` WHERE `user_id`=".$player_id." and `level`=".$level_filter." ORDER BY creation DESC LIMIT ".$start_from.", ".$limit;
							} else {
								$sql = "SELECT `level`,`trigger`, DATE_FORMAT(creation,'%m/%d/%Y') as trigger_date, DATE_FORMAT(creation,'%T') as hour FROM `triggers` WHERE `user_id`=".$player_id." ORDER BY creation DESC LIMIT ".$start_from.", ".$limit;
							}
							$rs_result = mysql_query($sql);  							
							while ($row = mysql_fetch_assoc($rs_result)) { 		
							?>  
										<tr>  
											<td> <?php echo $row['level']; ?> </td>
											<td>
											<?php 
												switch ($row['level']) {
													case 1:
														echo "Aquarious";
														break;
													case 2:
														echo "Purpura-Y";
														break;
													case 3:
														echo "Nabuu";
														break;
													case 4:
														echo "Zona retro";
														break;
													case 5:
														echo "Destino Final";
														break;
												}									
											?>
											
											</td>  
											<td><?php echo $row['trigger']; ?></td>
											<td><?php echo $row['trigger_date']; ?></td>  
											<td><?php echo $row['hour']; ?></td>  
										</tr>  
							<?php  
							};  
							?>  
							</tbody>  
							</table>  
							<?php  
							$sql = "SELECT COUNT(id) FROM triggers WHERE user_id=".$player_id;  
							$rs_result = mysql_query($sql);  
							$row = mysql_fetch_row($rs_result);  
							$total_records = $row[0];  
							$total_pages = ceil($total_records / $limit);  
							$pagLink = '<nav> <ul class="pagination">';  
							$pagLink .= '<li><a href="triggers_history.php?user='.$player_id.'&page='.(($page > 1)? $page-1 : 1).'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;   
							for ($i=1; $i<=$total_pages; $i++) {  
								 $pagLink .= "<li".($page == $i ? ' class="active"' : '')."><a href='triggers_history.php?user=".$player_id."&page=".$i."'>".$i."</a></li>";  
							};  

							$pagLink .= '<li><a href="triggers_history.php?user='.$player_id.'&page='.(($page = $total_pages)? $page : $page+1).'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
							echo '<div class="row"><div class="col-lg-12 text-center">';
							echo $pagLink . "</ul></nav>";  
							echo '</div></div>';
							?>
						</DIV>
					</div> <!-- fim panel-body-->
				</div>
			</div>
		</div> <!-- fim container -->
</section>
  

<?php include 'footer.php'; ?>
  
</body>

</html>