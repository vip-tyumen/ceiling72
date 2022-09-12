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
		'price_carn' => [
			'caption' => 'Цена метр карниза',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_trub' => [
			'caption' => 'Цена за один трубопровод',
			'type'  => 'number',
			'note'  => 'Измеряется в <span style="font-size: 2em;">₽</span> (руб.)',
			'default_text' => '0',
		],
		'price_svet' => [
			'caption' => 'Цена за одину точку освящения',
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
