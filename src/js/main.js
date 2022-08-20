;(function($) {
	$.fancybox.defaults.transitionEffect = "circular",
    $.fancybox.defaults.transitionDuration = 500,
    $.fancybox.defaults.lang = "ru",
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
	var hideScrollbar = true;
	function initFancyBox() {
		if (
			!$.fancybox.getInstance() &&
			hideScrollbar !== false &&
			!$.fancybox.isMobile &&
			document.body.scrollHeight > window.innerHeight
		) {
			$("head").append(
				`<style id="header--buttons" type="text/css">.header--buttons{right:` +
					(window.innerWidth - document.documentElement.clientWidth) +
				`px;}</style>`
			);
		}
	}
	function closeFancyBox() {
		$("#header--buttons").remove();
	}
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
	  * fancyapps
	 **/
	$(document)
	.on('click', ".zamer-btn", function(e){
		e.preventDefault();
		let form = $('.formzamer'),
			theme = $('input[name=theme]', form);
		//theme.val('Вызов замерщика');
		initFancyBox();
		$.fancybox.open(form, {
			touch: false,
			clickSlide: false,
			clickOutside: false,
			hideScrollbar: hideScrollbar,
			onInit: initFancyBox,
			afterClose: closeFancyBox
		});
		return !1;
	})
	.on('click', ".callme-btn", function(e){
		e.preventDefault();
		let form = $('.formcallme'),
			theme = $('input[name=theme]', form);
		//theme.val('Заказ звонка');
		initFancyBox();
		$.fancybox.open(form, {
			touch: false,
			clickSlide: false,
			clickOutside: false,
			hideScrollbar: hideScrollbar,
			onInit: initFancyBox,
			afterClose: closeFancyBox
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
	})
})(jQuery);
