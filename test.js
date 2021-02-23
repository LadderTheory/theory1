const sudoku = require('./sudoku');

s = new sudoku.Sudoku();
s.gen();
s.pray()

console.log(sudoku.Sudoku.print(s.raw_puzzle));
console.log(sudoku.Sudoku.print(s.holy));
console.log("Difficulty", s.difficulty);


for (let i =0; i < 1000; i += 1) {
    console.log("i", i);
    s.gen()
    s.pray()
}
console.log("pass");