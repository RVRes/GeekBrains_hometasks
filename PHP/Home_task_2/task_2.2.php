<?php

/*
2. Присвоить переменной $а значение в промежутке [0..15].
С помощью оператора switch организовать вывод чисел от $a до 15.
*/

$a = 10;
if (!is_int($a)) exit;

switch ($a) {
	case 0: echo "<p> 0 </p>";
	case 1: echo "<p> 1 </p>";
	case 2: echo "<p> 2 </p>";
	case 3: echo "<p> 3 </p>";
	case 4: echo "<p> 4 </p>";
	case 5: echo "<p> 5 </p>";
	case 6: echo "<p> 6 </p>";
	case 7: echo "<p> 7 </p>";
	case 8: echo "<p> 8 </p>";
	case 9: echo "<p> 9 </p>";
	case 10: echo "<p> 10 </p>";
	case 11: echo "<p> 11 </p>";
	case 12: echo "<p> 12 </p>";
	case 13: echo "<p> 13 </p>";
	case 14: echo "<p> 14 </p>";
	case 15:
		echo "<p> 15 </p>";
		break;
	default:
		echo "Число задано неверно (должно быть от 0 до 15)";
		echo "<HR>";
}