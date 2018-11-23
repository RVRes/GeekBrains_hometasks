<?php
    $title = 'Task 1.4';
    $currentYear = getdate()['year'];
    $content = "<h1>Current year: {$currentYear}</h1>";

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