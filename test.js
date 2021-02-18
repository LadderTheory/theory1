const sudoku =  require('./sudoku');

s = new sudoku.Sudoku();
s.gen();
s.pray(70)
solution = sudoku.Sudoku.solve(s.holy.slice(), 5);

console.log(solution)
console.log(solution.length, "solution");
sudoku.Sudoku.print(s.raw_puzzle);
sudoku.Sudoku.print(s.holy);
sudoku.Sudoku.print(solution[0])
