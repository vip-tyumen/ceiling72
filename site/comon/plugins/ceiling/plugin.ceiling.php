<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('For'); 
}
use ProjectSoft\PluginEvolution;
//
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
		// 10, 11, 12
		$arr = [
			$modx->config['site_unavailable_page'],
			$modx->config['unauthorized_page'],
			$modx->config['error_page']
		];
		$id = (int)$modx->documentIdentifier;
		if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'):
			$ob = new stdClass();
			header("Content-type: application/json; charset=utf-8");
			if (!in_array($id, $arr)):
				if(!empty($_POST["formid"])):
					$fid = $_POST["formid"];
					switch($fid){
						case "callme":
							$str = $modx->documentOutput;
							$re = '/(?:<!--InitFormCallme-->(?<callme>.*)<!--FormCallme-->)/Usi';
							preg_match_all($re, $str, $matches, PREG_PATTERN_ORDER, 0);
							$ob->forms= array(
								"form"=>trim($matches["callme"][0])
							);
							break;
						case "zamer":
							$str = $modx->documentOutput;
							$re = '/(?:<!--InitFormZamer-->(?<callme>.*)<!--FormZamer-->)/Usi';
							preg_match_all($re, $str, $matches, PREG_PATTERN_ORDER, 0);
							$ob->forms= array(
								"form"=>trim($matches["callme"][0])
							);
							break;
						case "calc":
							$str = $modx->documentOutput;
							$re = '/(?:<!--InitFormCalc-->(?<callme>.*)<!--FormCalc-->)/Usi';
							preg_match_all($re, $str, $matches, PREG_PATTERN_ORDER, 0);
							$ob->forms= array(
								"form"=>trim($matches["callme"][0])
							);
							break;
						default:
							break;
					}
				endif;
				$modx->documentOutput = json_encode($ob);
			else:
				$ob->forms = array(
					"form" => "Not found output"
				);
				$modx->documentOutput = json_encode($ob);
				if ($id == $modx->config['site_unavailable_page']):
					$responseCode = 'HTTP/1.0 503 Service Unavailable';
					header($responseCode);
					$modx->sendForward($id, $responseCode);
				endif;
				if ($id == $modx->config['unauthorized_page']):
					$responseCode = 'HTTP/1.1 401 Unauthorized';
					header($responseCode);
					$modx->sendForward($id, $responseCode);
				endif;
				if ($id == $modx->config['site_unavailable_page']):
					$responseCode = 'HTTP/1.0 404 Not Found';
					header($responseCode);
					$modx->sendForward($id, $responseCode);
				endif;
			endif;
		endif;
		if (in_array($id, $arr)):
			if ($id == $modx->config['site_unavailable_page']):
				$responseCode = 'HTTP/1.0 503 Service Unavailable';
				header($responseCode);
				$modx->invokeEvent('OnPageNotFound');
			endif;
			if ($id == $modx->config['unauthorized_page']):
				$responseCode = 'HTTP/1.1 401 Unauthorized';
				header($responseCode);
				$modx->invokeEvent('OnPageUnauthorized');
			endif;
			if ($id == $modx->config['error_page']):
				$responseCode = 'HTTP/1.0 404 Not Found';
				header($responseCode);
				$modx->invokeEvent('OnPageNotFound');
			endif;
		endif;
		PluginEvolution::minifyHTML($modx);
		break;
}
