<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For'); 
}
use ProjectSoft\PluginEvolution;

$e =& $modx->event;
$params = $e->params;
switch ($e->name) {
	// Создание дирректории по id документа c учётом родителей
	case "OnDocFormSave":
	case "OnDocDuplicate":
		// Create folders
		PluginEvolution::createDocFolders($modx, $params);
		break;
	// Создание документов pdf, jp(e)g, png, gif, bmp, zip, 7z, rar, doc(x), xls(x),  etc... если они не существуют
	case "OnPageNotFound":
		PluginEvolution::routeNotFound($modx, $params);
		break;
	case "OnManagerMenuPrerender":
		$out = '<style id="gbou_sosh_school">';
		if(is_file(dirname(__FILE__) . "/menu.css")){
			$out .= file_get_contents(dirname(__FILE__) . "/menu.css");
		}
		$out .= "</style>";
		$menuparams = ['logo_changed', 'main', $out, '', '', '', '', 'main', 0, 100, ''];
		$menuparams[3] = 'javscript:;';
		$menuparams[5] = 'return false;';
		$params['menu']['logo_changed'] = $menuparams;
		$modx->event->output(serialize($params['menu']));
		break;
	case "OnWebPagePrerender":
		PluginEvolution::minifyHTML($modx);
		break;
}