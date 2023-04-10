<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/config.php');

function get_ip() {
    $get_ip = '';
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
      $get_ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $get_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
      $get_ip = $_SERVER['REMOTE_ADDR'];
    }
    return $get_ip;
}
$no_email = 0;
$ip = get_ip();


  
//$m_pay = 1; // - оплата через яндекс
//$m_pay = 2; // - оплата через tinkoff
//$m_pay = 3; // - оплата через life-pay.ru
$m_pay = 4; // - оплата через e-pay 
$our_form = 1; // если 1 - показать нашу форму



$data = array();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

//echo $_SERVER['REQUEST_METHOD'];
//echo $_SERVER["CONTENT_TYPE"];

require __DIR__ . '/library/autoload.php';
use YooKassa\Client;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_SERVER["CONTENT_TYPE"]) && $_SERVER["CONTENT_TYPE"] === 'application/json') {

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

    if($input['insurant_email']=='harom2007@ya.ru'){
      $m_pay = 4;
    }    

    // if(!empty($input['result']['result'])){
    //   $input['result']['result'] = str_replace(" ", "", $input['result']['result']);
    //   $input['result']['result'] = str_replace(",", "", $input['result']['result']);
    //   $input['result']['result'] = number_format($input['result']['result'], 2, '.', '');
    // }

    if($input['brand']=='Другое ТС'){
      $input['model'] = $input['modelcustom'];
      $input['brand'] = $input['brandcustom'];
    }
    if($input['model']=='Другая модель'){
      $input['model'] = $input['modelcustom'];
    }

    $vinTypes = array(
      'vin' => 'VIN',
      'k' => 'Номер кузова',
      'sh' => 'Номер шасси',
    );

    $vehicleDocumentTypes = array(
      'sts' => 'СТС',
      'pts' => 'ПТС',
      'epts' => 'ЕПТС',
    );

    $companies = array(
      'ros' => 'Росгосстрах',
      'alf' => 'Альфастрахование',
      'ren' => 'Ренессанс',
    );

    
    

    $subject = $input['company'] ? 'Заявка' : 'Расчет';
    $subject .= ' osago-buy.ru '.$input['insurantEmail'];

    //$headers = array('Content-Type: text/plain; charset=utf-8');
    $headers[] = 'Content-Type: text/plain; charset=utf-8';
    $headers[] = 'From: OSAGO webmaster@osago.ru';

    $message = array();
    $message[] = 'Дата начала страхования: ' . $input['insuranceDate'];
    $message[] = 'E-mail: ' . $input['insurantEmail'];
    $message[] = 'IP-адрес клиента: ' . $ip;
    $message[] = 'Телефон: ' . $input['insurantTelephone'];
    $message[] = '------------';
    $message[] = 'Автомобиль:';
    $message[] = 'Категория: Категория ' . $input['category'];
    $message[] = 'Марка: ' . $input['brand'];
    $message[] = 'Модель: ' . $input['model'];
    $message[] = 'Год: ' . $input['year'];
    $message[] = 'Мощность: ' . $input['power'];
    $message[] = 'Гос. номер ТС: ' . ($input['plateless'] ? 'ОТСУТСТВУЕТ' : $input['plate']);
    $message[] = 'Номер ТС: ' . $input['vinNumber'] . ' (' . $vinTypes[$input['vinType']] . ')';
    $message[] = 'Тип документа на ТС: ' . $vehicleDocumentTypes[$input['vehicleDocumentType']];
    $message[] = 'Номер ' . $vehicleDocumentTypes[$input['vehicleDocumentType']] . ': ' . $input['vehicleDocumentSeria'] . ' ' . $input['vehicleDocumentNumber'];
    $message[] = 'Дата выдачи документа на ТС: ' . $input['vehicleDocumentDate'];
    $message[] = '------------';
    $message[] = 'Данные страхователя:';
    $message[] = 'ФИО: ' . $input['insurantSurname'] . ' ' . $input['insurantName'] . ' ' . $input['insurantMidname'];
    $message[] = 'Дата рождения: ' . $input['insurantBirthdate'];
    $message[] = 'Серия паспорта: ' . $input['insurantSeria'];
    $message[] = 'Номер паспорта: ' . $input['insurantNumber'];
    $message[] = 'Дата выдачи паспорта: ' . $input['insurantIssuedate'];
    $message[] = 'Кем выдан: ' . $input['insurantIssuer'];
    $message[] = 'Адрес регистрации: ' . $input['insurantAddress'];
    $message[] = '------------';
    $message[] = 'Страхователь является собственником: ' . ($input['ownerless'] ? 'Да' : 'Нет');
    $message[] = '------------';

    if (!$input['ownerless']) {
      $message[] = 'Данные собственника:';
      $message[] = 'ФИО: ' . $input['ownerSurname'] . ' ' . $input['ownerName'] . ' ' . $input['ownerMidname'];
      $message[] = 'Дата рождения: ' . $input['ownerBirthdate'];
      $message[] = 'Серия паспорта: ' . $input['ownerSeria'];
      $message[] = 'Номер паспорта: ' . $input['ownerNumber'];
      $message[] = 'Дата выдачи паспорта: ' . $input['ownerIssuedate'];
      $message[] = 'Кем выдан: ' . $input['ownerIssuer'];
      $message[] = 'Адрес регистрации: ' . $input['ownerAddress'];
      $message[] = '------------';
    }

    $message[] = 'Открытая страховка: ' . ($input['driversCount'] === 'unlimited' ? 'Да' : 'Нет');
    $message[] = '------------';

    if ($input['driversCount'] === 'limited') {
      $message[] = 'Данные водителей:';
      foreach ($input['drivers'] as $i => $driver) {



        // расчёт КБМ

        $message[] = 'Водитель ' . ($i + 1) . ':';
        $message[] = 'ФИО: ' . $driver['surname'] . ' ' . $driver['name'] . ' ' . $driver['midname'];
        $message[] = 'КБМ: ' . $driver['kbm']; //$driver['kbm']
        $message[] = 'КВС: ' . $driver['kvs'];
        $message[] = 'Дата рождения: ' . $driver['birthdate'];                
        $message[] = 'Дата начала стажа: ' . $driver['expdate'];
        $message[] = 'Серия в/у: ' . $driver['licenseSeries'];
        $message[] = 'Номер в/у: ' . $driver['licenseNumber'];
        $message[] = '------------';
      }
    }

    if ($input['company']) {
      $message[] = 'Компания, выбранная для оформления ОСАГО: ' . $companies[$input['company']];

      $input['result']['result'] = str_replace(" ", "", $input['result']['result']);
      $input['result']['result'] = str_replace(",", "", $input['result']['result']);
      $input['result']['result'] = number_format($input['result']['result'], 2, '.', '');

      $message[] = 'Стоимость: ' . $input['result']['result'] . ' руб.';
      $message[] = '------------';
      $message[] = 'Расчетные данные:';
      $message[] = 'ТБ: ' . $input['result']['tbs'][$input['company']] . ' руб.';
    } else {
      foreach ($companies as $key => $value) {
        $message[] = 'ТБ ' . $value . ': ' . $input['result']['tbs'][$key] . ' руб.';
      }
    }

    $message[] = 'КС: ' . $input['result']['ks'];
    $message[] = 'КТ: ' . $input['result']['kt'];
    $message[] = 'КП: ' . $input['result']['kp'];
    $message[] = 'КБМ: ' . $input['result']['kbm'];
    $message[] = 'КВС: ' . $input['result']['kvs'];
    $message[] = 'КО: ' . $input['result']['ko'];
    $message[] = 'КМ: ' . $input['result']['km'];

    if (!$input['company']) {
      foreach ($companies as $key => $value) {

        // $input['result']['allResults'][$key] = str_replace(" ", "", $input['result']['allResults'][$key]);
        // $input['result']['allResults'][$key] = str_replace(",", "", $input['result']['allResults'][$key]);
        // $input['result']['allResults'][$key] = number_format($input['result']['allResults'][$key], 2, '.', '');

        $message[] = $value . ': ' . $input['result']['allResults'][$key] . ' руб.';
      }
    }

    //$message[] = serialize($input['result']['allResults']);

    if ($input['company']) {



      $input['subject'] = $subject;
      $input['time_cr'] = time();
      $input['ip'] = $ip;


      $ch = curl_init('https://dkbm-web.autoinr.net/admin/webhook_data.php');
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($input, '', '&'));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_HEADER, false);
      $html = curl_exec($ch);
      curl_close($ch);


      if($m_pay == 1){
      // оплата яндекс

      $total = str_replace(" ", "", $input['result']['result']);
      $total = preg_replace("/[^0-9]/", '', $total);
      $total = $total/100;
      $total = number_format($total, 2, '.', '');

      if($input['company']=='оплата со страницы views/pay.php'){
        $input['insurantEmail'] = $input['insurant_email'];
        $total = (float)$input['result'];      
        $no_email = 1;
      }
      
      $email = $input['insurantEmail'];
      //$total = 1;

      $client = new Client();
      $client->setAuth('978363', 'live_pF_tyERED0xVpZRO3tsQ0g_4VuafZmnB65mPjZKfs7A');

      $payment = $client->createPayment(
          array(
              'amount' => array(
                  'value' => $total,
                  'currency' => 'RUB',
              ),
              'confirmation' => array(
                  'type' => 'redirect',
                  'return_url' => 'https://'.$_SERVER['SERVER_NAME'].'/',
              ),
              'capture' => true,
              'description' => 'Оплата полиса ОСАГО для пользователя ' . $email,
              'metadata' => array(
                  'order_id' => time(),
                  'actionpay' => $_COOKIE["actionpay"],//// actionpay
              )
          ),
          uniqid('', true)
      );

      if (isset($payment['confirmation']['confirmation_url']) && $payment['confirmation']['confirmation_url']) {
          $redirect = $payment['confirmation']['confirmation_url'];
      } else {
          $redirect = false;
      }

      $message[] = 'Ссылка на оплату: ' . $redirect;
      // оплата яндекс
      }

      

      if($m_pay == 2){
        // оплата tinkoff


        $total = preg_replace("/[^0-9]/", '', $input['result']['result']);
        $total = $total/100;
        $total = number_format($total, 2, '.', '');
        $email = $input['insurantEmail'];
        if($input['company']=='оплата со страницы views/pay.php'){
          $input['insurantEmail'] = $input['insurant_email'];
          $email = $input['insurant_email'];
          $total = (float)$input['result'];      
          $no_email = 1;
        }         
        $redirect = 'tinkoff.php?total='.$total.'&email='.$email.'&fio='.urlencode($input['insurantSurname'] . ' ' . $input['insurantName'] . ' ' . $input['insurantMidname']).'&phone='.$input['insurantTelephone'];
        $message[] = 'Ссылка на оплату: https://'.$_SERVER['SERVER_NAME'].'/' . $redirect;
      }
      if($m_pay == 3){
        // оплата life-pay.ru
        $total = preg_replace("/[^0-9]/", '', $input['result']['result']);
        $total = $total/100;
        $total = number_format($total, 2, '.', '');
        $email = $input['insurantEmail'];
        if($input['company']=='оплата со страницы views/pay.php'){
          $input['insurantEmail'] = $input['insurant_email'];
          $email = $input['insurant_email'];
          $total = (float)$input['result'];      
          $no_email = 1;
        }         
        $redirect = 'life_pay.php?total='.$total.'&email='.$email.'&fio='.urlencode($input['insurantSurname'] . ' ' . $input['insurantName'] . ' ' . $input['insurantMidname']).'&phone='.$input['insurantTelephone'];
        $message[] = 'Ссылка на оплату: https://'.$_SERVER['SERVER_NAME'].'/' . $redirect;
      }  
      if($m_pay == 4){
        // оплата e-pay
        $total = preg_replace("/[^0-9]/", '', $input['result']['result']);
        $total = $total/100;
        $total = number_format($total, 2, '.', '');
        $email = $input['insurantEmail'];
        if($input['company']=='оплата со страницы views/pay.php'){
          $email = $input['insurant_email'];
          $total = (float)$input['result'];      
          $no_email = 1;
        }
        if($our_form==1){
          $file = 'pay_form_epay.php';
        }else{
          $file = 'e-pay.php';
        }         
        $redirect = 'https://'.$_SERVER['SERVER_NAME'].'/'.$file.'?total='.$total.'&email='.$email.'&fio='.urlencode($input['insurantSurname'] . ' ' . $input['insurantName'] . ' ' . $input['insurantMidname']).'&phone='.$input['insurantTelephone'].'';
        $message[] = 'Ссылка на оплату: ' . $redirect;
      }          




    }

    if($no_email != 1){

      if($send_php_mail==1){
          $mail->msgHTML(implode("<br>", $message));// заменить на $msg
          $mail->Subject = $subject;
          $mail->addAddress($to, $to);
          if (!$mail->send()) { //!$mail->send()
            //echo $mail->ErrorInfo;
          } else {
              //echo 'письмо отправлено';
          }
          $mail->clearAddresses();
          $mail->clearAttachments();        
        }else{
          mail($to, $subject, implode("\r\n", $message), implode("\r\n", $headers));
        //mail($to2, $subject, implode("\r\n", $message), implode("\r\n", $headers));
        }





    }
    

    $data['status'] = 'success';
    $data['pay_url'] = $redirect;
    $data['result'] = $input;
    $data['total'] = $total;
    //$data['email'] = serialize($input);
    $data['paytotal'] = $input['result'];//company
    $data['company'] = $input['company'];
    echo json_encode($data);
  }
}
