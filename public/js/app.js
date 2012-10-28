requirejs.config({ baseUrl: 'js/lib' });

require(['jquery', 'frosty', 'fileupload'], function ($, frosty, fileupload) {

		var prompt, input, command = '';

		//frosty.fileupload = fileupload;
		fileupload.init(onFileUpload);

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
				if (event.which == 13) {
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
	   			input.val(frosty.prev());
	   		} else if(event.which == 40) {
	   			event.preventDefault();
	   			input.val(frosty.next());
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

			if(data)
				terminal.append('<div class="result">' + data + '</div>');

			terminal.append(prompt);
			input.val('');
			window.scrollTo(0, document.body.scrollHeight);
			input.focus();
		}

		function onFileUpload(files) {
			if(files) {
				frosty.files = files;
				var input = $('#input');
				input.val(input.val() + files[0].name);
			}
		}
	}
);