<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For'); 
}
$phones = json_decode($modx->config['phones']);
$output = "";
$arr = array();

foreach ($phones as $key => $value):
	if(isset($value->phone)):
		$phone = (string) $value->phone;
		$text = trim($phone);
		$arr[] = $text;
	endif;
endforeach;
$sep = "<br>";
$output = implode($sep, $arr);
return $output;