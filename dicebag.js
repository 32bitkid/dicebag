var DiceBag = (function() {
	function DiceBag(random) {
		this.random = random || Math.random;
	}

	DiceBag.prototype.d6 = function() {
		return Math.floor(this.random() * 6) + 1
	}

	return DiceBag;
})();

if(typeof module !== "undefined") module.exports = DiceBag;