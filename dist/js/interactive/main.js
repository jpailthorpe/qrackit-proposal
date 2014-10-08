var scrollElement = null,
	w = null,
	resizeTimer = null,
	minHeight = 400;
	height = 600;

// Main loop
(function(){

	scrollElement = $('html, body');
	w = $(window);

	scrollElement.each(function(i) {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', 0);
	});

	$('.downButton a').bind('click', function(event){
		event.preventDefault();
		var $this = $(this);
		target = this.hash;
		$target = $(target);

		scrollElement.stop().animate({
			scrollTop: $target.offset().top
		}, 500);
	});

	w.on('resize', function () {
		if (resizeTimer) {
			clearTimeout(resizeTimer);
		}

		resizeSections();
		resizeTimer = setTimeout(function() {
			var s = w.scrollTop(),
				newPos = Math.round(s / height) * height;
			resizeSections();
			scrollElement.stop().animate({
				scrollTop: newPos
			}, 250);
		}, 500);
	});

	resizeSections();

	window.$main = {

		init: function() {
			var enableInteractive = $('.mobile-warning').css('display');
			if (enableInteractive == 'none') {
				_setupGlobals();
			} else {
				return false;
			}
			console.log("main ready");
			return true;
		}
	};

	function _setupGlobals() {
		window.$BODY = $('body');
	}

})();

function resizeSections () {
	var h = w.height();
	height = h < minHeight ? minHeight : h;
	// console.log(height);
	$('.row').css('height', height);
	var offset = (height - 600) * 0.5;
	console.log(height, offset);
	$('.wrapper').css('padding-top', offset);
	// $('.wrapper').css('padding-bottom', offset * 0.25);
}