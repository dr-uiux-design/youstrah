<?
$data2 = file_get_contents('php://input');
$data  = json_decode($data2);
// расчёт КБМ
//$fio = explode(' ', $driver[0]); 


$url = 'https://kbmzero.ru/API/';
$post_data = array(
  'API'   => 'b347a7e-fcc625b-01c0673-6c8d7e8-5609',
  'GetKBM'  => true,
  'F'   => $data->lastname,
  'I'   => $data->firstname,
  'O'   => $data->middlename,
  'Birthday'  => $data->birthday,
  'SerialVU'  => $data->driverDocSeries,
  'NumberVU'  => $data->driverDocNumber
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
$res = curl_exec($ch);
curl_close($ch);
$response = json_decode($res, true);
$kbm = $response['results'][0]['kbm'];
//if($i>1){
//sleep(1);
//}

$code = $response['status'];

if (empty($code)) {
  $kbm = "Сервис проверки КБМ недоступен";
  $kbm = 1.16;
}
if ($code == 'error') {
  $kbm = "КБМ сервер вернул ошибку pro ФИО";
  $kbm = 1.165;
}
if ($kbm == '1.') {
  $kbm = "КБМ водителя не найден";
  $kbm = 1.169;
}


//$myObj->kbmValue[] = $data;
//$myObj[] = $kbm;
echo $kbm;

          //print_r($data->lastname);
