// Main loop
(function(){

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