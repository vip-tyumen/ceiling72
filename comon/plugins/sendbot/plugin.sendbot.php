<?php
if (!defined('MODX_BASE_PATH')) {
	http_response_code(403);
	die('Hack?'); 
}
use ProjectSoft\SendBot;

$e = &$modx->event;
$params = $e->params;

$token = '5748796966:AAHa7Lj0MMKsm0yX9jxtFi2P7Mopm04g9dc';
//$chat_id = '-1001594403406';
$chat_id = '83741005';
/**
 * Отправка сообщения на канал Telegram
 * 
 	$modx->invokeEvent('OnSendBot', array(
		'types' => {
			'date':		'Дата',
			'theme':	'Тема',
			'name':		'Имя',
			'phone':	'Телефон',
			'email':	'Электронная почта',
			'message':	'Сообщение'
			// .....
		},
		'fields' => {
			'date':		'01.01.2023',
			'theme':	'Закакз звонка',
			'name':		'Иван',
			'phone':	'+7(999)999-99-99',
			'email':	'exemple@exemple.com',
			'message':	'Сообщение для вывода на канале'
			// .....
		},
		'before_msg' => 'Вступение сообщения',
		'after_msg' => 'Конец сообщения',
		'bot_token' => 'bot<API:TOKEN>',
		'chat_id' => 'chat_id_Identification',
		'disable_web_page_preview' => 'true' // Or 'false'
	));
**/
switch($e->name){
	case "onSendBot":
	$bot = new SendBot($params);
	$rest = $bot->send();
	$out = '<pre><code>' . print_r($rest, true) . '</code></pre>';
	echo $out;
	break;
}