module.exports = function solveSudoku(matrix) {
  backtrack(matrix);
  return matrix;
};

function backtrack(matrix) {
  var row, col;
  var zeroPos = checkZero(matrix);

  if (!zeroPos) {
    return true;
  }

  row = zeroPos.row;
  col = zeroPos.column;

  for (var number = 1; number <= 9; number++) {
    if (checkNumber(matrix, row, col, number)) {
      matrix[row][col] = number;

      if (backtrack(matrix)) {
        return true;
      } else {
        matrix[row][col] = 0;
      }
    }
  }

  return false;
}

function checkZero(matrix) {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (matrix[row][col] === 0) {
        return {
          row: row,
          column: col
        };
      }
    }
  }

  return false;
}

function checkNumber(matrix, row, col, number) {
  for (var j = 0; j < 9; j++) {
    if (matrix[row][j] === number) {
      return false;
    }
  }

  for (var i = 0; i < 9; i++) {
    if (matrix[i][col] === number) {
      return false;
    }
  }

  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (matrix[row + i][col + j] === number) {
        return false;
      }
    }
  }

  return true;
}