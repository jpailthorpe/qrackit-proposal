// Handles user inputs
(function() {

	var input = $main.input = {

		showingMessage: false,
		showingComment1: false,
		showingComment2: false,

		init: function() {
			console.log('input ready');
		}
	};

	input.init();
	_bindEvents();

	function _bindEvents() {
		$BODY.on('click', '#relative-col', function(e) {
			var messagebox = $('.message-box');
			var comment1 = $('#comment-1');
			var comment2 = $('#comment-2');
			if (!input.showingMessage) {
				messagebox.show();
				messagebox.css('height', 0);
				messagebox.css('margin-top', 350);
				messagebox.animate({
					marginTop: 15,
					height: 350
				}, 1000, function() {
					input.showingMessage = true;
				});
			} else {
				if (!input.showingComment1) {
					_slideComment(comment1, function() {
						input.showingComment1 = true;
					});
				} else if (!input.showingComment2) {
					_slideComment(comment2, function() {
						input.showingComment2 = true;
					});
				} else {
					messagebox.animate({
						marginTop: 350,
						height: 0
					}, 1000, function() {
						comment1.hide();
						comment2.hide();
						input.showingMessage = false;
						input.showingComment1 = false;
						input.showingComment2 = false;
					});
				}
			}
		});

		function _slideComment(com, callback) {
			var comment = $(com);
			comment.show();
			comment.css('margin-top', 200);
			comment.animate({
				marginTop: 0
			}, 1000, function() {
				callback();
			});
		}
	}

})();