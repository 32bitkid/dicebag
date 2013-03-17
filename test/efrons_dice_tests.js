var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');
var faces = require('./faces').sixSided;

var bag;

describe("rolling Efron's dice", function() {

	describe("rolling red die", function() {

		var generateRedDieTest = function(face, expected) {
			return function() {
				var dieSequence = sequence(face);
				bag = new DiceBag(dieSequence);
				assert.equal(bag.efron.red(), expected);
			}
		};

		it("should return 4 for the first side", generateRedDieTest(faces.face1, 4));
		it("should return 4 for the second side", generateRedDieTest(faces.face2, 4));
		it("should return 4 for the third side", generateRedDieTest(faces.face3, 4));
		it("should return 4 for the fourth side", generateRedDieTest(faces.face4, 4));
		it("should return 0 for the fifth side", generateRedDieTest(faces.face5, 0));
		it("should return 0 for the sixth side", generateRedDieTest(faces.face6, 0));

	});

});