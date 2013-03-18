var DiceBag = (function() {

	var standardDieLookup = function(value) { return value + 1; }
	var createDie = function(context, random , sides) {
		var actualSides;
		var lookupFn;

		if(typeof(sides) === "number") {
			actualSides = sides;
			lookupFn = standardDieLookup;
		}
		else if(sides.length) {
			actualSides = sides.length;
			lookupFn = function(value) {
				return sides[value];
			};
		}

		var roll = function(times) {
			times = times || 1;

			var result = new RollResult();
			var dieResult;

			for(var i = 0; i < times; i++) {
				dieResult = Math.round(random() * actualSides);
				result.addRoll(lookupFn(dieResult));
			}

			return result;
		};

		return function() { return roll.apply(context, arguments); }
	}

	function DiceBag(random) {
		this.random = random || Math.random;

		this.d6 = createDie(this, random, 6);
		this.d10 = createDie(this, random, 10);
		this.efron = {
			red: createDie(this, random, [4,4,4,4,0,0]),
			green: createDie(this, random, [3,3,3,3,3,3]),
			blue: createDie(this, random, [6,6,2,2,2,2]),
			purple: createDie(this, random, [5,5,5,1,1,1])
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

	return DiceBag;
})();

if(typeof module !== "undefined") module.exports = DiceBag;