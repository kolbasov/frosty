function History() {
	this.index = 0;
	this.values = [];
}

History.prototype.length = function() {
	return this.values.length;
};

History.prototype.add = function(value) {
	this.values.push(value);
	this.index = this.values.length;
};

History.prototype.prev = function() {
	if(this.index - 1 >= 0)
		return this.values[--this.index];
};

History.prototype.next = function() {
	if(this.index + 1 <= this.length())
		return this.values[++this.index];
};