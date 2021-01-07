<?

$a = 10;
$b =& $a;
$a = 12;

echo $b;

exit;
function say($name, $say = 'Hello') {
	$age = $age + 1;
	echo "$name, $say. $age  <hr>";
}

$age = 12;

say('John');

var_dump($age);

