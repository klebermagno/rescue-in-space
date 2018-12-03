<?php 
session_start(); 
/*if ($_SESSION["logged"] != '1')	{
	header("location:acesso_invalido.php");
}*/
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

<body id="page-top" class="index" onload="createChart();">

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
						<h3 class="panel-title">Relat&oacute;rio das Partidas do Jogador</h3>
					</div>
					<div class="panel-body">	   
						<nav>
							<ul class="pager">
							<li class="previous"><a href="admin_ranking.php"><span aria-hidden="true">&larr;</span> Voltar</a></li> 
							<li><a href="javascript:window.print()"><span class='glyphicon glyphicon-print'></span> Imprimir</a></li> 
							</ul>
						</nav>
						
	  
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
						
						$start_from = ($page-1) * $limit;  
						
						
						// carregando dados do jogador
						$sql = "SELECT * FROM `user` WHERE `id`=".$player_id;  

						$user_result = mysql_query($sql);
						
						$user_data_row = mysql_fetch_assoc($user_result);
						
						$sql = "SELECT level,level_completed, time_elapsed, point,life, DATE_FORMAT(creation,'%m/%d/%Y') as year, DATE_FORMAT(creation,'%T')  as hour  FROM `score` WHERE `user_id`=".$player_id." ORDER BY creation DESC LIMIT $start_from, $limit";  
						
						$rs_result = mysql_query($sql);  
											
						// carregando dados do grafico
						$sql_graph = "SELECT level,point,life, YEAR(creation) as year  FROM `score` WHERE `user_id`=".$player_id." ORDER BY level ASC";  

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
						
						<div>
						<hr>
						<a class="btn btn-info" href="<?php echo "triggers_history.php?user=".$player_id;?>"><span class='glyphicon glyphicon-flag'>&nbsp;</span>Eventos </a>&nbsp;&nbsp;Visualize o hist&oacute;rico de eventos da partida do jogador clicando no botão ao lado.
						<hr>
						</div>
						
						<div>
							<center>
							<h5>Desempenho do Jogador</h5>
							<canvas id="trChart" width="600" height="300"></canvas>
							<div>
							<span class="label label-primary">Pontos</span>
							<span class="label label-danger">Vidas</span>
							</div>
							</center>
						</div>
						
						<div> <!-- SCORE DA PARTIDA -->
							<center>
								<hr>
								<h5>Detalhes das Partidas do Jogador</h5>
							<center>	
							<table class="table table-bordered table-striped">  
							<thead>  
							<tr>  
							<th>Fase</th>
							<th>Planeta</th>  
							<th>Resultado da Fase</th>  
							<th>Tempo Jogado na Fase (em segundos)</th>  
							<th>Pontos</th>  
							<th>Vidas Restantes</th>  
							<th>Data da Partida</th>  
							<th>Hora da Partida</th>
							</tr>  
							<thead>  
							<tbody>  
													
							<?php 						
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
											<td><?php echo ($row['level_completed'] == '1' ? 'Venceu' : 'Perdeu'); ?></td>
											<td><?php echo $row['time_elapsed']; ?></td>  
											<td><?php echo $row['point']; ?></td>  
											<td><?php echo $row['life']; ?></td>  
											<td><?php echo $row['year']; ?></td>  
											<td><?php echo $row['hour']; ?></td>  
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
							$pagLink .= '<li><a href="performance.php?user='.$player_id.'&page='.(($page > 1)? $page-1 : 1).'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;   
							for ($i=1; $i<=$total_pages; $i++) {  
										 $pagLink .= "<li".($page==$i ? ' class="active"' : '')."><a href='performance.php?user=".$player_id."&page=".$i."'>".$i."</a></li>";  
							};  

							$pagLink .= '<li><a href="performance.php?user='.$player_id.'&page='.(($page = $total_pages)? $page : $page+1).'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
							echo '<div class="row"><div class="col-lg-12 text-center">';
							echo $pagLink . "</ul></nav>";  
							echo '</div></div>';
							?>
						</div>	<!-- FIM SCORE DA PARTIDA -->
					</div> <!-- fim panel-body-->
				</div>
			</div>
		</div> <!-- fim container -->
</section>
  

<?php include 'footer.php'; ?>
  


		<script type="text/javascript">
		function createChart() {
			var data = {	
				labels: [<?php echo $levels ?>],
				datasets: [
					{
					label: "Pontos",
					fillColor: "rgba(0,26,225,0.5)",
					strokeColor: "rgba(0,26,225,1)",			
					data: [<?php echo $points ?>]
					},
					{
					label: "Vidas",
					fillColor: "rgba(225,0,0,0.5)",
					strokeColor: "rgba(225,0,0,1)",			
					data: [<?php echo $lifes ?>]
					}
				]  
			}
			
			var options = {
			//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero : true,

			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines : true,

			//String - Colour of the grid lines
			scaleGridLineColor : "rgba(0,0,0,.05)",

			//Number - Width of the grid lines
			scaleGridLineWidth : 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - If there is a stroke on each bar
			barShowStroke : true,

			//Number - Pixel width of the bar stroke
			barStrokeWidth : 2,

			//Number - Spacing between each of the X value sets
			barValueSpacing : 5,

			//Number - Spacing between data sets within X values
			barDatasetSpacing : 1,

			//String - A legend template
		  
			 legendTemplate : '<ul>'
						  +'<% for (var i=0; i<datasets.length; i++) { %>'
							+'<li>'
							+'<span style=\"background-color:<%=datasets[i].fillColor%>\"></span>'
							+'<% if (datasets[i].label) { %><%= datasets[i].label %><% } %>'
						  +'</li>'
						+'<% } %>'
					  +'</ul>'
		  

			};

			var cht = document.getElementById('trChart');
			var ctx = cht.getContext('2d');
			var barChart = new Chart(ctx).Bar(data, options);
			//barChart.generateLegend();
			//then you just need to generate the legend
			
			//document.getElementById("legendDiv").innerHTML = barChart.generateLegend();
			
		}
		</script>
</body>

</html>