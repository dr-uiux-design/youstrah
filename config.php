<?
use PHPMailer\PHPMailer\PHPMailer;
require $_SERVER['DOCUMENT_ROOT'] . '/PHPMailer/Exception.php';
require $_SERVER['DOCUMENT_ROOT'] . '/PHPMailer/PHPMailer.php';
require $_SERVER['DOCUMENT_ROOT'] . '/PHPMailer/SMTP.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->IsHTML(true);
$mail->CharSet = 'utf-8';
$mail->Host = 'smtp.mail.ru';
$mail->SMTPAuth = true;
$mail->SMTPKeepAlive = true;
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
$mail->Username = 'space@space--x.space';
$mail->Password = 'FZxBHhz70YDVyhRLqrp6';
$mail->setFrom('space@space--x.space', 'OSAGO');

$send_php_mail = 1; // 1 - отправка через PHPMailer , 0 - отправка через mail()

$to = 'mobilpoisk24@gmail.com';