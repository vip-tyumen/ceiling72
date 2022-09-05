;(function($, SCOPE) {

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
	$(window).on('resize', function(){
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
	}).trigger('resize');
	
	/**
	  * Forms
	 **/
	$(document)
	.on('click', ".zamer-btn", function(e){
		e.preventDefault();
		let form = $('.formzamer'),
			theme = $('input[name=theme]', form);
		//theme.val('Вызов замерщика');
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
		//theme.val('Заказ звонка');
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
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(msg){
				let btnClose = $('[data-fancybox-close]', wrapp).clone(),
					c = $(msg.forms["form"]),
					form = c.html();
				wrapp.html(form).append(btnClose);
				$('[name=phone]', wrapp).mask("+7(999)999-99-99");
				wrapp.removeClass('loading');
			},
			error: function(a, b, c){
				console.log(a, b, c);
				wrapp.removeClass('loading');
			}
		})
		return !1;
	});

	/**
	 * Works
	 **/
	$(document)
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
					$('.navigation .navigation--wrapper nav ul li a').removeClass('active');
					$(_this).addClass('active');
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
	});
	/**
	 * Set scroll position
	 **/
	let hash = window.location.hash;
	window.scrollTo(0, 0);
	if($(hash).length){
		$('.navigation .navigation--wrapper nav ul li a').removeClass('active');
		setTimeout(function(){
			$(hash)[0].scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
			$('.navigation .navigation--wrapper nav ul li a[href*="' + hash + '"]').addClass('active');
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
			var placemark = new ymaps.Placemark(point_map,{
				balloonContent: `<div class="ballon text-left">` +
	`<div class="ballon__close" onclick="window.mapCeiling.balloon.close();"></div>` +
	`<p>` + addre_map + `</p>` +
	`<p class="text-right map__phones">` + phone_map + `</p>` +
	`<div class="text-center">` +
		`<a href="mailto:` + email_map + `" >` + email_map + `</a>` +
	`</div>` +
	`<div class="ballon__buttons text-center">` +
		`<button class="ballon-btn callme-btn btn btn-default" style="margin-top: .6em;margin-bottom: .3em;" type="button">ЗАКАЗАТЬ ЗВОНОК</button><br>` +
		`<button class="ballon-btn zamer-btn btn btn-default" type="button">ВЫЗВАТЬ ЗАМЕРЩИКА</button>` +
	`</div>` +
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
				balloonAutoPan: !0
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
 		//console.log(a, b);
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

})(jQuery, _);
