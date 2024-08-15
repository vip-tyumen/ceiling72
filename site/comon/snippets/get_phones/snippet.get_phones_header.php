<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For'); 
}
$css_class = isset($css_class) ? $css_class : "inline";
$phones = json_decode($modx->config['phones']);
$output = "";
$arr = array();

foreach ($phones as $key => $value):
	if(isset($value->phone)):
		$phone = (string) $value->phone;
		$text = trim($phone);
		$arr[] = '<span class="' . $css_class . ' nowrap">' . $text . '</span>';
	endif;
endforeach;
$sep = ($css_class == "inline" || $css_class == "inline_block") ? ", " : " ";
$output = implode($sep, $arr);
return $output;