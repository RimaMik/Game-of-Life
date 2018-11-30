class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.directionsWater = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];


    }
    chooseCell(num, direc) {
        var found = [];
        for (var i in direc) {
            var x = direc[i][0];
            var y = direc[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++
        var newCell = random(this.chooseCell(0, this.directions));
        var newCellWater = random(this.chooseCell(0, this.directionsWater));

        var cell4 = this.chooseCell(4, this.directionsWater)
        if (cell4.length > 0) {
            if (newCellWater) {
                var newX = newCellWater[0];
                var newY = newCellWater[1];
                matrix[newY][newX] = new Grass(newX, newY, 1);
                this.multiply = 0;
            }
        }
        else {
            if (newCell && this.multiply >= 8) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = new Grass(newX, newY, 1);
                this.multiply = 0;
            }
        }

    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 12;
        this.index = index;
        this.directions = [];
        this.acted = false;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.acted = true;
                this.energy--;
                if (this.energy >= 0) {
                    this.die();
                }
            }

        }

    }
    eat() {

        var datark = this.chooseCell(1);
        var newCell = random(datark);
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul();

                }
            }
            else {
                this.move();
            }
        }

    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new GrassEater(newX, newY, 2);
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }
}


class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];

        this.directionsMul = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(num, direcM) {
        this.getNewCoordinates();
        var found = [];
        for (var i in direcM) {
            var x = direcM[i][0];
            var y = direcM[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    mul() {
        this.energy++;
        var newCell = random(this.chooseCell(0, this.directionsMul));
        if (newCell && this.energy >= 11.1) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Predator(newX, newY, 3);
            this.energy = 0;
        }
    }
    eat() {
        var datark = this.chooseCell(2, this.directions);
        var newCell = random(datark);
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul();
                    this.energy = 8;
                }
            }
            else {
                this.move();
            }
        }
    }

    move() {
        var newCell = random(this.chooseCell(0, this.directionsMul));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }



    die() {
        matrix[this.y][this.x] = 0;
    }
}


class Fish {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 30;
        this.index = index;
        this.directions = [];
        this.acted = false;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    chooseCell1(num1) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num1) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num1) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    mul() {
        this.energy++;
        var newCell = random(this.chooseCell(4));
        if (newCell && this.energy >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Fish(newX, newY, 5);
            this.energy = 0;
        }
    }

    eat() {
        if (this.acted == false) {
            var grassEater = this.chooseCell(2);
            var predator = this.chooseCell1(3);
            var newCell = random(grassEater);
            var newCell1 = random(predator);
            if (newCell1) {
                var newX = newCell1[0];
                var newY = newCell1[1];

                matrix[newY][newX] = 0;

                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul();
                    this.energy = 5;
                }
            }
            else if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX] = 0;

                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul();
                    this.energy = 5;
                }
            }
            else {
                this.move();
            }

        }



    }


    move() {
        var newCell = random(this.chooseCell(4));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 4;
                this.x = newX;
                this.y = newY;
                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
                this.acted = true;



            }

        }

    }

    die() {
        matrix[this.y][this.x] = 4;
    }

}