// Handles user inputs
(function() {

	var input = $main.input = {

		imageHeight: 0,
		imageScale: 0,
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
			imageHeight = $('.overlay-container').height();
			imageScale = imageHeight / 650;
			console.log('input ready');
		}
	};

	input.init();
	_bindEvents();

	function _bindEvents() {

		$BODY.on('touchend click', '#cairn-col', function(e) {
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

		$BODY.on('click touchend', '#anim-message', function(e) {
			// $('#anim-message').css('display', 'none');
			var messagebox = $('.message-box');
			var comment1 = $('#comment-1');
			var comment2 = $('#comment-2');
			if (!input.showingMessage) {
				messagebox.show();
				messagebox.css('height', 0);
				messagebox.css('opacity', 1);
				messagebox.animate({
					height: imageHeight
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
			comment.css('margin-left', 1000 * imageScale);
			comment.animate({
				marginLeft:	0
			}, 1000, function() {
				callback();
			});
		}
	}

})();