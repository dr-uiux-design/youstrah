<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/config.php');

date_default_timezone_set("Europe/Moscow");

$incoming = file_get_contents('php://input');

if (isset($incoming) && $incoming) {
    $payment_info = json_decode($incoming, 1);

    if ($payment_info['Status'] == "CONFIRMED") {



        $Amount = $payment_info['Amount']/100;

        $o = explode(' ', $payment_info['OrderId']);

        $info = $payment_info['object'];

        $mail_text = "Успешно оплачен заказ " . $o[1] . "<br>";
        //$mail_text .= "Описание платежа: " . $info['description'] . "<br>";
        $mail_text .= "E-mail: " . $o[0] . "<br>";
        $mail_text .= "Сумма платежа: " . $Amount . " ₽<br>";
        $mail_text .= "Дата платежа: " . date('d.m.Y H:i') . "<br>";

        //mail("@.com", "" . $info['description'] . " " . $info['amount']['value'] . " " . $info['amount']['currency'] . "", $mail_text);
        //mail("@.com", "🕑 ".date("H:m")." bybit  USDT/XETA -> XETA/GSTS -> GSTS/USDT", serialize($_POST));

        //mail("@.com", "Оплата полиса ОСАГО " . $Amount . "₽  ". $o[0], $mail_text);

      if($send_php_mail==1){
          $mail->msgHTML($mail_text);// заменить на $msg
          $mail->Subject = "TIN Оплата полиса ОСАГО " . $Amount . " ₽  ". $o[0];
          $mail->addAddress($to, $to);
          if (!$mail->send()) { //!$mail->send()
            //echo $mail->ErrorInfo;
          } else {
              //echo 'письмо отправлено';
          }
          $mail->clearAddresses();
          $mail->clearAttachments();        
        }else{
            
            //mail($to2, $subject, implode("\r\n", $message), implode("\r\n", $headers));
            mail($to, "Оплата полиса ОСАГО " . $Amount . "₽  ". $o[0], $mail_text);
        }

        
       
        echo 'OK';
                 

 
    }
}   
    


