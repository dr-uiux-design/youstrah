<?
//// actionpay
if (isset($_GET["actionpay"])){
         setcookie("actionpay", $_GET["actionpay"], time()+60*60*24*30);
}
//print_r($_COOKIE);
?>
<!DOCTYPE html>
<html lang="ru">
<head>

    <meta charset="utf-8">

    <title>ОСАГО онлайн</title>
    <base href="https://<? echo $_SERVER['HTTP_HOST']; ?>/"/>
    <meta name="description" content="Дескрипт">
    <meta name="robots" content="noindex, nofollow"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta property="og:image" content="path/to/image.jpg">
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon">
    <!-- Chrome, Firefox OS and Opera --> 
    <meta name="theme-color" content="#000">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#000">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-status-bar-style" content="#000">
   
    <link rel="stylesheet" href="libs/owl.carusel-2.3.4/css/owl.carousel.css">
    <link rel="stylesheet" href="css/font-awesome.min.css"> 
    <link rel="stylesheet" href="css/style.css"> 


</head>

<body>
    <nav class="navbar">
	<div class="container navbar__container">

		<div class="navbar__logo">

			<a href="index.html">
				<picture class="navbar__logo-desk">
					<source srcset="img/logo.webp" type="image/webp">
					<img src="img/logo.png" width="250" height="60" alt="logo">
				</picture>
				<picture class="navbar__logo-mob">
					<source srcset="img/logo-mob.webp" type="image/webp">
					<img src="img/logo-mob.png" width="57" height="57" alt="logo">
				</picture>
			</a>

		</div>
		<div class="navbar__collapse collapse">
			<ul class="list-reset navbar__menu">
				<li class="menu-item">
					<a href="index.html#calculation">Рассчитать ОСАГО</a>
				</li>
				<li class="menu-item">
					<a href="index.html#answers">Вопрос/Ответ</a>
				</li>
				
				<li class="menu-item">
					<a href="index.html#works">Как это работает</a>
				</li>
				<li class="menu-item">
					<a href="purchase.html">Как купить ОСАГО</a>
				</li>
				<li class="menu-item">
					<a href="contact.html">Контакты</a>
				</li>
			</ul>
		</div>

		<div class="navbar__right">

			<div class="navbar__mail">
				<span class="navbar__mail-link">
					<a href="mailto:mobilpoisk24@gmail.com"> <img src="img/icon-mail.svg" > mobilpoisk24@gmail.com</a>
				</span>

			</div>
		
		</div>
		<button class="btn-reset navbar-toggler" type="button">
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>
    <!--page-header-->
<header class="page-header">
<div class="container">
    <h1 class="page-title">Оплата</h1>
</div>
</header>
<!--page-header-->
    <!--contact-->
<section class="contact">
    
    <div class="container form__container">
        <h3>Вы можете оплатить полис в любое время.</h3>
        <div class="form-area payform">
            <form class="form payform__form">
                <input type="hidden" name="company_old" value="оплата со страницы views/pay.php">
                <div class="form-row">
                    <div class="form-group">
                        <label for="insurant-email" class="form-label hide">Ваш E-mail</label>
                        <input type="text" placeholder="E-mail" class="form-control" name="insurant_email" required id="pay-email_">
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label for="insurant-email" class="form-label hide">Сумма оплаты</label>
                        <input type="text" name="result['result']" id="pay-sum" class="form-control form-email"
                            placeholder="Сумма" required value="<? echo $num; ?>" >
                            <div class="invalid-feedback sum"></div>
                    </div>
                </div>

                <div class="form-group">
                    <button type="button" class="btn-reset btn-primary payform__button">Оплатить</button>

                </div>
            </form>
            <div id="rres"></div>
            <div class="load_img"></div>

           <!--  <form class="form payform__form" action="#" method="#">
                    <div>
                        <label for="insurant-email" class="form-label" style="margin-top: -19px; margin-left: -5px; font-size: 12px; padding: 0px 4px; background-color: rgb(255, 255, 255);">Ваш E-mail</label>
                        <input type="text" name="insurant_email" id="pay-email_" class="form-control" value="">
                        <div class="invalid-feedback"></div>
                    </div>
                    <div>
                        <label for="insurant-email" class="form-label" style="margin-top: -19px; margin-left: -5px; font-size: 12px; padding: 0px 4px; background-color: rgb(255, 255, 255);">Сумма оплаты</label>
                        <input type="number" name="result['result']" id="pay-sum" class="form-control" value="">
                        <div class="invalid-feedback sum" style="display: none;"></div>
                    </div>
                    <button type="button" class="payform__button">Оплатить</button>
                </form> -->

        </div>
    </div>
</section>
<!--contact-->
    <style type="text/css">
                .load_img {
            background: url(../img/load.gif) #010709 center center no-repeat;
            height: 100%;
            position: fixed;
            width: 100%;
            top: 0;
            display: none;
            left: 0;
            opacity: .2;
            z-index: 2;
        }
        body input:required:valid {
         border-color: #ced4da; 
        }
        .hide{display: none;}
        .form-control.is-invalid{border-color: red;}
    </style>

    
<!-- footer -->
<footer class="footer">
<div class="container footer__container">
	<div class="footer__left">
		<div class="footer__logo">
			<picture>
			  <source srcset="img/logo-footer.webp" type="image/webp">
			  <img loading="lazy" src="img/logo-footer.png" width="250" height="61" alt="logo">
			</picture>
		</div>
		<div class="footer__menu">
			<ul class="list-reset">
				<li><a href="purchase.html">Как купить ОСАГО</a></li>
				<li><a href="index.html#answers">Вопрос/Ответ</a></li>
				<li><a href="politic.html">Политика конфиденциальности</a></li>
				<li><a href="oferta.html">Пользовательское соглашение</a></li>
				<li><a href="contact.html">Контакты</a></li>
			</ul>
		</div>
	</div>
	<div class="footer__right">
		<div class="footer__info">
			<div class="footer__info-mail"><a href="mailto:mobilpoisk24@gmail.com"><img src="img/icon-mail-1.svg" width="28" height="28" alt="icon">mobilpoisk24@gmail.com</a></div>
			<div class="footer__info-tel"><img src="img/icon-phone-1.svg" width="28" height="28" alt="icon"> 8 (800) 999-99-99</div>			
		</div>
	</div>
</div>
</footer>
<!-- footer -->

    <script src="js/jquery-3.4.1.min.js" defer></script>
<script src="libs/owl.carusel-2.3.4/owl.carousel.min.js" defer></script>
<script src="js/main.js" defer></script>
<script src="js/pay-form.js?v=1674911865"></script>
<!-- Yandex.Metrika counter -->

<!-- /Yandex.Metrika counter -->

</body>

</html>