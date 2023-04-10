<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/config.php');
date_default_timezone_set("Europe/Moscow");


if($_POST['resultStr']=='транзакция оплачена полностью'){
        $mail_text = "Успешно оплачен заказ " . $_POST['order_id'] . "<br>";
        $mail_text .= "Описание платежа: " . $_POST['name'] . "<br>";
        $mail_text .= "E-mail: " . $_POST['email'] . "<br>";
        $mail_text .= "Сумма платежа: " . $_POST['cost'] . "₽<br>";
        $mail_text .= "Дата платежа: " . date('d.m.Y H:i') . "<br>";

        
      if($send_php_mail==1){
          $mail->msgHTML($mail_text);// заменить на $msg
          $mail->Subject = $_POST['name'] . " " . $_POST['cost'] . "₽";
          $mail->addAddress($to, $to);
          if (!$mail->send()) { //!$mail->send()
            //echo $mail->ErrorInfo;
          } else {
              //echo 'письмо отправлено';
          }
          $mail->clearAddresses();
          $mail->clearAttachments();        
        }else{
          	mail($to, "" . $_POST['name'] . " " . $_POST['cost'] . "₽", $mail_text);
        	//mail($to2, $subject, implode("\r\n", $message), implode("\r\n", $headers));
        }        
        
        echo 'OK';
}                

 //mail("@.com", "Оплата полиса ОСАГО", serialize($_POST));
   
    


