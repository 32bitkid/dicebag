var assert = require('assert');
var DiceBag = require('../dicebag');
var sequence = require('./sequence');

var bag;

describe("rolling a d10", function() {

	it("should be a minimum of 1", function() {
		bag = new DiceBag(sequence(0));
		assert.equal(bag.d10(), 1);
	})
	it("should be a maximum of 10", function() {
		bag = new DiceBag(sequence(0.999999));
		assert.equal(bag.d10(), 10);
	})
});