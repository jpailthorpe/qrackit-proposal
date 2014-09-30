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
		$BODY.on('click', '.col-12 .overlay', function(e) {
			console.log('click!');
		});
	}

})();