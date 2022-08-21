<?php
if(!defined('MODX_BASE_PATH')) die('What are you doing? Get out of here!');

$object = $modx->documentObject;
$ID = $object['id'];
$img = $object['imageSoc'][1];
$out = "";
if(is_file(MODX_BASE_PATH . $img)):
	$og_1 = $modx->runSnippet('phpthumb', array(
		'input'		=> $img,
		'options'	=> 'w=640,h=320,f=jpg,zc=C'
	));
	$og_2 = $modx->runSnippet('phpthumb', array(
		'input'		=> $img,
		'options'	=> 'w=537,h=240,f=jpg,zc=C'
	));
	$og_3 = $modx->runSnippet('phpthumb', array(
		'input'		=> $img,
		'options'	=> 'w=400,h=400,f=jpg,zc=C'
	));
	$out = '<meta itemprop="image" content="' . $modx->config['site_url'] . $og_1 . '">' . PHP_EOL;
	$out .= '<meta property="og:image" content="' . $modx->config['site_url'] . $og_1 . '">' . PHP_EOL;
	$out .= '<meta property="og:image:width" content="640">' . PHP_EOL;
	$out .= '<meta property="og:image:height" content="320">' . PHP_EOL;
	$out .= '<meta property="og:image" content="' . $modx->config['site_url'] . $og_2 . '">' . PHP_EOL;
	$out .= '<meta property="og:image:width" content="537">' . PHP_EOL;
	$out .= '<meta property="og:image:height" content="240">' . PHP_EOL;
	$out .= '<meta property="og:image:type" content="image/jpeg">' . PHP_EOL;
	$out .= '<meta property="og:image" content="' . $modx->config['site_url'] . $og_3 . '">' . PHP_EOL;
	$out .= '<meta property="og:image:width" content="400">' . PHP_EOL;
	$out .= '<meta property="og:image:height" content="400">';
	$out .= '<meta property="og:image:type" content="image/jpeg">' . PHP_EOL;
	$out .= '<meta name="twitter:image0" content="' . $modx->config['site_url'] . $img . '">' . PHP_EOL;
	$out .= '<meta name="twitter:image1" content="' . $og_1 . '">' . PHP_EOL;
	$out .= '<meta name="twitter:image2" content="' . $og_2 . '">' . PHP_EOL;
	$out .= '<meta name="twitter:image3" content="' . $og_3 . '">' . PHP_EOL;
	return $out;
endif;
return $out;