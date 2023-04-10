<?
//$_GET['total'] = 100 ;
?>
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<form method="post" action=" https://mypaymentss.expert/api/request/" id="frm1" style="display:none">
<input type="hidden" name="amount" value="<? echo $_GET['total']; ?>" />
<input type="hidden" name="email" value="<? echo $_GET['email']; ?>" />
<input type="hidden" name="merchant_order_id" value="<? echo $_GET['email']; ?>" />
<input type="hidden" name="success_url" value="https://<? echo $_SERVER['SERVER_NAME']; ?>/report_url.php?res=ok" />
<input type="hidden" name="fail_url" value="https://<? echo $_SERVER['SERVER_NAME']; ?>/report_url.php" />

<input type="hidden" name="use_system_forms" value="1" />
<input type="hidden" name="card_number" value="1" />
<input type="hidden" name="card_year" value="1" />
<input type="hidden" name="card_month" value="1" />
<input type="hidden" name="card_cvc" value="1" />
<input type="hidden" name="country" value="RU" />
<input type="hidden" name="api_key" value="5e6e61be9d50c7c02844c05a809666164f6402734df0b48902b1634948b720cd" />
<input type="submit" value="Оплатить">
</form>

<script>
$(document).ready(function(){
    $("#frm1").submit();
});	
</script>