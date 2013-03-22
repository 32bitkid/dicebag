# DiceBag

## Creating a new bag

	var DiceBag = require('dicebag');
	var bag = new DiceBag();


## Using standard die helpers. 

	var result; 
	result = bag.d6();

`DiceBag` includes helpers for the following: `d4,d6,d8,d10,d12,d20,d100`

Also included are several specialtiy die and die sets: 

* Efron's Dice – A set of four non-transitive dice
		
		bag.efron.red();
		bag.efron.green();
		bag.efron.blue();
		bag.efron.purple();
	
* Grime Dice – Three and five die grime sets: `grime3` and `grime5` respectively.
* Miwin's Dice – A set of three non-transitive dice. `miwin`
* Minimal Intransitive Dice – A set of three non-transitive dice that are minimal changes from standard D6 die. `intransitive`

## Using a different random number provider

	var notSoRandom = function() { return 0.5; }
	var bag = new DiceBag(notSoRandom);
	
	var result = bag.d6(); 
	
## Creating a new 'die'

For example, to create a 88-sided die:

	var d88 = bag.createDie(88);
	d88(); // roll a d88 once
	
More complicated dies can also be generated, for example a fudge die:

	var fudge = bag.createDie([+1,+1,0,0,-1,-1]);
	fudge(3); // roll three fudge dice
	
## Dice Notation Parser
The `.roll()` method, will parse a standard dice notation expression:

	var results = bag.roll("3d8-3"); // (0 - 21)

	