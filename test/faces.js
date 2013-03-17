faces = {}

var generateFaces = function(name, sides) {
	faces[name] = {};
	for(var i = 0; i < sides; i++)
		faces[name]["face"+(i+1)] = i/sides;
}

generateFaces("sixSided", 6)

module.exports = faces