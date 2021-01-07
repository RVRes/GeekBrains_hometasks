<?php
/*
3. Объявить массив, в котором в качестве ключей будут использоваться
названия областей, а в качестве значений – массивы с названиями городов из
соответствующей области. Вывести в цикле значения массива,
чтобы результат был таким:

Московская область:
Москва, Зеленоград, Клин
Ленинградская область:
Санкт-Петербург, Всеволожск, Павловск, Кронштадт
Рязанская область … (названия городов можно найти на maps.yandex.ru)
*/

$j = file_get_contents('ruscities.json' );
$citiesArray = json_decode($j, true);

// можно ли сразу распарсить JSON объектов в ассоциативный массив?
foreach($citiesArray as $value){
    $citiesArrayAssoc[$value["region"]][] = $value["city"];
}

$currentKey ="";
foreach ($citiesArrayAssoc as $region => $cities) {
    echo "<hr> {$region}: <p>";
    foreach ($cities as $city){
        echo "{$city}";
        if (next($cities)==true) echo ", ";
    };
};