<?php

return [
	'caption' => 'ОСНОВНЫЕ НАСТРОЙКИ',
	'introtext' => 'Описание',
	'roles' => [1], // admin only
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
            'note'  => 'Отправка форм с сайта будет проходить с данного адреса',
            'default_text' => '',
		]
	],
];
