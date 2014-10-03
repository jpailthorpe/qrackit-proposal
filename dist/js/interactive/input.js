// Handles user inputs
(function() {

	var input = $main.input = {

		showingMessage: false,
		showingComment1: false,
		showingComment2: false,

		rockPositions: [

			// Cairn 1
			[0.1, 0.6],
			[0.15, 0.6],
			[0.2, 0.6],
			[0.12, 0.55],
			[0.17, 0.55],
			[0.15, 0.5],

			// Cairn 2
			[0.75, 0.6],
			[0.8, 0.6],
			[0.85, 0.6],
			[0.77, 0.55],
			[0.82, 0.55],
			[0.8, 0.5],

			// Cairn 3
			[0.45, 0.8],
			[0.5, 0.8],
			[0.55, 0.8],
			[0.47, 0.75],
			[0.52, 0.75],
			[0.5, 0.7]
		],

		init: function() {
			console.log('input ready');
		}
	};

	input.init();
	_bindEvents();

	function _bindEvents() {
		$BODY.on('click', '#cairn-col', function(e) {
			var col = $('#cairn-col');
			for (var i = 0; i < input.rockPositions.length; i ++) {
				_moveRock(i + 1, col.width(), col.height());
			}
		});

		function _moveRock(index, divWidth, divHeight) {
			var rock = $('#rock-' + index);
			rock.css('top', divHeight * 0.5);
			rock.css('left', divWidth * 0.5);
			rock.animate({
				left: divWidth * input.rockPositions[index - 1][0],
				top: divHeight * input.rockPositions[index - 1][1]
			}, 200 + Math.random() * 500);
		}

		$BODY.on('click', '#message-col', function(e) {
			var messagebox = $('.message-box');
			var comment1 = $('#comment-1');
			var comment2 = $('#comment-2');
			if (!input.showingMessage) {
				messagebox.show();
				messagebox.css('height', 0);
				messagebox.css('margin-top', 350);
				messagebox.css('opacity', 1);
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
						opacity: 0
					}, 500, function() {
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