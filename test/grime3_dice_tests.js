var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');
var faces = require('./faces').sixSided;

var bag;

describe("using a set of 3 Grime dice", function() {

	var generateTest = function(die, face, expected) {
		return function() {
			var dieSequence = sequence(face);
			bag = new DiceBag(dieSequence);
			assert.equal(bag.grime3[die](), expected);
		}
	};

	describe("the red die", function() {

		it("should return 3 for the first side",  generateTest("red", faces.face1, 3));
		it("should return 3 for the second side", generateTest("red", faces.face2, 3));
		it("should return 3 for the third side",  generateTest("red", faces.face3, 3));
		it("should return 3 for the fourth side", generateTest("red", faces.face4, 3));
		it("should return 3 for the fifth side",  generateTest("red", faces.face5, 3));
		it("should return 6 for the sixth side",  generateTest("red", faces.face6, 6));
	});

	describe("the green die", function() {
		it("should return 2 for the first side",  generateTest("green", faces.face1, 2));
		it("should return 2 for the second side", generateTest("green", faces.face2, 2));
		it("should return 2 for the third side",  generateTest("green", faces.face3, 2));
		it("should return 5 for the fourth side", generateTest("green", faces.face4, 5));
		it("should return 5 for the fifth side",  generateTest("green", faces.face5, 5));
		it("should return 5 for the sixth side",  generateTest("green", faces.face6, 5));
	});

	describe("the blue die", function() {
		it("should return 1 for the first side",  generateTest("blue", faces.face1, 1));
		it("should return 4 for the second side", generateTest("blue", faces.face2, 4));
		it("should return 4 for the third side",  generateTest("blue", faces.face3, 4));
		it("should return 4 for the fourth side", generateTest("blue", faces.face4, 4));
		it("should return 4 for the fifth side",  generateTest("blue", faces.face5, 4));
		it("should return 4 for the sixth side",  generateTest("blue", faces.face6, 4));
	});

});