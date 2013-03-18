var generateFaces = function(sides) {
	var value, faces;

	faces = {};
	faces["sequence"] = []
	for(var i = 0; i < sides; i++) {
		value = i/sides;
		faces["face"+(i+1)] = value;
		faces["sequence"].push(value);
	}

	return faces;
}

var faces = {
	sixSided: generateFaces(6),
	tenSided: generateFaces(10)
}

module.exports = faces