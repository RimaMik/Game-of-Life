var matrix = [];
var n = 50;
var m = 50;

var side = 15;
// var matrix = [
// 	[0, 0, 1, 0, 0],
// 	[0, 0, 0, 0, 0],
// 	[0, 1, 2, 0, 0],
// 	[0, 0, 1, 0, 0],
// 	[1, 1, 0, 0, 0],
// 	[1, 1, 2, 0, 0],
// 	[1, 1, 0, 0, 3]
// ];


var arr = [];
var dzukQanak = 25;
function setup() {
	for (var y = 0; y < n; y++) {
		matrix[y] = [];
		for (var x = 0; x < m; x++) {
			matrix[y][x] = random([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3]);
			if (x + y >= n - 4 && x + y <= n + 2) {
				matrix[y][x] = 4;
				arr.push([x,y]);
			}
		}
	}

	while(dzukQanak > 0){
		var kord = random(arr);
		console.log(kord);
		var x = kord[0];
		var y = kord[1];
		matrix[y][x] = 5;
		dzukQanak--;
	}
	createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
	background('#acacac');
	frameRate(1);

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				matrix[y][x] = new Grass(x, y, 1);
			}
			if (matrix[y][x] == 2) {
				matrix[y][x] = new GrassEater(x, y, 2);
			}
			if (matrix[y][x] == 3) {
				matrix[y][x] = new Predator(x, y, 3);
			}
			if (matrix[y][x] == 5) {
				matrix[y][x] = new Fish(x, y, 5);
			}


		}
	}
}

function draw() {

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x].index == 1) {
				matrix[y][x].mul();
			}
			else if (matrix[y][x].index == 3) {
				matrix[y][x].eat();
			}
			else if (matrix[y][x].index == 2) {
				matrix[y][x].eat();
			}
			else if (matrix[y][x].index == 5) {
				matrix[y][x].eat();
			}
		}
	}

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 0) {
				fill("#acacac");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x].index == 1) {
				fill("green");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x].index == 2) {
				fill("yellow");
				matrix[y][x].acted = false;
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x].index == 3) {
				fill("red");
				matrix[y][x].acted = false;
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 4) {
				matrix[y][x].acted = false;
				fill("lightblue");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x].index == 5) {
				matrix[y][x].acted = false;
				fill("blue");
				rect(x * side, y * side, side, side);
			}
		}
	}

}