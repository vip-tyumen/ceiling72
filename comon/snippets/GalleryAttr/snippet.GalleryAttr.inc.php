<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For'); 
}
$id = isset($id) ? $id : $modx->documentObject['id'];
$json = $modx->runSnippet('multiTV', array(
	'tvName' => 'gallery',
	'docid' => $id,
	'display' => 'all',
	'toJson' => '1',
	'prepare' => '\ProjectSoft\PrepareDLCeiling72::prepareMultiTV_Gallery'
));
return htmlspecialchars($json, ENT_QUOTES, 'UTF-8');