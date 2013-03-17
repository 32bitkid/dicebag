var assert = require('assert')
var DiceBag = require('../dicebag')



var sequence = function() {
	var seq = Array.prototype.slice.call(arguments);
	return function() { return seq.shift(); }
}

var bag;

describe("a new dice bag", function() {

		describe("rolling a d6", function() {

			it("should return a value", function() {
				bag = new DiceBag(sequence(0));
				var result = bag.d6();
				assert.notEqual(result, undefined);
				assert.notEqual(result, NaN);
			});

			it("should return a value no lower than 1", function() {
				bag = new DiceBag(sequence(0));
				var result = bag.d6();
				assert.equal(result, 1);
			});

			it("should return a value no lower than 6", function() {
				bag = new DiceBag(sequence(0.99999999));
				var result = bag.d6();
				assert.equal(result, 6);
			});

		});
});
