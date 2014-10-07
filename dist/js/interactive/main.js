var scrollElement = null,
	w = null,
	resizeTimer = null,
	height = 600;

// Main loop
(function(){

	scrollElement = $('html, body');
	w = $(window);

	scrollElement.each(function(i) {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', 0);
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
	height = h < 640 ? 640 : h;
	$('.row').css('height', height);
	var offset = (height - 600) * 0.5;
	$('.wrapper').css('padding-top', offset * 0.5);
	$('.wrapper').css('padding-bottom', offset * 0.5);
}