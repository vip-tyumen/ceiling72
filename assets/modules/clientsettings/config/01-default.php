<?php

return [
	'caption' => 'ОСНОВНЫЕ НАСТРОЙКИ',
	'introtext' => 'Основные настройки сайта',
	'roles' => [1,2,3],
	'settings' => [
		'yandex_verification' => [
			'caption' => 'Верификация Yandex',
			'type'  => 'text',
			'note'  => 'yandex_verification',
			'default_text' => '',
		],
		'email_bot_name' => [
			'caption' => 'Имя отправителя',
			'type'  => 'text',
			'note'  => 'Имя отправителя форм с сайта',
			'default_text' => '',
		],
		'email_bot' => [
			'caption' => 'Отправка писем с адреса',
			'type'  => 'text',
			'note'  => 'Отправка форм с сайта будет проходить с данного адреса<br><span style="color: red;">Адрес отправителя рекомендуется использовать в доменной зоне сайта</span>',
			'default_text' => '',
		],
		'ignore_menu_ids' => [
			'caption' => 'Игнорировать url в главном меню',
			'type'  => 'text',
			'note'  => '',
			'default_text' => '5,15,3,22,4',
		],
		'bot_token' => [
			'caption' => 'Токен бота в телеграм',
			'type'  => 'text',
			'note'  => 'Наш бот: <a href="https://t.me/VashPotolok72Bot" target="_blank"><b>VashPotolok72Bot</b></a>',
			'default_text' => '5748796966:AAHa7Lj0MMKsm0yX9jxtFi2P7Mopm04g9dc',
		],
		'chat_id' => [
			'caption' => 'ID канала в телеграм',
			'type'  => 'text',
			'note'  => 'Можно указать ID пользователя или канала. Бот должен быть добавлен админом на канал или к пользователю в телеграм.<br>Наш канал: <a href="https://t.me/+8nXkHLW28P05NTMy" target="_blank"><b>ПОТОЛОК72.РФ</b></a>',
			'default_text' => '-1001594403406',
		],
	],
];
