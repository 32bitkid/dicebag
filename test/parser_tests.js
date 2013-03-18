var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');
var faces = require('./faces').sixSided;

var bag;

describe("using the parser", function() {

	var generateParseTest = function(expression, sequence, expected) {
		var name = "can parse '"+expression+"'";
		var test = function() {
			var bag = new DiceBag(sequence);
			var actual = bag.roll(expression);
			assert.equal(actual, expected);
		}
		return [name, test];
	}

	var itCanParse = function(expression,faces, expected) {
		var nonRandomSequence = sequence.apply(undefined, faces);
		it.apply(undefined, generateParseTest(expression, nonRandomSequence, expected));
	}


	itCanParse('d6', [faces.face1], 1);
	itCanParse('2d6', [faces.face1, faces.face6], 7)
	itCanParse('2d6+3', [faces.face1, faces.face6], 10)
	itCanParse('1d7', [faces.face1], 1)

});