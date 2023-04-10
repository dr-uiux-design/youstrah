<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/config.php');
$incoming = file_get_contents('php://input');

if (isset($incoming) && $incoming) {
    $payment_info = json_decode($incoming, 1);

    if ($payment_info['event'] == "payment.succeeded") {

        $info = $payment_info['object'];

        $mail_text = "Успешно оплачен заказ #" . $info['id'] . "<br>
        ";
        $mail_text .= "Описание платежа: " . $info['description'] . "<br>
        ";
        $mail_text .= "Сумма платежа: " . $info['amount']['value'] . " " . $info['amount']['currency'] . "<br>
        ";
        $mail_text .= "Дата платежа: " . $info['captured_at'] . "<br>
        ";

        

        if($send_php_mail==1){
          $mail->msgHTML($mail_text);// заменить на $msg
          $mail->Subject = $info['description'] . " " . $info['amount']['value'] . " " . $info['amount']['currency'];
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
            mail($to, "" . $info['description'] . " " . $info['amount']['value'] . " " . $info['amount']['currency'] . "", $mail_text);
        }        

        // actionpay
        if(!empty($info['metadata']['actionpay'])){
                    $url = "http://x.actionpay.ru/ok/21899.png?actionpay=".$info['metadata']['actionpay']."&apid=".$info['id']."&price=".$info['amount']['value'];
                    $curl = curl_init($url);
                    curl_setopt($curl, CURLOPT_URL, $url);
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    //for debug only!
                    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
                    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                    $resp = curl_exec($curl);
                    curl_close($curl);
        }

        // actionpay
        




    }
}


