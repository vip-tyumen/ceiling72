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
		'elements' => 'none||icon-icon01||icon-icon02||icon-icon03||icon-icon04||icon-icon05||icon-icon06||icon-icon07||icon-icon08||icon-icon09||icon-icon10||icon-icon11||icon-icon12||icon-icon13||icon-icon14||icon-icon15||icon-icon16||icon-icon17||icon-icon18||icon-icon19||icon-icon20||icon-icon21||icon-icon22||icon-icon23||icon-icon25||icon-icon26||icon-icon27||icon-icon28||icon-icon29||icon-icon30||icon-icon31||icon-icon32||icon-icon33||icon-icon34||icon-icon35||icon-icon36||icon-icon37||icon-icon38||icon-icon39||icon-icon40||icon-icon41||icon-icon42||icon-icon43||icon-icon44||icon-icon45||icon-icon46||icon-icon47||icon-icon48||icon-icon49||icon-icon50||icon-icon51||icon-icon52||icon-icon53||icon-icon54||icon-icon55||icon-icon56||icon-icon57||icon-icon58||icon-icon59||icon-icon60||icon-icon61||icon-icon62||icon-icon63||icon-icon64||icon-icon65'
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