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

		$('.wrapper-cairns').waypoint(function(){
			_resetSpeechBubble(2);
			setTimeout(function() {
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
				}
			}, 500);
		});

		$('.wrapper-answer').waypoint(function(){
			var col = $('#cairns-container');
			_resetRocks (col.height());
			input.animateRocks = true;
		});

		$('.wrapper-results').waypoint(function() {
			var col = $('#cairns-container');
			_resetRocks (col.height());
			input.animateRocks = true;
		});

		$('.wrapper-question').waypoint(function() {
			_animateSpeechBubble (1);
		});

		$('.wrapper-answer').waypoint(function() {
			_animateSpeechBubble (2);
		});

		$('.wrapper-mountain').waypoint(function() {
			_resetSpeechBubble(1);
		});

		$('.wrapper-minigame').waypoint(function() {
			_resetSpeechBubble(1);
			_resetSpeechBubble(2);
		});

		function _animateSpeechBubble (boxNum) {
			
			var index = boxNum - 1;
			if (input.showingMessage[index]) return;
			input.showingMessage[index] = true;

			var id = '#content-interactive-' + boxNum;
			var messagebox = $(id + ' .message-box');
			var comment1 = $(id + ' #comment-1');
			var comment2 = $(id + ' #comment-2');
			
			setTimeout(function(){
				messagebox.show();
				messagebox.css('height', 0);
				messagebox.css('opacity', 1);
				messagebox.animate({
					height: imageHeight
				}, 1000);
			}, 500);

			setTimeout(function(){
				_slideComment(comment1);
			}, 1750);

			setTimeout(function(){
				_slideComment(comment2);
			}, 3000);
		}

		function _resetSpeechBubble(boxNum) {
			var index = boxNum - 1;
			var id = '#content-interactive-' + boxNum;
			var messagebox = $(id + ' .message-box');
			var comment1 = $(id + ' #comment-1');
			var comment2 = $(id + ' #comment-2');

			messagebox.css('opacity', 0);
			comment1.hide();
			comment2.hide();

			input.showingMessage[index] = false;
		}

		function _moveRock(index, divWidth, divHeight, speed) {
			var rock = $('#rock-' + index);
			rock.css('top', -divHeight * 0.5);
			rock.css('left', divWidth * input.rockPositions[index - 1][0]);
			rock.animate({
				top: divHeight * input.rockPositions[index - 1][1]
			}, speed);
		}

		function _resetRocks(divHeight) {
			for (var i = 1; i < 14; i ++) {
				var rock = $('#rock-' + i);
				rock.css('top', -divHeight * 0.5);
			}
		}

		function _slideComment(com, callback) {
			var comment = $(com);
			comment.show();
			comment.css('margin-left', 1000 * imageScale);
			comment.animate({
				marginLeft:	0
			}, 1000);
		}
	}
})();