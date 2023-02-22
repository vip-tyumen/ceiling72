<?php
function prepareWrapCause($data, $modx, $_multiTV) {
	$data['output'] = $data['rows']['total'];
	return $data;
}

$settings['display'] = 'vertical';
$settings['fields'] = array(
	'text' => array(
		'caption' => 'Description',
		'type' => 'richtext'
	),
	'icon' => array(
		'caption' => 'Icon',
		'type' => 'dropdown',
		'elements' => 'none||icon-icon59||icon-icon60||icon-icon61||icon-icon62||icon-icon63||icon-icon64||icon-icon65',
		'default' => 'icon-icon65'
	)
);
$settings['templates'] = array(
    'outerTpl' => '[+output+]
    	<div class="article--body--text hyphenation">
						<div class="row">
							<div class="cause">
    							[+wrapper+]
    						</div>
    					</div>
    				</div>',
    'rowTpl' => '<div class="cause--item">
					<div class="cause--item--wrap">
						<p><i class="[+icon+]"></i></p>
						<p>[+text+]</p>
					</div>
				</div>'
);
$settings['prepareWrap'] = 'prepareWrapCause';