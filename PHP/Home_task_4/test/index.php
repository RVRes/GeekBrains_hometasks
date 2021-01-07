<?php
/**
 * Created by PhpStorm.
 * User: ScorpioN
 * Date: 08.12.2018
 * Time: 0:22
 */

//require_once ('2.php');
//var_dump($a);

//$file = fopen('log.txt', 'a');
//fwrite($file, "string1\r\n");
//fclose($file);

//2.
//$array = [];
//for ($i = 1; $i <= 10; $i++) {
//    $array [] = 'string' . $i;
//}
//
//$file = fopen ('log.txt', 'a');
//fwrite($file, implode("\r\n", $array));
//fclose($file);

//3.
$array = [];
for ($i = 1; $i <= 10; $i++) {
    $array [] = 'string' . $i;
}
file_put_contents('log.txt',implode("\r\n", $array), FILE_APPEND);

//include ('log.txt');

echo file_get_contents('http://yandex.ru/');