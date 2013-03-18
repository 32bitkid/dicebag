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

		var roll = function(times, modifier) {
			times = (times === undefined) ? 1 : times;

			var result = new RollResult(modifier);
			var dieResult;

			for(var i = 0; i < times; i++) {
				dieResult = Math.floor(random() * actualSides);
				result.addRoll(lookupFn(dieResult));
			}

			return result;
		};

		return function() { return roll.apply(context, arguments); }
	}

	function DiceBag(random) {

		this.random = random || Math.random;
		var context = this;

		var createBoundDie = function(sides) { return createDie(context, context.random, sides); };

		this.d4 = createBoundDie(4);
		this.d6 = createBoundDie(6);
		this.d8 = createBoundDie(8);
		this.d10 = createBoundDie(10);
		this.d12 = createBoundDie(12);
		this.d20 = createBoundDie(20);
		this.d100 = createBoundDie(100);

		this.efron = {
			red: createBoundDie([4,4,4,4,0,0]),
			green: createBoundDie([3,3,3,3,3,3]),
			blue: createBoundDie([6,6,2,2,2,2]),
			purple: createBoundDie([5,5,5,1,1,1])
		};

		this.grime5 = {
			red: createBoundDie([2,2,2,7,7,7]),
			green: createBoundDie([1,1,6,6,6,6]),
			blue: createBoundDie([5,5,5,5,5,0]),
			purple: createBoundDie([9,4,4,4,4,4]),
			yellow: createBoundDie([8,8,3,3,3,3]),
		}

		this.grime3 = {
			red: createBoundDie([3,3,3,3,3,6]),
			green: createBoundDie([2,2,2,5,5,5]),
			blue: createBoundDie([1,4,4,4,4,4]),
		}

		this.miwin = {
			red: createBoundDie([1,2,5,6,7,9]),
			green: createBoundDie([1,3,4,5,8,9]),
			blue: createBoundDie([2,3,4,6,7,8]),
		}

		this.intransitive = {
			red: createBoundDie([1,1,3,5,5,6]),
			green: createBoundDie([2,3,3,4,4,5]),
			blue: createBoundDie([1,2,2,4,6,6]),
		}
	}

	var tokens = {
		basic: /^(\d*)([dD])(\d+)(([\+\-])(\d+))?/
	}
	DiceBag.prototype.roll = function(expression) {
		var results

		if(results = tokens.basic.exec(expression)) {
			var dieType = results[2]
			var sides = results[3];
			var times = results[1] ? parseInt(results[1]) : 1;
			var modifier = 0;

			if(results[4] !== undefined) {
				var sign = results[5] == "+" ? 1 : -1;
				modifier = parseInt(results[6]) * sign;
			}

			var die = this[dieType+sides];
			if(die == undefined) {
				this[dieType+sides] = die = createDie(this, this.random, parseInt(sides));
			}
			return die(times, modifier)
		}
	}

	function RollResult(modifier) {
		this.rolls = [];
		this.modifier = modifier || 0;
	}

	RollResult.prototype.addRoll = function(roll) {
		this.rolls.push(roll);
	};

	RollResult.prototype.total = function() {
		var total = this.modifier;
		for(var i = 0; i<this.rolls.length; i++)
			total += this.rolls[i];
		return total;
	}

	RollResult.prototype.pips = RollResult.prototype.total;

	RollResult.prototype.valueOf = function() { return this.total(); };

	return DiceBag;
})();

if(typeof module !== "undefined") module.exports = DiceBag;