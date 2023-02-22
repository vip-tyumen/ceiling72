<?php

return [
	'caption' => 'КАЛЬКУЛЯТОР',
	'introtext' => 'Данные для калькулятора',
	'roles' => [1,2,3],
	'settings' => [
		'price_mini' => [
			'caption' => 'Минимальная Цена за работу',
			'type' => 'number',
			'note' => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0'
		],
		'price_area' => [
			'caption' => 'Цена за кв.м.',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_lustr' => [
			'caption' => 'Цена за одину Люстру',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_svet' => [
			'caption' => 'Цена за один Светильник',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_carn' => [
			'caption' => 'Потолочные карнизы для штор',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_zagl' => [
			'caption' => 'Заглушка вместо плинтуса по периметру',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_proc' => [
			'caption' => 'Процентная ставка',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">%</span>',
			'default_text' => '0',
		]
	],
];
