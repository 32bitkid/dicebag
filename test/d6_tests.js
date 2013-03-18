var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');
var faces = require('./faces').sixSided;

var bag;

describe("rolling a d6", function() {

	it("should return a value", function() {
		bag = new DiceBag(sequence(faces.face1));
		var result = bag.d6();
		assert.notEqual(result, undefined);
		assert.notEqual(result, NaN);
	});

	it("should return a value no lower than 1", function() {
		bag = new DiceBag(sequence(faces.face1));
		var result = bag.d6();
		assert.equal(result, 1);
	});

	it("should return a value no lower than 6", function() {
		bag = new DiceBag(sequence(faces.face6));
		var result = bag.d6();
		assert.equal(result, 6);
	});

	describe("multiple times", function() {

		it("sum the individual rolls", function() {
			bag = new DiceBag(sequence(faces.face1, faces.face1));
			var result = bag.d6(2);
			assert.equal(result, 2);
		});

		it("get the #.total", function() {
			bag = new DiceBag(sequence(faces.face1, faces.face3));
			var result = bag.d6(2);
			assert.equal(result.total(), 4);
		});

		it("access the individual rolls", function() {
			bag = new DiceBag(sequence(faces.face1, faces.face3));
			var result = bag.d6(2);
			assert.equal(result.rolls[0], 1);
			assert.equal(result.rolls[1], 3);
		});
	});
});