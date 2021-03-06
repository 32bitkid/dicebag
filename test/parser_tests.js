var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');
var faces = require('./faces').sixSided;

var bag;

describe("the parser", function() {

	var generateParseTest = function(name, expression, sequence, expected) {
		var name = "can parse " + name + ": '"+expression+"'";
		var test = function() {
			var bag = new DiceBag(sequence);
			var actual = bag.roll(expression);
			assert.equal(actual, expected);
		}
		return [name, test];
	}

	var canParse = function(name, expression,faces, expected) {
		var nonRandomSequence = sequence.apply(undefined, faces);
		it.apply(undefined, generateParseTest(name, expression, nonRandomSequence, expected));
	}


	canParse("a simple roll",'d6', [faces.face1], 1);
	canParse("multiple die rolls", '2d6', [faces.face1, faces.face6], 7)
	canParse("modifiers" , '2d6+3', [faces.face1, faces.face6], 10)
	canParse("negative modifiers" , '2d6-3', [faces.face1, faces.face6], 4)
	canParse("create new die", '1d7', [faces.face1], 1)

	it("can get the actual rolls out of a complicated expression", function() {
		var seq = sequence(faces.face1, faces.face2, 2/4, faces.face4, 4/100);
		var bag = new DiceBag(seq);
		var actual = bag.roll("1d10+1d6+1d4+1d6+1d100");
		assert.deepEqual(actual.rolls, [1,2,3,4,5]);
	});

});