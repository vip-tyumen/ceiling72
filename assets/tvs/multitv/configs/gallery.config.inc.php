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

