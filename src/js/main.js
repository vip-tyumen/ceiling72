;(function($) {
	
	/**
	 * NAVIGATION
	 **/
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
	$(document).on('click', "#callme", function(e){
		e.preventDefault();
		let form = $('.formcallme');
		$.fancybox.open(form, {
			touch: false,
			clickSlide: false,
			clickOutside: false,
		});
		/*if(callMe) {
			console.log(callMe.status);
			let output = callMe.output;
			$.fancybox.open(output, {
				touch: false,
				clickSlide: false,
				clickOutside: false,
			})
		}*/
		return !1;
	}).on('submit', "#callme_potolok", function(e){
		e.preventDefault();
		let formData = new FormData(this);
		console.log(this);
		$.ajax({
			type: 'POST',
			url: window.location.origin + window.location.pathname,
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(msg){
				let c = $(msg.forms.callme),
					form = $('.formcallme', c).html();
				console.log(form);
				$(".formcallme").html(form);
			},
			error: function(a, b, c){
				console.log(a, b, c);
			}
		})
		return !1;
	})
})(jQuery);
