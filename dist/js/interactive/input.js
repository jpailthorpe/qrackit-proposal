// Handles user inputs
(function() {

	var input = $main.input = {

		imageHeight: 0,
		imageScale: 0,
		showingMessage: [false, false],
		showingComment1: [false, false],
		showingComment2: [false, false],
		breakPoint: 7,
		animateRocks: true,

		rockPositions: [

			// Cairn 1
			[0.125, 0.0],
			[0.125, 0.0],
			[0.125, 0.0],
			[0.125, 0.0],
			[0.125, 0.0],
			[0.125, 0.0],
			[0.125, 0.0],

			// Cairn 2
			[0.545, 0.0],
			[0.545, 0.0],
			[0.545, 0.0],
			[0.545, 0.0],
			[0.545, 0.0],
			[0.545, 0.0]

		],

		init: function() {
			input.setRockPositions();
			imageHeight = $('.overlay-container').height();
			imageScale = imageHeight / 650;
			console.log('input ready');
		},

		setRockPositions: function() {
			var lStartY = 0.075,
				rStartY = 0.175,
				sep = 0.055;
			for (var i = 0; i < input.breakPoint; i ++) {
				input.rockPositions[i][0] = 0.125;
				input.rockPositions[i][1] = lStartY + (sep * i);
			}
			for (var i = input.breakPoint; i < 13; i ++) {
				input.rockPositions[i][0] = 0.545;
				input.rockPositions[i][1] = rStartY + (sep * (i - (input.breakPoint - 1)));
			}
		}
	};

	input.init();
	_bindEvents();

	function _bindEvents() {

		$BODY.on('touchend click', '#cairns-container', function(e) {
			if (input.animateRocks) {
				var col = $('#cairns-container');
				var rockCount = input.rockPositions.length;
				for (var i = 0; i < input.breakPoint; i ++) {
					_moveRock(i + 1, col.width(), col.height(), 300 + ((input.breakPoint - i) * 250));
				}
				for (var i = input.breakPoint; i < rockCount; i ++) {
					_moveRock(i + 1, col.width(), col.height(), 300 + ((rockCount - i) * 250));	
				}
				input.animateRocks = false;
				setTimeout(function(){
					input.animateRocks = true;
				}, 300 + ((rockCount - 2) * 250));
			} 
		});

		$BODY.on('click touchend', '#content-interactive-1', function(e) {
			_animateSpeechBubble (1);
		});

		$BODY.on('click touchend', '#content-interactive-2', function(e) {
			_animateSpeechBubble (2);
		});

		function _animateSpeechBubble (boxNum) {
			var index = boxNum - 1;
			var id = '#content-interactive-' + boxNum;
			var messagebox = $(id + ' .message-box');
			var comment1 = $(id + ' #comment-1');
			var comment2 = $(id + ' #comment-2');
			if (!input.showingMessage[index]) {
				messagebox.show();
				messagebox.css('height', 0);
				messagebox.css('opacity', 1);
				messagebox.animate({
					height: imageHeight
				}, 1000, function() {
					input.showingMessage[index] = true;
				});
			} else {
				if (!input.showingComment1[index]) {
					_slideComment(comment1, function() {
						input.showingComment1[index] = true;
					});
				} else if (!input.showingComment2[index]) {
					_slideComment(comment2, function() {
						input.showingComment2[index] = true;
					});
				} else {
					messagebox.animate({
						opacity: 0
					}, 500, function() {
						comment1.hide();
						comment2.hide();
						input.showingMessage[index] = false;
						input.showingComment1[index] = false;
						input.showingComment2[index] = false;
					});
				}
			}
		}

		function _moveRock(index, divWidth, divHeight, speed) {
			var rock = $('#rock-' + index);
			rock.css('top', -divHeight * 0.5);
			rock.css('left', divWidth * input.rockPositions[index - 1][0]);
			rock.animate({
				top: divHeight * input.rockPositions[index - 1][1]
			}, speed);
		}

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