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
  				'total'=>'100.00',
  				'email'=>'rrrrtt@gmail.com',
  				'fio'=>'fio fio2 fio3',
  				'phone'=>24334234234,	
  				);
  }

  $total = str_replace(".", "", $_GET['total']);
  //$total = preg_replace("/[^0-9]/", '', $total);
  //echo  $total;
	?>
  
<script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"></script>

<form name="TinkoffPayForm" onsubmit="pay(this); return false;" id="frm1" style="display: none">
  <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1675158789750"> <!-- TinkoffBankTest -->
    <input class="tinkoffPayRow" type="hidden" name="frame" value="false">
    <input class="tinkoffPayRow" type="hidden" name="language" value="ru"> 
    <input class="tinkoffPayRow" type="text" value="<? echo $_GET['total']; ?>" name="amount">
    <input class="tinkoffPayRow" type="text" value="<? echo $_GET['email'].' '.time(); ?>" name="order">
    <input class="tinkoffPayRow" type="text" value="Оплата полиса ОСАГО для пользователя <? echo $_GET['email']; ?>" name="description">
    <input class="tinkoffPayRow" type="text" value="<? echo $_GET['fio']; ?>" name="name">
    <input class="tinkoffPayRow" type="text" value="<? echo $_GET['email']; ?>" name="email">
    <input class="tinkoffPayRow" type="text" value="<? echo $_GET['phone']; ?>" name="phone">
    
    <input class="tinkoffPayRow" type="text" name="receipt" id="receipt" value='<? //echo json_encode($arr); ?>'>
    <input class="tinkoffPayRow" type="submit" value="Оплатить">
</form>

<script>
$(document).ready(function(){

 var value = JSON.stringify({
                    "Email": '<? echo $_GET['email']; ?>',
                    "Phone": '<? echo $_GET['phone']; ?>',
                    "EmailCompany": '<? echo $_GET['email']; ?>',
                    "Taxation": "patent",
                    "Items": [
                        {
                            "Name": '<? echo $_GET['fio']; ?>',
                            "Price": '<? echo $total; ?>',
                            "Quantity": 1.00,
                            "Amount": '<? echo $total; ?>',
                            "PaymentMethod": "full_prepayment",
                            "PaymentObject": "service",
                            "Tax": "none"
                        }
                    ]
                }); 
    $('#receipt').val(value);
    $("#frm1").submit();
});	
</script>


</body>
</html>