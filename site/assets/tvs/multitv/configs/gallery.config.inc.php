<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	'image' => array(
		'caption' => 'Image',
		'type' => 'image'
	),
	'thumb' => array(
		'caption' => 'Thumbnail',
		'type' => 'thumb',
		'thumbof' => 'image'
	),
	'title' => array(
		'caption' => 'Title',
		'type' => 'text'
	)
);
$settings['templates'] = array(
    'outerTpl' => '<div class="gallery">
    	<div class="row">
    		<div class="gallery--flex">
    			[+wrapper+]
    		</div>
    	</div>
    </div>',
    'rowTpl' => '<div class="gallery--flex--item">
		<a href="[(site_url)][+image+]" data-fancybox="gallery" data-caption="[+title+]" class="gallery--flex--item--link">
			<img src="[(site_url)][[phpthumb? &input=`[+image+]` &options=`w=270,h=202,zc=C`]]" alt="[+title+]" class="gallery--flex--item--image" onload="onLoadImg(this)">
		</a>
	</div>'
);
/*
<div class="gallery--flex">
	<div class="gallery--flex--item">
		<a href="https://xn--n1aebc.xn--72-1lcdoabe2a.xn--p1ai/assets/images/0003/0019/0001.jpg" data-fancybox="gallery" data-caption="Многоуровневые потолки" class="gallery--flex--item--link">
			<img src="https://xn--n1aebc.xn--72-1lcdoabe2a.xn--p1ai/assets/cache/images/0003/0019/0001-270x202-ae1.jpg" alt="Многоуровневые потолки" class="gallery--flex--item--image" onload="onLoadImg(this)">
		</a>
	</div>
</div>
*/
/*
$settings['prepare'] = function($data, $modx, $_multiTV) {
	$site = $modx->config['site_url'];
	$caption = (string)$data['title'];
	$src = (string)$data['image'];
	$thumb = $modx->runSnippet('phpthumb', array(
		'input' => (string)$data['image'],
		'options' => 'w=96,h=75,zc=C'
	));
	$output = array(
		'src' => $site . $src,
		'opts' => array(
			'caption' => $caption,
			'thumb' => $site . $thumb
		)
	);
	return $output;
};
*/
