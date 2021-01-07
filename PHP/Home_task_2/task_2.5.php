<?php
    $title = 'Task 2.5';
    $currentYear = getdate()['year'];
    $content = "<h2>Current year: {$currentYear}</h2>";

$html = <<<php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{$title}</title>
	<style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        .wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
  	</style>
</head>
<body>
<div class="wrapper">
 	<div class="content"></div>
 	<div class="footer">
    	<hr>
    	{$content}
  	</div>
</div>
</body>
</html>
php;

echo $html;