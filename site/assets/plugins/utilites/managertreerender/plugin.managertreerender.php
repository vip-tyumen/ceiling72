<?php
/**
 * ManagerTreeRender
 *
 * Фикс трея, подключение Noto Color Emoji
 *
 * @category     plugin
 * @version      1.0.0
 * @package      evo
 * @internal     @events OnManagerTreeInit,OnManagerTreeRender,OnDocFormRender,OnManagerTopPrerender,OnManagerMainFrameHeaderHTMLBlock
 * @internal     @modx_category Utilites
 * @internal     @installset base
 * @internal     @disabled 0
 * @homepage     https://github.com/ProjectSoft-STUDIONIONS/ManagerTreeRender#readme
 * @license      https://github.com/ProjectSoft-STUDIONIONS/ManagerTreeRender/blob/main/LICENSE GNU General Public License v3.0 (GPL-3.0)
 * @reportissues https://github.com/ProjectSoft-STUDIONIONS/ManagerTreeRender/issues
 * @author       Чернышёв Андрей aka ProjectSoft <projectsoft2009@yandex.ru>
 * @lastupdate   2026-01-16
 */

if (!defined('MODX_BASE_PATH')):
	http_response_code(403);
	die('For');
endif;

$e = &$modx->event;
$params = $e->params;

$output = "";

switch ($e->name) {
	case 'OnManagerTreeRender':
		$output = <<<EOD
<style>
	#treeHolder {max-height: 100%;}
	#treePane {height: 100%;position: relative;}
	.tab-pane > .tab-page {min-height: calc(100% - 40px);}
</style>
EOD;
		$modx->event->output($output);
		break;
	case 'OnDocFormRender':
		$output = <<<EOD
<script>
!(function(){
	let link = 'https://projectsoft-studionions.github.io/noto-color-emoji/',
		content_body = document.getElementById('content_body'),
		a, p;
	if(content_body){
		a = document.createElement('a');
		a.href = link;
		a.target = "_blank";
		a.innerHTML = "здесь";
		p = document.createElement('p');
		p.innerHTML = "Скопировать Emoji для использования в контенте можно ";
		p.append(a);
		p.style.cssText = `margin-top: 10px; margin-bottom: 10px; font-weight: 700; font-style: italic;`;
		content_body.insertAdjacentElement('afterend', p);
	}
}());
</script>
EOD;
		$modx->event->output($output);
		break;
	case 'OnManagerTreeInit':
		$output = <<<EOD
<script>document.body.classList.add('ElementsInTree');</script>
EOD;
		$modx->event->output($output);
		break;
	case 'OnManagerTopPrerender':
	case 'OnManagerMainFrameHeaderHTMLBlock':
		$css_path = 'assets/plugins/utilites/managertreerender/noto-color-emoji.min.css';
		$mtime = is_file(MODX_BASE_PATH . $css_path) ? filemtime(MODX_BASE_PATH . $css_path) : '1768553104';
		$output = <<<EOD
<link rel="stylesheet" type="text/css" href="/{$css_path}?v={$mtime}">
EOD;
		$modx->event->output($output);
		break;
	default:
		// code...
		break;
}
