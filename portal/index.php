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
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

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
                <a class="navbar-brand" href="#page-top">Super Resgate no Espaço</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
					<li class="page-scroll">
                        <a href="#ranking">Ranking</a>
                    </li>
                    <li class="page-scroll">
                        <a href="#portfolio">Telas</a>
                    </li>
                    <li class="page-scroll">
                        <a href="#about">Sobre</a>
                    </li>                   
					<li class="dropdown" >
						<a href="login.php">Login</a>					
					</li>
				
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
		
          
        
    </nav>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <img class="img-responsive" src="img/profile.png" alt="">
                    <div class="intro-text">
                        <span class="name">Super Resgate no Espaço</span>
                        
                        <span class="skills">Diversão & Aventura</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
	<!-- Ranking Section -->
    <section id="ranking">	
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Ranking Geral</h3>
		</div>
		<div class="panel-body">			  
			<?php  
			require_once('dbconnect.php');
			  
			$limit = 15;  
			if (isset($_GET["page"])) {
				$page  = $_GET["page"]; 
			} 
			else { 
				$page=1; 
			}
			$start_from = ($page-1) * $limit;  
			
			  
			$sql = "SELECT user.name, user.gender, Max(score.level) as max_level,SUM(point) as points FROM user join score on (score.user_id = user.id) GROUP BY user_id ORDER BY points DESC LIMIT $start_from, $limit";  
			$rs_result = mysql_query($sql);  
			?>  
			<table class="table table-bordered table-striped">  
			<thead>  
			<tr>  
			<th>Usuário</th>  
			<th>Avatar</th>  
			<th>Fase Alcan&ccedil;ada</th>  
			<th>Pontos</th>  
			</tr>  
			<thead>  
			<tbody>  
			<?php  
			while ($row = mysql_fetch_assoc($rs_result)) {  	
			?>  
						<tr>  
						<td><?php echo $row['name']; ?></td>  
						<td><?php echo ($row['gender'] == 'F' ? 'Feminino' : 'Masculino'); ?></td>  
						<td><?php echo $row['max_level']; ?></td>  
						<td><?php echo $row['points']; ?></td>  
						</tr>  
			<?php  
			};  
			?>  
			</tbody>  
			</table>  
			<?php  
	
			$sql = "SELECT COUNT(DISTINCT score.user_id) FROM user join score on (score.user_id = user.id)";  
			$rs_result = mysql_query($sql);  
			$row = mysql_fetch_row($rs_result);  
			$total_records = $row[0];  
			$total_pages = ceil($total_records / $limit);  
			$pagLink = '<nav> <ul class="pagination">';  
			$pagLink .= '<li><a href="index.php?page='.(($page > 1)? $page-1 : 1).'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;   
			for ($i=1; $i<=$total_pages; $i++) {  
						 $pagLink .= "<li".($page==$i ? ' class="active"' : '')."><a href='index.php?page=".$i."'>".$i."</a></li>";  
			};  

			$pagLink .= '<li><a href="index.php?page='.(($page = $total_pages)? $page : $page+1).'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
			echo '<div class="row"><div class="col-lg-12 text-center">';
			echo $pagLink . "</ul></nav>";  
			echo '</div></div>';
			?>
		</div>
	</div>
	</div>	
	</section>
	
    <!-- Portfolio Grid Section -->
    <section id="portfolio">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2>Telas</h2>
                    <hr class="star-primary">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 portfolio-item">
                    <a href="#portfolioModal1" class="portfolio-link" data-toggle="modal">
                        <div class="caption">
                            <div class="caption-content">
                                <i class="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src="img/tela1.png" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-sm-4 portfolio-item">
                    <a href="#portfolioModal2" class="portfolio-link" data-toggle="modal">
                        <div class="caption">
                            <div class="caption-content">
                                <i class="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src="img/tela2.png" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-sm-4 portfolio-item">
                    <a href="#portfolioModal3" class="portfolio-link" data-toggle="modal">
                        <div class="caption">
                            <div class="caption-content">
                                <i class="fa fa-search-plus fa-3x"></i>
                            </div>
                        </div>
                        <img src="img/tela3.png" class="img-responsive" alt="">
                    </a>
                </div>                
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="success" id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2>Sobre</h2>
                    <hr class="star-light">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-lg-offset-2">
                    <p>O Jogo Super Resgate do Espaço foi criado para entreter toda a família. É um jogo simples e desafiador, que irá te envolver e divertir durante horas!</p>
                </div>
                <div class="col-lg-4">
                    <p>Baixe agora mesmo o jogo da Google Play e junte-se a maior equipe de resgate espacial agora mesmo.</p>
                </div>
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <a href="https://play.google.com/store/apps/details?id=everbit.superresgatenoespaco" class="btn btn-lg btn-outline">
                        <i class="fa fa-download"></i> Baixe Agora
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="text-center">       
        <div class="footer-below">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        Copyright &copy; Paraíso Softwares / Fisiogames 2015
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
    <div class="scroll-top page-scroll visible-xs visble-sm">
        <a class="btn btn-primary" href="#page-top">
            <i class="fa fa-chevron-up"></i>
        </a>
    </div>

    <!-- Portfolio Modals -->
    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2">
                        <div class="modal-body">
                            <h2>Raking</h2>
                            <hr class="star-primary">
                            <img src="img/tela1.png" class="img-responsive img-centered" alt="">
                            <p>Os melhores jogadores se destacam em um ranking exclusivo!</p>                            
                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2">
                        <div class="modal-body">
                            <h2>Personagens</h2>
                            <hr class="star-primary">
                            <img src="img/tela2.png" class="img-responsive img-centered" alt="">
                            <p>Você pode escolher o personagem que mais se identifica e se divertir!</p>                          
                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl">
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2">
                        <div class="modal-body">
                            <h2>Game Play</h2>
                            <hr class="star-primary">
                            <img src="img/tela3.png" class="img-responsive img-centered" alt="">
                            <p>Destrua asteroides, lixo espacial e bigornas, mas não atire nos astronautas, naves amigas ou vidas!</p>                           
                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="js/classie.js"></script>
    <script src="js/cbpAnimatedHeader.js"></script>

    <!-- Contact Form JavaScript -->
    <script src="js/jqBootstrapValidation.js"></script>
    <script src="js/contact_me.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/freelancer.js"></script>

</body>

</html>
