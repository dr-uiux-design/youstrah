<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/config.php');

date_default_timezone_set("Europe/Moscow");

//$incoming = file_get_contents('php://input');

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

if($input['status']=='successful_payment'){
  
        $mail_text = "Успешно оплачен заказ для " . $input['merchant_order_id'] . "<br>";
        //$mail_text .= "Описание платежа: " . $info['description'] . "<br>";
        $mail_text .= "E-mail: " . $input['merchant_order_id'] . "<br>";
        $mail_text .= "Сумма платежа: " . $input['amount'] . " ₽<br>";
        $mail_text .= "Дата платежа: " . date('d.m.Y H:i') . "<br>";
        //$mail_text .= serialize($_POST);

      if($send_php_mail==1){
          $mail->msgHTML($mail_text);// заменить на $msg .serialize($_POST).'||'.serialize($inputJSON).'||'.serialize($input)
          $mail->Subject = "epay Оплата полиса ОСАГО " . $input['merchant_order_id'] . " - ".$input['amount']." ₽  ";
          $mail->addAddress($to, $to);
          //$mail->addAddress('andrew@ifreework.com', 'andrew@ifreework.com');
          if (!$mail->send()) { //!$mail->send()
            //echo $mail->ErrorInfo;
          } else {
              //echo 'письмо отправлено';
          }
          $mail->clearAddresses();
          $mail->clearAttachments();        
        }else{
            
            //mail($to2, $subject, implode("\r\n", $message), implode("\r\n", $headers));
            mail($to, "EPAY Оплата полиса ОСАГО " . $input['amount'] . "₽  ". $o[0], $input['merchant_order_id']);
        }

        
       
        echo "OK$inv_id\n";
}        