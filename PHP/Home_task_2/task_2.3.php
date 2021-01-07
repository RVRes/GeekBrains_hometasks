<?php

/*
3. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами.
Обязательно использовать оператор return.
*/

$a = 30;
$b = 5;

function calcSubstract($a, $b) {
	return $a - $b;
}

function calcMultiply($a, $b) {
	return $a * $b;
}

function calcSum($a, $b) {
	return $a + $b;
}

function calcDivision($a, $b) {
	return $a / $b;
}

echo "<p>$a + $b = ", calcSum($a, $b), "</p>";
echo "<p>$a - $b = ", calcSubstract($a, $b), "</p>";
echo "<p>$a * $b = ", calcMultiply($a, $b), "</p>";
echo "<p>$a / $b = ", calcDivision($a, $b), "</p>";