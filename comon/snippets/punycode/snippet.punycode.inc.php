<?php
use ProjectSoft\idna_convert;
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For'); 
}
$idna = new idna_convert();
$input = isset($input) ? (string)$input : $_SERVER['HTTP_HOST'];
$type = isset($type) ? (string)$type : 'decode';
$domain = isset($domain) ? ($domain == 1 ? 1 : 0) : 0;
$result = $type == 'decode' ? $idna->decode($input) : $idna->encode($input);
$array = explode('.', $result);
if(count($array) > 2 && $domain):
	$result = implode('.', array_slice($array, count($array) - 2));
endif;

return $result;