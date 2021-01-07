<?php
/*
8. *Повторить третье задание, но вывести на экран только города,
начинающиеся с буквы «К».
*/

$j = file_get_contents('ruscities.json' );
$citiesArray = json_decode($j, true);

foreach($citiesArray as $value){
    $citiesArrayAssoc[$value["region"]][] = $value["city"];
}

// я мог бы и при парсе JSON поймать города на К, но по условию у меня
// ассоциативный массив, поэтому так.
$cityStartLetter ="К";
$str="";
foreach ($citiesArrayAssoc as $cities) {
    foreach ($cities as $city){
    // с русскими буквами только mb_substr корректно использовать?
        if (mb_substr($city,0,1,"UTF-8")===$cityStartLetter) {
            if (strlen($str)>0) {$str .=", ";};
            $str .= $city;
        };
    };
};
echo ($str);