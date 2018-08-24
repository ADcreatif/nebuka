let Lee = (function () {

    let pathfinder = function (matrix, x1, y1, x2, y2) {

        let toVisit = [[x1, y1]]; // Initialise at the start square

        while (toVisit.length) { // While there are still squares to visit

            x = toVisit[0][0];
            y = toVisit[0][1];

            for (let i = x - 1; i < x + 2; i++) {  // -1, 0, 1
                for (let j = y - 1; j < y + 2; j++) { // -1, 0, 1

                    if (neighbourCheck(matrix, i, j, x1, y1, 0)) {

                        matrix[i][j] = matrix[x][y] + 1;
                        toVisit.push([i, j]);

                    }

                }
            }

            let shift = toVisit.shift();

        }

        let distance = matrix[x2][y2];
        return [matrix, distance];

    };

    let backtrace = function (matrix, x1, y1, x2, y2) {

        let previousValue = matrix[x2][y2];
        let successfulRoute = [];

        let x = x2;
        let y = y2;

        while (!(x === x1 && y === y1)) {

            for (let i = x - 1; i < x + 2; i++) {  // -1, 0, 1
                for (let j = y - 1; j < y + 2; j++) { // -1, 0, 1

                    if (
                        matrix[i] && (matrix[i][j] === previousValue - 1) && // If array x array defined and the matrix value is 0
                        !(i === x && j === y)) {

                        previousValue = matrix[i][j];
                        successfulRoute.push([i, j]);
                        x = i;
                        y = j;

                    } else if (successfulRoute.length == matrix[x2][y2] - 1) { // If we got to the end of the route
                        x = x1;
                        y = y1; // Break the while loop
                    }

                }
            }

        }

        successfulRoute.unshift([x2, y2]); // Add end point
        successfulRoute.push([x1, y1]); // Add start point
        return successfulRoute.reverse(); // Reverse the array so it's at the start

    };

    let neighbourCheck = function (matrix, i, j, x1, y1, value) {
        return matrix[i] && (matrix[i][j] === value) && // If array x array defined and the matrix value is 0
            !(i === x && j === y) && // If it's not the center square
            !(i === x1 && j === y1); // If it's not the first square
    };

    return {
        pathfinder: pathfinder,
        backtrace: backtrace,
        neighbourCheck: neighbourCheck
    };

})();