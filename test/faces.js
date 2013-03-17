faces = {}

var generateFaces = function(name, sides) {
	var value;

	faces[name] = {};
	faces[name]["sequence"] = []
	for(var i = 0; i < sides; i++) {
		value = i/sides;
		faces[name]["face"+(i+1)] = value;
		faces[name]["sequence"].push(value);
	}
}

generateFaces("sixSided", 6);
generateFaces("tenSided", 10);

module.exports = faces