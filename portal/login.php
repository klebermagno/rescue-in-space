<?php
session_start();
session_unset();
session_destroy();
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

	 <style type="text/css">
        body { background: url(assets/bglight.png); }
        .hero-unit { background-color: #fff; }
        .center { display: block; margin: 0 auto; }
    </style>

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
                <a class="navbar-brand" href="http://fisiogames.com/resgate/portal">Super Resgate no Espaço</a>
            </div>
				<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">				
					<li class="dropdown" >
						<a href="index.php">Voltar</a>					
					</li>			
				</ul>
			</div>
		</div>

			
        <!-- /.container-fluid -->       
    </nav>

   


<section id="login">
	<span class="col-md-12 col-md-offset-12" style="height:100px">&nbsp;</span>
	<div class="container">
		<div class="row">
		
		<div class="col-md-4 col-md-offset-4">
			<div class="panel panel-default">
			  <div class="panel-heading">
				<h3 class="panel-title">Fa&ccedil;a seu Login</h3>
			</div>
			  <div class="panel-body">
				<form action="submit.php" method="post" accept-charset="UTF-8" role="form">                        
					<fieldset>
					<div class="form-group">					
						<input class="form-control" placeholder="Usuário" name="username" type="text">
					</div>
					<div class="form-group">
						<input class="form-control" placeholder="Senha" name="password" type="password" value="">
					</div>
				  <input class="btn btn-lg btn-primary btn-block" type="submit" value="Login">
				</fieldset>
				</form>
			  </div>
		  </div>
		</div>
	  </div>
</div>
</section>
</body>
</html>