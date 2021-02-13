class Sudoku {
    raw_puzzle;
    possibilities;
    steps;
    backsteps;
    constructor() {
        this.raw_puzzle = [0];
        this.possibilities = this.newPossibility();
        this.steps = 0;
        this.backsteps = 0;
        for (let i = 0; i < 81; i += 1) {
            this.raw_puzzle[i] = 0;
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
            newest_gen.arr = this.shuffle(this.getPossibilities(i));
            
            let backtrace = newest_gen.arr.length == 0;
            if (!backtrace){
                this.raw_puzzle[i] = newest_gen.arr[0];
                this.possibilities[i] = newest_gen;
            } else {
                while (backtrace) {
                    i -= 1;
                    let curr = this.possibilities[i];
                    curr.pos += 1;
                    if (curr.pos < curr.arr.length) {
                        this.raw_puzzle[i] = curr.arr[curr.pos];
                        backtrace = false;
                    }

                    this.backsteps += 1;
                }
            }

            this.steps += 1;
        }
    }

    shuffle(arg) {
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

    getPossibilities(arg) {
        let bad = [];
        let pos = 0;

        //horizontal
        pos = arg - (arg % 9);
        for (let i = pos; i < arg; i += 1) {
            bad.push(this.raw_puzzle[i]);
        }

        //vertical
        pos = arg % 9
        for (let i = pos; i < arg; i += 9) {
            bad.push(this.raw_puzzle[i]);
        }

        //square
        pos = arg;
        pos -= pos % 3;
        pos -= (Math.floor(pos / 9) % 3) * 9;
        for (let y = pos; y < arg; y += 9) {
            for (let x = y; x < arg && x < y + 3; x += 1) {
                bad.push(this.raw_puzzle[x]);
            }
        }

        //flip
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
                heap = [];
            }
            heap.push(this.raw_puzzle[i]);
        }
    }
}

module.exports = {Sudoku};