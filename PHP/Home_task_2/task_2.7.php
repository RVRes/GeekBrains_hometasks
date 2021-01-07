<?php

/*
7. *Написать функцию, которая вычисляет текущее время и возвращает его в формате с правильными склонениями,
например:
22 часа 15 минут
21 час 43 минуты
*/


/*
 * $num число, от которого будет зависеть форма слова
 * $wordForm1 основная форма слова (час, минута)
 * $wordForm2 вторая форма слова (часа, минуты)
 * $wordForm3 третья форма слова (часов, минут)
 */
function wordForm($num, $wordForm1, $wordForm2, $wordForm3){
	$nTens = abs($num) % 100; // два первых знака
	$nFirstDigit = $nTens % 10; // первый знак
	if ($nTens > 10 && $nTens < 20) // число 11-20
		return $wordForm3;
	if ($nFirstDigit > 1 && $nFirstDigit < 5) //  2,3,4
		return $wordForm2;
	if ($nFirstDigit == 1) //  1
		return $wordForm1;
	return $wordForm3;
}

    $title = 'Task 2.7';
	date_default_timezone_set('Europe/Moscow');
	$currentHour = date('H') ." ". wordForm((int)date('H'), "час", "часа", "часов");
    $currentMinute = date('i') ." ". wordForm((int)date('i'), "минута", "минуты", "минут");
    $content = "<h1>Текущее время: {$currentHour} {$currentMinute}</h1>";

$html = <<<php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{$title}</title>
</head>
<body>
    {$content}
</body>
</html>
php;


echo $html;