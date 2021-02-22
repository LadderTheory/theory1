const sudoku = require('./sudoku');

s = new sudoku.Sudoku();
s.gen();
s.pray()

console.log(sudoku.Sudoku.print(s.raw_puzzle));
console.log(sudoku.Sudoku.print(s.holy));
console.log("Difficulty", s.difficulty);
