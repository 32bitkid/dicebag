var DiceBag = (function() {
	function DiceBag(random) {
		this.random = random || Math.random;
	}

	function RollResult() {
		this.rolls = []
		this.total = 0
	}

	RollResult.prototype.addRoll = function(roll) {
		this.rolls.push(roll);
		this.total += roll;
	};

	RollResult.prototype.valueOf = function() { return this.total; };

	var createDie = function(sides) {
		return function(times) {
			times = times || 1;

			var result = new RollResult();

			for(var i = 0; i < times; i++) {
				result.addRoll(Math.floor(this.random() * sides) + 1);
			}

			return result;
		};
	}

	DiceBag.prototype.d6 = createDie(6);
	DiceBag.prototype.d10 = createDie(10);

	return DiceBag;
})();

if(typeof module !== "undefined") module.exports = DiceBag;