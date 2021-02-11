class Sudoku {
    puzzle;
    possibilities;
    constructor() {
        this.puzzle = [0];
        this.possibilities = [[0]];
        for (let i = 0; i < 81; i += 1) {
            this.puzzle[i] = 0;
        }
    }

    gen() {
        for (let i = 0; i < 81; i += 1) {
            let p = this.#getPossibilities(i);

            if (p.length == 0) {
                p = [0];
            }

            this.puzzle[i] = p[0];
            this.possibilities[i] = p;
        }
    }

    #getPossibilities(arg) {
        let bad = [];
        let pos = 0;

        //horizontal
        pos = arg - (arg % 9);
        for (let i = pos; i < arg; i += 1) {
            bad.push(this.puzzle[i]);
        }

        //vertical
        pos = arg % 9
        for (let i = pos; i < arg; i += 9) {
            bad.push(this.puzzle[i]);
        }

        //square
        pos = arg;
        pos -= pos % 3;
        pos -= ((pos / 9) - (pos % 3)) * 9;
        for (let y = pos; y < arg; y += 9) {
            for (let x = y; x < arg || x < y + 3; x += 1) {
                bad.push(this.puzzle[x]);
            }
        }

        //flip
        //console.log(bad.toString());
        let good = [];

        for (let i = 1; i <= 9; i += 1) {
            if (!bad.includes(i)){
                good.push(i);
            }
        }
        return good;
    }

    print() {
        let heap = [];
        for (let i = 0; i <= 81; i += 1) {
            if (i % 9 == 0) {
                console.log(heap.toString());
                heap = [];
            }
            heap.push(this.puzzle[i]);
        }
    }
}

module.exports = {Sudoku};

//test
s = new Sudoku();
s.gen();

//console.log(s.puzzle);
s.print();
//console.table(s.possibilities);