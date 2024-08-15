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
		$re = '/[ \(\)-]+/m';
		$link = "tel:" . trim(preg_replace($re, "", $phone));
		$re = '/^\+7/';
		$text = preg_replace($re, "8", trim($phone));
		$arr[] = '<span class="' . $css_class . ' nowrap">☎️&nbsp;<a href="' . $link . '">' . $text . '</a></span>';
	endif;
endforeach;
$sep = ($css_class == "inline" || $css_class == "inline_block") ? ", " : " ";
$output = implode($sep, $arr);
return $output;