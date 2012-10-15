requirejs.config({ baseUrl: 'js/lib' });

require(['jquery', 'frosty', 'history'], function ($, frosty) {

		var prompt, input, command = '';

	  $(function() {
	  	input = $('#input');
	  	$('body').keypress(function(){
	  		input.focus();
	  	});

	  	// ESC
	  	$('body').keyup(function(event) {
				if(event.which == 27)
	   			input.val('');
			});

			input.focus();

			// Enter
			input.keypress(function(event) {
				var key = event.which;
				if (key == 13 ) {
		    	event.preventDefault();
		    	command = this.value;
		    	prompt = $(this).parent();
		    	frosty.process(this.value, callback);
	   		}
			});

			// Up & Down arrows
			input.keydown(function(event) {
				if(event.which == 38) {
	   			event.preventDefault();
	   			var command = frosty.prev();
	   			input.val(command);
	   		} else if(event.which == 40) {
	   			event.preventDefault();
	   			var command = frosty.next();
	   			input.val(command);
	   		}
			})
		});

	  /**
		* Handes callback from a module.
		*/
		function callback(data, echo) {
			var terminal = prompt.parent();

			var user = $('#user').text();

			if(typeof echo !== 'undefined' ? echo : true)
				terminal.append('<div class="result"><label>' + user + '</label><label>> </label>' + command);

			terminal.append('<div class="result">' + data + '</div>');
			terminal.append(prompt);
			input.val('');
			window.scrollTo(0, document.body.scrollHeight);
			input.focus();
		}
	}
);