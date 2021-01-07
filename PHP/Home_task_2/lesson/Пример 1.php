<?
$pay = 'cart';
$prise = 123;
if ($pay == 'cart'){
//
}
if ($pay == 'cart'){
	
}


if ($pay == 'cart') {
	echo "Картой";
	echo "<HR>";
	if ($prise < 1000) {
		echo "от 1000";
	}
} elseif ($pay == 'cart') {
	echo "Наличные";
} else {
	echo "Что-то другое";
	echo "<HR>";
}

switch ($pay) {
	case 'cart': 
		echo "Картой";
		echo "<HR>";
		if ($prise < 1000){
			echo "от 1000";
		}
		break;
	case 'nal': 
		echo "Наличные";
		break;
	default: 
		echo "Что-то другое";
		echo "<HR>";
}
