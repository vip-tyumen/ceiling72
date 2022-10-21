<?php
/*
  * Конфиг-параметры TinyMCE4 для сайта https://потолок72.рф/
  * https://www.tinymce.com/docs/configure/
  *
  * Приведенная ниже настройка конфигурации по умолчанию гарантирует, что все параметры редактора имеют резервное значение, а тип для каждого ключа известен.
  * $this->set($editorParam, $value, $type, $emptyAllowed=false)
  *
  * $editorParam = параметр для установки
  * $value = значение для установки
  * $type = строка, число, логическое значение, json (массив или строка)
  * $emptyAllowed = true, false (разрешает параметр: '' вместо возврата к значениям по умолчанию)
  * Если $editorParam пуст, а $emptyAllowed равен true, $defaultValue будет игнорироваться
  *
  * $this->modxParams содержит массив фактических настроек Modx/user-settings
  *
  * */

// Используемые плагины
$this->set('plugins', 'autolink lists layer table modxlink image emoticons media contextmenu paste fullscreen visualchars nonbreaking visualblocks charmap wordcount code', 'string');
// Первая строка тулбара
$this->set('toolbar1', 'undo redo | cut copy paste pastetext | visualchars | visualblocks | code | fullscreen', 'string');
// Вторая строка тулбара
$this->set('toolbar2', 'bold italic underline strikethrough subscript superscript removeformat | alignleft aligncenter alignright alignjustify | bullist numlist | blockquote', 'string');
// Третья строка тулбара
$this->set('toolbar3', 'image media | link unlink | table | charmap emoticons', 'string');
// Четвёртая строка тулбара (отключаем)
$this->set('toolbar4', ' ', 'string');
// Основное меню (отключаем)
$this->set('menubar', false, 'bool');
// Выставляем свой формат выравнивания текста
$this->set('formats', '{
			alignleft: {
				selector: "p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,dl,dt,dd,a,span,strong,i,em,b,time",
				classes: "text-left"
			},
			aligncenter: {
				selector: "p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,dl,dt,dd,a,span,strong,i,em,b,time",
				classes: "text-center"
			},
			alignright: {
				selector: "p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,dl,dt,dd,a,span,strong,i,em,b,time",
				classes: "text-right"
			},
			alignjustify: {
				selector: "p,h1,h2,h3,h4,h5,h6,table,td,th,div,ul,ol,li,dl,dt,dd,a,span,strong,i,em,b,time",
				classes: "text-justify"
			}
		}', 'json');
// Думаю, что ещё не всё...
