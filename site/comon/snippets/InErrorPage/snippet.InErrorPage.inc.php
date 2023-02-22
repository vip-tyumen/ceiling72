<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For');
}
/*
[(site_unavailable_page)] - 10
[(unauthorized_page)] - 11
[(error_page)] - 12
*/
$id = $modx->documentObject['id'];
$pages = array(
	$modx->config['site_unavailable_page'],
	$modx->config['unauthorized_page'],
	$modx->config['error_page']
);
return in_array($id, $pages) ? 0 : 1;
