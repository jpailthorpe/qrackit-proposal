// Handles user inputs
(function() {

	var input = $main.input = {

		init: function() {
			console.log('input ready');
		}
	};

	input.init();
	_bindEvents();

	function _bindEvents() {
		$BODY.on('click', '.animation-trigger', function(e) {
			var container = $('.message');
			container.show();
			container.css('height', 0);
			container.css('top', 350);
			container.animate({
				top: 15,
				height: 350
			}, 1000);
		});
	}

})();