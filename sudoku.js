class Sudoku {
    raw_puzzle;
    holy;
    possibilities;
    steps;
    backsteps;
    difficulty;
    constructor() {
        this.raw_puzzle = Array(81).fill(0);
        this.holy = Array(81).fill(0);
        this.possibilities = this.newPossibility();
        this.steps = 0;
        this.backsteps = 0;
        this.difficulty = 81;
    }

    api() {
        return {
            raw_puzzle: this.raw_puzzle,
            holy: this.holy,
            possibilities: this.possibilities,
            steps: this.steps,
            backsteps: this.backsteps,
        }
    }

    newPossibility() {
        return {
            arr: [0],
            pos: 0
        };
    }

    gen() {
        this.possibilities = [];

        for (let i = 0; i < 81; i += 1) {
            let newest_gen = this.newPossibility();
            newest_gen.arr = Sudoku.getPossibilities(i, this.raw_puzzle);
            newest_gen.arr[0] = Sudoku.shuffle(newest_gen.arr[0])
            
            let backtrace = newest_gen.arr[0].length == 0;
            if (!backtrace){
                this.raw_puzzle[i] = newest_gen.arr[0][0];
                this.possibilities[i] = newest_gen;
            } else {
                while (backtrace) {
                    i -= 1;
                    let curr = this.possibilities[i];
                    curr.pos += 1;
                    if (curr.pos < curr.arr[0].length) {
                        this.raw_puzzle[i] = curr.arr[0][curr.pos];
                        backtrace = false;
                    }

                    this.backsteps += 1;
                }
            }

            this.steps += 1;
        }
    }

    static shuffle(arg) {
        let used = [];
        let shuffled = [];

        for (let i = 0; i < arg.length; i += 1) {
            let pos = Math.floor(Math.random() * arg.length);

            while (used.includes(pos)) {
                pos += 1;
                if (pos >= arg.length) {
                    pos = 0;
                }
            }
            used.push(pos);

            shuffled.push(arg[pos]);
        }

        return shuffled;
    }

    static getPossibilities(arg, puzzle) {
        let bad = [[],[]];
        let pos = 0;

        //horizontal
        pos = arg - (arg % 9);
        for (let i = pos; i < pos+9; i += 1) {
            if (i < arg) {
                bad[0].push(puzzle[i]);
            }
            if (i > arg) {
                bad[1].push(puzzle[i]);
            }
        }

        //vertical
        pos = arg % 9
        for (let i = pos; i < 81; i += 9) {
            if (i < arg) {
                bad[0].push(puzzle[i]);
            }
            if (i > arg) {
                bad[1].push(puzzle[i]);
            }
        }

        //square
        pos = arg;
        pos -= pos % 3;
        pos -= (Math.floor(pos / 9) % 3) * 9;
        for (let y = pos; y < (pos + (3*9)); y += 9) {
            for (let x = y; x < y + 3; x += 1) {
                if (x < arg) {
                    bad[0].push(puzzle[x]);
                }
                if (x > arg) {
                    bad[1].push(puzzle[x]);
                }
            }
        }

        //flip
        let good = [[],[],[]];
        for (let i = 1; i <= 9; i += 1) {
            if (!bad[0].includes(i)){
                good[0].push(i);
            }
            if (!bad[1].includes(i)){
                good[1].push(i);
            }
            if(good[0].includes(i) && good[1].includes(i)) {
                good[2].push(i);
            }
        }

        return good;
    }

    //track template
    static trackalate(arr, pos) {
        return {
            arr: arr,
            pos: pos,
        }
    }

    singleSolution() {
        let p = this.holy.slice();

        let is_good = true;

        let is_exausted = false;
        while (!is_exausted && is_good) {
            let empty = [];

            for (let i = 0; i < 81; i += 1) {
                if (p[i] == 0) {
                    empty.push(i);
                }
            }

            if (empty.length == 0) {
                is_exausted = true;
            } else {
                let is_good_cycle = false;
                for (let i = 0; i < empty.length; i += 1)  {
                    let possibilities = Sudoku.getPossibilities(empty[i], p);
                    //console.log(i, possibilities[2]);

                    if (possibilities[2].length == 1) {
                        p[empty[i]] = possibilities[2][0];
                        is_good_cycle = true;
                    }
                }

                if (!is_good_cycle) {
                    is_good = false;
                }
            }
        }

        return is_good;
    }

    static solve(arg, max) {
        let empty = [];//indexes of empty cells

        let solved = arg.slice();
        for (let i = 0; i < 81; i += 1) {
            if (arg[i] == 0) {
                empty.push(i);
            }
        }

        let is_solvable = true;

        for (let i = 0; i < empty.length; i += 1) {

        }
    }

    pray() {
        let a_v = 5;
        let used = [];
        
        this.holy = this.raw_puzzle.slice();

        let attempts_remaining = a_v;
        let is_solvable = true;
        while (is_solvable || attempts_remaining > 0) {
            let pos = Math.floor(Math.random() * 81);

            while (used.includes(pos)) {
                pos += 1;

                if (pos >= 81) {
                    pos = 0;
                }
            }

            let tmp = this.holy[pos];
            this.holy[pos] = 0;
            used.push(pos);

            if (this.singleSolution()) {
                attempts_remaining = a_v;
                is_solvable = true;

                //used.push(pos);
            } else {
                this.holy[pos] = tmp;

                attempts_remaining -= 1;
                is_solvable = false;
            }
        }

        this.difficulty = used.length;
    }

    static print(puzzle) {
        let printme = '';
        for (let i = 0; i < 81; i += 1) {
            if (i % 9 == 0) {
                printme += '\n';
            }
            if (puzzle[i] == 0) {
                printme += '.'
            }else {
                printme += puzzle[i] 
            }
            printme += ' '
        }

        return printme;
    }
}

module.exports = {Sudoku};