;(function($, SCOPE) {
	const config = typeof window.config == 'function' ? window.config() : {},
		price_mini = Number(config.mini) >= 0 ? Number(config.mini) : 0,
		price_area = Number(config.area) >= 0 ? Number(config.area) : 0,
		price_lustr = Number(config.lustr) >= 0 ? Number(config.lustr) : 0,
		price_svet = Number(config.svet) >= 0 ? Number(config.svet) : 0,
		price_carn = Number(config.carn) >= 0 ? Number(config.carn) : 0,
		price_zagl = Number(config.zagl) >= 0 ? Number(config.zagl) : 0,
		price_proc = Number(config.proc) >= 0 ? Number(config.proc) : 0;
	/**
	 * Отправка заявки с формы
	 * Цель Yandex
	 **/
	function ymSend(e){
		try {
			ym(90439554,'reachGoal','feedback');
			console.log('Send Reach Goal feedback');
		} catch (e) {
			console.log('Error Reach Goal feedback');
		}
	}
	/**
	 * Калькулятор
	 **/
	function formatMoney(num) {
		num = String(num);
		var arr = num.match(/^(\d+)((?:\.\d+)?)$/);
		arr[2] = arr[2] ? arr[2] : '';
		return arr[1].replace(/(\d)(?=(?:\d{3})+$)/g, '$1\u00A0') + arr[2];
	}
	function calculation() {
		const mini = price_mini.toFixed(0),
			$calc = $("#form_calc");
		if($calc.length) {
			let $area = Number($('[name=area]', $calc).val()),
				$lustr = Number($('[name=lustr]', $calc).val()),
				$svet = Number($('[name=svet]', $calc).val()),
				$carn = Number($('[name=carn]', $calc).val()),
				$zagl = Number($('[name=zagl]', $calc).val()),
				$action = $('[name=action]', $calc),
				$output = $('.output', $calc),
				str = [],
				area = 0,
				lustr = 0,
				svet = 0,
				carn = 0,
				zagl = 0,
				sum = 0;
			$area = $area >= 0 ? $area : 0;
			$lustr = $lustr >= 0 ? $lustr : 0;
			$svet = $svet >= 0 ? $svet : 0;
			$carn = $carn >= 0 ? $carn : 0;
			$zagl = $zagl >= 0 ? $zagl : 0;
			if($area){
				area = (price_area * $area).toFixed(0);
				str.push(`Площадь помещения: ${$area}\u00A0м². (${price_area}x${$area}=${area})`);
			}else{
				$('[name=area]', $calc).val('');
			}
			if($lustr){
				lustr = (price_lustr * $lustr).toFixed(0);
				str.push(`Кол-во люстр: ${$lustr}\u00A0шт. (${price_lustr}x${$lustr}=${lustr})`);
			}else{
				$('[name=lustr]', $calc).val('')
			}
			if($svet){
				svet = (price_svet * $svet).toFixed(0);
				str.push(`Кол-во точек освещения: ${$svet}\u00A0шт. (${price_svet}x${$svet}=${svet})`);
			}else{
				$('[name=svet]', $calc).val('')
			}
			if($carn){
				carn = (price_carn * $carn).toFixed(0);
				str.push(`Потолочный карниз: ${$carn}\u00A0м. (${price_carn}x${$carn}=${carn})`);
			}else{
				$('[name=carn]', $calc).val('')
			}
			if($zagl){
				zagl = (price_zagl * $zagl).toFixed(0);
				str.push(`Заглушка вместо плинтуса: ${$zagl}\u00A0м. (${price_zagl}x${$zagl}=${zagl})`);
			}else{
				$('[name=zagl]', $calc).val('')
			}
			sum = Number(Number(area) + Number(lustr) + Number(svet) + Number(carn) + Number(zagl)).toFixed(0);
			sum = Number(sum) <= Number(mini) ? mini : sum;
			let out_sum = sum;
			if($action.prop('checked')) {
				// Проценты
				str.push(`Является новосёлом или пенсионером`);
				if(price_proc) {
					str.push(`Процентная ставка: ${price_proc}%`);
					out_sum = Number(sum) - Number(price_proc) * Number(sum) / 100;
					out_sum = Number(out_sum) <= Number(mini) ? mini : out_sum;
					str.push(`Сумма с учётом процентов: ${out_sum}\u00A0руб.`);
				}
			}
			str.push(`Итоговая сумма заказа: ${sum}\u00A0руб.`);
			if($area < 1 && $lustr < 1 && $svet < 1 && $carn < 1 && $zagl < 1) {
				$output.html(`Итого: 0\u00A0руб.`);
				return {
					enabled: false,
					text: `Итоговая сумма заказа: 0`,
					sum: 0
				};
			}
			let format_sum = formatMoney(out_sum);
			$output.html(`Итого: ${format_sum}\u00A0руб.`);

			let text = str.join("\n");
			$('[name=message]', $calc).val(text);
			return {
				enabled: str.length ? true : false,
				text: text,
				sum: sum
			};
		} else {
			return {
				enabled: false,
				text: '',
				sum: 0
			}
		}
	}
	function resetCalculation(){
		let $calc = $("#form_calc");
		if($calc.length) {
			$calc[0].reset();
			$('[name=message]', $calc).val('');
		}
		let obj = calculation();
	}
	$('.output', "#form_calc").html(`Итого: 0\u00A0руб.`)
	 $("#smal-output").html(`Минимальная сумма заказа: ` + formatMoney(price_mini) + `\u00A0руб.`);
	/**
	 * Fancybox defaults options
	 **/
	$.fancybox.defaults.onInit = function() {
		if (
			!$.fancybox.getInstance() &&
			$.fancybox.defaults.hideScrollbar !== false &&
			!$.fancybox.isMobile &&
			document.body.scrollHeight > window.innerHeight
		) {
			$("head").append(
				`<style id="header-buttons" type="text/css">.header--buttons{right:` +
					(window.innerWidth - document.documentElement.clientWidth) +
				`px;}</style>`
			);
		} else if($("body").hasClass('compensate-for-scrollbar')){
			let mr = $(".compensate-for-scrollbar").css("margin-right");
			$("head").append(
				`<style id="header-buttons" type="text/css">.header--buttons{right:` +
					mr +
				`;}</style>`
			);
		}
	}
	$.fancybox.defaults.afterClose = function() {
		$("#header-buttons", $('head')).remove();
	}
	$.fancybox.defaults.hideScrollbar = true;
	$.fancybox.defaults.transitionEffect = "circular";
	$.fancybox.defaults.transitionDuration = 500;
	$.fancybox.defaults.loop = true;
	$.fancybox.defaults.lang = "ru";
	$.fancybox.defaults.i18n.ru = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		ERROR: "Запрошенный контент не может быть загружен.<br/>Повторите попытку позже.",
		PLAY_START: "Начать слайдшоу",
		PLAY_STOP: "Остановить слайдшоу",
		FULL_SCREEN: "Полный экран",
		THUMBS: "Миниатюры",
		DOWNLOAD: "Скачать",
		SHARE: "Поделиться",
		ZOOM: "Увеличить"
	};


	/**
	 * NAVIGATION
	 **/
	$('[name=phone]').mask("+7(999)999-99-99");
	$('.nav-btn').on('click', function(e) {
		e.preventDefault();
		let parent = $(this).closest('.navigation'),
			menu = $(".navigation--wrapper", parent),
			nav = $("nav", menu),
			height = nav.outerHeight(true) + `px`;
		if(!$(parent).hasClass('open')) {
			menu.css({
				height: height
			});
		} else {
			menu.css({
				height: 0
			});
		}
		$(parent).toggleClass('open');
		return !1;
	});
	$(window)
	.on('resize', function(){
		let parent = $('.navigation'),
			menu = $(".navigation--wrapper", parent),
			nav = $("nav", menu),
			height = nav.outerHeight(true) + `px`;
		if($(parent).hasClass('open')) {
			if(window.innerWidth <= 590) {
				menu.css({
					height: height
				});
			} else {
				menu.removeAttr('style')
			}
		} else {
			if(window.innerWidth <= 590) {
				menu.css({
					height: 0
				});
			} else {
				menu.removeAttr('style')
			}
		}
	})
	.trigger('resize');

	/**
	  * Forms
	 **/
	$(document)
	.on('click', ".zamer-btn", function(e){
		e.preventDefault();
		let form = $('.formzamer'),
			theme = $('input[name=theme]', form);
		$.fancybox.open(form, {
			touch: false,
			clickSlide: false,
			clickOutside: false,
			hideScrollbar: $.fancybox.defaults.hideScrollbar,
			loop: false
		});
		return !1;
	})
	.on('click', ".callme-btn", function(e){
		e.preventDefault();
		let form = $('.formcallme'),
			theme = $('input[name=theme]', form);
		$.fancybox.open(form, {
			touch: false,
			clickSlide: false,
			clickOutside: false,
			hideScrollbar: $.fancybox.defaults.hideScrollbar,
			loop: false
		});
		return !1;
	})
	.on('submit', "#callme_potolok, #zamer_potolok", function(e){
		e.preventDefault();
		const ids = this.id.split('_'),
			id = ids[0],
			formData = new FormData(this),
			wrapp = $('.form' + id);
		wrapp.addClass('loading');
		$.ajax({
			type: 'POST',
			url: window.location.origin + window.location.pathname,
			data: formData,
			async: true,
			cache: false,
			contentType: false,
			processData: false,
			dataType: 'json',
			success: function(msg){
				let btnClose = $('[data-fancybox-close]', wrapp).clone(),
					c = $(msg.forms["form"]),
					form = c.html();
				wrapp.html(form).append(btnClose);
				$('[name=phone]', wrapp).mask("+7(999)999-99-99");
				if(!$('form', wrapp).length){
					// Удачная отправка
					ymSend(e);
				}
				wrapp.removeClass('loading');
			},
			error: function(a, b, c){
				console.log(a, b, c);
				wrapp.removeClass('loading');
			}
		})
		return !1;
	})
	.on('input change paste keyup', '#form_calc input, #form_calc select', function(e){
		e.preventDefault();
		if(this.type == 'number') {
			const max = Number(this.max),
				val = Number(this.value);
			if(val >= max) {
				this.value = max;
			}
		}
		let obj = calculation();
		return !1;
	})
	.on('submit', '#form_calc', function(e){
		e.preventDefault();
		const form_calc = $(this),
			ids = this.id.split('_'),
			id = ids[0],
			wrapp = $('#calculator .messages');
		let obj = calculation(),
			formData = new FormData(this);
		if(obj.enabled) {
			$('.formcalc').addClass('loading');
			$.ajax({
				type: 'POST',
				url: window.location.origin + window.location.pathname,
				data: formData,
				async: true,
				cache: false,
				contentType: false,
				processData: false,
				dataType: 'json',
				success: function(msg){
					if(msg.forms) {
						if(msg.forms["form"]) {
							let c = $(msg.forms["form"]),
								form = $(c.html());
							wrapp.empty();
							if($("#form_calc", form).length){
								$('.calculator').empty().append(form)
							} else {
								wrapp.append(form);
								// Удачная отправка
								ymSend(e);
							}
							$('[name=phone]', form_calc).mask("+7(999)999-99-99");
						} else {
							wrapp.html("<p>Неудачная отправка формы<br>Попробуйте ещё раз.</p>");
						}
					} else {
						wrapp.html("<p>Неудачная отправка формы<br>Попробуйте ещё раз.</p>");
					}
					$('.formcalc').removeClass('loading');
					resetCalculation();
				},
				error: function(a, b, c){
					$('.formcalc').removeClass('loading');
					resetCalculation();
				}
			})
		} else {
			wrapp.html("<p>Заполните правильно поля формы</p>");
		}
		return !1;
	})
	.on('reset', '#form_calc', resetCalculation)
	/**
	 * Works
	 **/
	.on('click', '[data-work]', function(e){
		e.preventDefault();
		let str = $(this).attr('data-work').replace(/,]$/, ']');
		$(this).attr({'data-work': str});
		try {
			let fnb = JSON.parse(str);
			$.fancybox.open(fnb);
		}catch(err){
			console.log('Error JSON parse');
		}
		return !1;
	})
	/**
	 * MENU
	 **/
	.on('click', '.navigation .navigation--wrapper nav ul li a', function(e){
		const regex = /(#.+)$/,
			_this = this,
			href = _this.href;
		let m, id, len, path;
		path = window.location.origin + window.location.pathname;
		if ((m = regex.exec(href)) !== null) {
			id = m[1];
			len = $(id).length;
			path = path + id;
			if(href == path){
				if(len>0) {
					e.preventDefault();
					$(id)[0].scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
					setTimeout(function(){
						window.location.hash = id;
					}, 500);
					return !1;
				}
			}
		}
	})
	.on('click', '.navigation .navigation--wrapper nav ul li span.active', function(e){
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		setTimeout(function(){
			window.location.hash = "";
		}, 200);
		return !1;
	})
	.on('click', '[type=submit]', function(e){
		console.log(e);
		console.log('submit');
	});
	/**
	 * Set scroll position
	 **/
	let hash = window.location.hash;

	if($(hash).length){
		setTimeout(function(){
			$(hash)[0].scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}, 500);
	}
	/**
	 * Reviews
	 **/
	$('.review-slider--wrap').slick({
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false,
		fade: true,
		cssEase: 'linear',
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		pauseOnFocus: false,
		pauseOnHover: true,
		waitForAnimate: false,
		useTransform: false,
		useCSS: false
	});
	$('.actions-slider').slick({
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		pauseOnFocus: false,
		pauseOnHover: true
	});
	const loadYandexMap = function(){
		$("#map").length && function(){
			$("#map").empty();
			var addre_map = $.trim($("#orgAddress").text()),
				phone_map = $("#orgPhones").html(),
				email_map = $.trim($("#orgEmail").text()),
				point_map = $("#orgAddress").data("point").split(",").map(Number);
			window.mapCeiling = new ymaps.Map("map", {
				center: point_map,
				zoom: 17,
				controls: ["typeSelector", "zoomControl", "fullscreenControl"]
			});
			var placemark = new ymaps.Placemark(point_map, {
				balloonContent: `<div class="ballon text-left" oncontextmenu="return !1;">` +
	`<div class="ballon__close" onclick="window.mapCeiling.balloon.close();"></div>` +
	`<p>` + addre_map + `<br>` +
		`<a class="entry" href="https://yandex.ru/maps/?rtext=~` + point_map + `&z=16" target="_blank">Как доехать</a>` +
	`</p>` +
	`<p class="text-right map__phones">` + phone_map + `</p>` +
	`<div class="text-center">` +
		`<a href="mailto:` + email_map + `" >` + email_map + `</a>` +
	`</div>` +
	(window.pages ? '' : `<div class="ballon__buttons text-center">` +
		`<button class="ballon-btn callme-btn btn btn-default" style="margin-top: .6em;margin-bottom: .3em;" type="button">ЗАКАЗАТЬ ЗВОНОК</button><br>` +
		`<button class="ballon-btn zamer-btn btn btn-default" type="button">ВЫЗВАТЬ ЗАМЕРЩИКА</button>` +
	`</div>`) +
`</div>`
			},{
				iconLayout: "default#image",
				iconImageHref: "/assets/templates/projectsoft/images/placemark.png?_=v0.0",
				iconImageSize: [36, 52],
				iconImageOffset: [-18, -50],
				balloonLayout: "default#imageWithContent",
				balloonImageHref: "/assets/templates/projectsoft/images/placemark.png?_=v0.0",
				balloonImageOffset: [-18, -50],
				balloonImageSize: [36, 52],
				balloonShadow: !0,
				balloonAutoPan: !0,
				hideIconOnBalloonOpen: !1
			});
			window.mapCeiling.behaviors.disable("scrollZoom"),
			window.mapCeiling.geoObjects.add(placemark),
			placemark.balloon.open()
		}();
	}
	if ($("#map").length) {
		const scriptMap = document.createElement("script");
		scriptMap.type = "text/javascript",
		scriptMap.src = "https://api-maps.yandex.ru/2.1.79/?apikey=3c2b4de9-2ac7-4e6d-9bca-8e0bd0b32f36&lang=ru_RU",
		scriptMap.onload = function() {
			ymaps.ready(loadYandexMap)
		}
		,
		document.body.append(scriptMap)
	}
	/**
	 * CountDown
	 **/
	 function strfobj(str, labels) {
		var parsed = str.match(/([0-9]{2})/gi),
			obj = {};
		labels.forEach(function(label, i) {
			obj[label] = parsed[i]
		});
		return obj;
	}
	// Return the time components that diffs
	function diff(obj1, obj2, labels) {
		var diffs = [];
		labels.forEach(function(key) {
			if (obj1[key] !== obj2[key]) {
				diffs.push(key);
			}
		});
		return diffs;
	}
	// Start countdown
	$('.countdown').each(function(a, b){
		const _this = $(b),
			_index = a;;
		var labels_ru = ['ДНЕЙ', 'ЧАСОВ', 'МИНУТ', 'СЕКУНД'],
			labels = ['days', 'hours', 'minutes', 'seconds'],
			currDate = '00:00:00:00',
			nextDate = '00:00:00:00',
			date = new Date(),
			days = Number(_this.data('days'));
		days = days ? days : 1;
		_this.data({index: a});
		if(days >= 0){
			var initData = strfobj(currDate, labels),
				template = SCOPE.template($("#coundownTemplate").html());
			labels.forEach(function(label, i) {
				_this.append(template({
					curr: initData[label],
					next: initData[label],
					label: label,
					label_ru: labels_ru[i]
				}));
			});
			date.setDate(date.getDate() + days);
			var day = date.getDate(),
				month = date.getMonth() + 1,
				year = date.getFullYear(),
				out = "";
			day = day > 9 ? String(day) : "0"+String(day);
			month = month > 9 ? String(month) : "0"+String(month);
			out += year + "/" + month + "/" + day + " " + "00:00:00";
			_this.countdown(out, function(event){
				var newDate = event.strftime('%d:%H:%M:%S'),
					data;
				if (newDate !== nextDate) {
					currDate = nextDate;
					nextDate = newDate;
					// Setup the data
					data = {
						'curr': strfobj(currDate, labels),
						'next': strfobj(nextDate, labels)
					};
					if (!event.elapsed) {
						// Apply the new values to each node that changed
						diff(data.curr, data.next, labels).forEach(function(label) {
							var selector = '.%s'.replace(/%s/, label),
								$node = _this.find(selector);
							// Update the node
							$node.removeClass('flip');
							$node.find('.curr').text(data.curr[label]);
							$node.find('.next').text(data.next[label]);
							// Wait for a repaint to then flip
							SCOPE.delay(function($node) {
								$node.addClass('flip');
							}, 50, $node);
						});
					}
				}
			});
		}
	});
	var scrollWin = function(e){
		const header = $("header.header"),
			html = $("html"),
			height = header.height() + 100;
		if(window.pageYOffset > height) {
			!html.hasClass('scrup') && html.addClass('scrup');
		} else {
			html.hasClass('scrup') && (html.removeClass('scrup'),
			$('.navigation .navigation--wrapper nav ul li a[href*="#"], .navigation .navigation--wrapper nav ul li a[href^="#"]').removeClass('active'));
		}
		if(window.pageYOffset < header.height()) {
			(window.location.hash.length > 2) && (
				window.location.hash = "",
				window.history.replaceState(null, document.title, window.location.pathname)
			);
		}
	};

	$('#calc').append($("#calcform").children());
	resetCalculation();

	setTimeout(function(){
		$(window).on('scroll resize', scrollWin);
		$(document).on('click', '.scrollup', function(e){
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			$('.navigation .navigation--wrapper nav ul li a[href*="#"], .navigation .navigation--wrapper nav ul li a[href^="#"]').removeClass('active');
			setTimeout(function(){
				window.location.hash = "";
				window.history.replaceState(null, document.title, window.location.pathname);
			}, 500);
		});
		scrollWin();
	}, 1000);
	$(document).on('load', 'img', function(e){
		//.load
		console.log(e);
	})
})(jQuery, _);
