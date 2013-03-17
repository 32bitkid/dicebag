var DiceBag = (function() {
	function DiceBag(random) {
		this.random = random || Math.random;
		this.efron = {
			red: createDie({sides:[4,4,4,4,0,0], random: random})
		};
	}

	function RollResult() {
		this.rolls = [];
		this.total = 0;
	}

	RollResult.prototype.addRoll = function(roll) {
		this.rolls.push(roll);
		this.total += roll;
	};

	RollResult.prototype.valueOf = function() { return this.total; };

	var standardDieLookup = function(value) { return value + 1; }
	var createDie = function(options) {
		var actualSides;
		var lookupFn;

		if(typeof(options.sides) === "number") {
			actualSides = options.sides;
			lookupFn = standardDieLookup;
		}
		else if(options.sides.length) {
			actualSides = options.sides.length;
			lookupFn = function(value) {
				return options.sides[value];
			};
		}

		return function(times) {
			times = times || 1;

			var random = options.random || this.random;
			var result = new RollResult();
			var dieResult;

			for(var i = 0; i < times; i++) {
				dieResult = Math.round(random() * actualSides);
				result.addRoll(lookupFn(dieResult));
			}

			return result;
		};
	}

	DiceBag.prototype.d6 = createDie({sides:6});
	DiceBag.prototype.d10 = createDie({sides:10});

	return DiceBag;
})();

if(typeof module !== "undefined") module.exports = DiceBag;