<?php

/*
6. *С помощью рекурсии организовать функцию возведения числа в степень.
Формат: function power($val, $pow), где $val – заданное число, $pow – степень.
*/

function Power($val, $pow) {
  if ($pow == 0) {
    return 1;
  }
  if ($pow < 0) {
    return Power(1/$val, -$pow);
  }
  return $val * Power($val, $pow-1);
}

var_dump(Power(2, 3));