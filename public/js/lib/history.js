/**
* History module.
*/
define(function() {
	return {
		index: 0,
		values: [],

		length: function() {
			return this.values.length;
		},

		add: function(value) {
			this.values.push(value);
			this.index = this.values.length;
		},

		prev: function() {
			if(this.index - 1 >= 0)
				return this.values[--this.index];
		},

		next: function() {
			if(this.index + 1 <= this.length())
				return this.values[++this.index];
		}
	}
});



