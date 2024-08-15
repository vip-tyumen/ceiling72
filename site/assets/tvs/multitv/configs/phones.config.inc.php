<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	'phone' => array(
		'caption' => 'Телефон',
		'type' => 'tel'
	)
);
$settings['templates'] = array(
    'outerTpl' => '<span class="template_org_phones">[+wrapper+]</span>',
    'rowTpl' => '☎️&nbsp;<a href="tel:[+phone+]">[+phone+]</a>,  '
);