function sequence() {
	var seq = Array.prototype.slice.call(arguments);
	return function() { return seq.shift(); }
}

module.exports = sequence;