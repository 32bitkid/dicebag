var diceNotation = require('./dice_notation');

var DiceBag = (function() {

	var lookupFn = function(sides, value) {
		return sides[value];
	};

	var createDie = function(context, random , sides) {

		if(typeof(sides) === "number") {
			var totalSides = sides;
			sides = [];
			for(var i=1;i<=totalSides;i++)
				sides.push(i);
		}

		var roll = function(times, modifier) {
			times = (times === undefined) ? 1 : times;

			var result = new RollResult(modifier);
			var dieResult;

			for(var i = 0; i < times; i++) {
				dieResult = lookupFn(sides, Math.floor(random() * sides.length));
				result.addRoll(dieResult);
			}

			return result;
		};

		return function() { return roll.apply(context, arguments); }
	}

	function DiceBag(random) {

		this.parser = new diceNotation.Parser();
		this.parser.yy.bag = this;

		this.random = random || Math.random;
		var context = this;

		var createBoundDie = function(sides) { return createDie(context, context.random, sides); };
		this.createDie = createBoundDie;

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

	DiceBag.prototype.roll = function(expression) {
		return this.parser.parse(expression);
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