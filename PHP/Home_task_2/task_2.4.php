<?php

/*
4. Реализовать функцию с тремя параметрами: function mathOperation($arg1, $arg2, $operation),
где $arg1, $arg2 – значения аргументов, $operation – строка с названием операции.
В зависимости от переданного значения операции выполнить одну из арифметических операций
(использовать функции из пункта 3) и вернуть полученное значение (использовать switch).
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

function mathOperation($arg1, $arg2, $operation) {
	switch ($operation) {
	case "+": return calcSum($arg1, $arg2);
	case "-": return calcSubstract($arg1, $arg2);
	case "*": return calcMultiply($arg1, $arg2);
	case "/": return calcDivision($arg1, $arg2);
	default:
		echo "Операция выбрана неверно (допустимые операции: + - * /)";
		echo "<HR>";
	}
}

echo "<p>$a + $b = ", mathOperation($a, $b, "+"), "</p>";
echo "<p>$a - $b = ", mathOperation($a, $b, "-"), "</p>";
echo "<p>$a * $b = ", mathOperation($a, $b, "*"), "</p>";
echo "<p>$a / $b = ", mathOperation($a, $b, "/"), "</p>";