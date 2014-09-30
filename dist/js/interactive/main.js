// Main loop
(function(){

	window.$main = {

		init: function() {
			_setupGlobals();
			console.log("main ready");
		}
	};

	function _setupGlobals() {
		window.$BODY = $('body');
	}

	$main.init();

})();