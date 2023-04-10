<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="description" content="Webpage description goes here" />
  <meta charset="utf-8">
  <title>Loading</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="">
  <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
</head>

<body>
<?

if(empty($_GET['total'])){
	$_GET = array(
			'total' =>  10,
			'email' =>  'sdf@sd.sd',
			//'custom_fields' =>  urlencode('Букин Виктор Иванович'),
			'fio' =>  'Букин Виктор Иванович',
	);
}



$_POST = array(
 'cost'           =>  $_GET['total'],
 'name'           =>  'Оплата полиса ОСАГО для пользователя '.$_GET['email'], 
 'default_email'         =>  $_GET['email'],
 'order_id'     =>  time(),
 //'custom_fields'     =>  urlencode($_GET['fio'].'#'.$_GET['email'].'#'.$_SERVER['SERVER_NAME']),
);



echo '
<form method="POST" class="application" accept-charset="UTF-8" action="https://partner.life-pay.ru/alba/input/" id="frm1" style="display:none">
	<input type="hidden" name="key" value="5SDtm2kbX+sI2z5gIFAxJ8seg8M5+vEqmFGE5a5QN0M=" />
	';
	foreach ($_POST as $key => $value) {
		echo '<input type="hidden" name="'.$key.'" value="'.$value.'" />';
	}

	echo '
  <input type="submit" value="Оплатить" />
</form>
';

?>

<script>
$(document).ready(function(){
    $("#frm1").submit();
});	
</script>


</body>
</html>