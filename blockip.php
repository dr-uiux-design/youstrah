<?php
$all_blocked = 'block';


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

$blocked_mail = array(
'belov@roverdon.ru',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'muradyan_02096@mail.ru',
);


$blocked_ip = array(
'178.176.214.214',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'46.62.84.203',
);

//ГОрода начало 

$address = array(
	'newyork',
	'СОЛОНЕШНОЕ',
	'хаврино'
);

foreach ($address as $key => $value) {
	$address[$key]=mb_strtolower(trim($value));
}

// 

$sity['address_s'] = explode(' ', $_POST['address_s']);
$sity['address_strah'] = explode(' ', $_POST['address_strah']);

foreach ($sity['address_s'] as $key => $value) {
	if (in_array(mb_strtolower(trim($value)), $address)) {
	    $address_block = "block";
	}
}
foreach ($sity['address_strah'] as $key => $value) {
	if (in_array(mb_strtolower(trim($value)), $address)) {
	    $address_block = "block";
	}
}


// конец городам




foreach ($blocked_mail as $key => $value) {
	$blocked_mail_mb_strtolower[] = mb_strtolower($value);
}

$mail = strtolower($_POST['email']);
$get_ip = get_ip();



if(!isset($all_blocked)){
	if (in_array(mb_strtolower(trim($mail)), $blocked_mail_mb_strtolower)) {
	    $echo = "block";
	} else if (in_array($get_ip, $blocked_ip)) {
	    $echo = "block";
	} else if($address_block=='block') {
	    $echo = "block";
	}
}else{
	$echo = $all_blocked;
}



echo '<input type="hidden" value="'.$echo.'" name="brez">';
echo '<input type="hidden" value="'.date('H:i').'" name="time">';

?>