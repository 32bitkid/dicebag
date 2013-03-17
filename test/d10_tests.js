var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');
var faces = require('./faces').tenSided

var bag;

describe("rolling a d10", function() {

	it("should be a minimum of 1", function() {
		bag = new DiceBag(sequence(faces.face1));
		assert.equal(bag.d10(), 1);
	})
	it("should be a maximum of 10", function() {
		bag = new DiceBag(sequence(faces.face10));
		assert.equal(bag.d10(), 10);
	})
});