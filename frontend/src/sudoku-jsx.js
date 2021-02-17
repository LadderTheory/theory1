import React from 'react'

export function Square(id) {
    let final_id = "sudoku-tile-" + id

    let cell_style = {
        border: "black",
        //'border-width': "1px",
        //'border-style': 'solid',
        margin: '1px',
        width: '2em',
        height: '2em',
        display: 'inline-block',
        'background-color': 'white',
        color: '#282c34',
        //'text-align': 'center',
        //'vertical-align': 'middle',
        padding: '0px'
    }

    let text_style = {
    }

    if (id % 3 == 0) {
        if (id % 9 != 0) {
            //style['border-right-width'] = '3px';
            cell_style['margin-right'] = '3px';
        }
    }

    if ((19 <= id && id <= 27) || (46 <= id && id <= 54)){
        //style['border-bottom-width'] = '3px';
        cell_style['margin-bottom'] = '3px';
    }

    let button = (
        <div style={cell_style} className='sudoku-tile' id={final_id}>
            {id}
        </div>
    )

    return button
}

export function fillBoard(e) {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'http://localhost/sudoku/api', false);
    xhttp.send();
    console.log(JSON.parse(xhttp.response));

    let puzzle = JSON.parse(xhttp.response).puzzle;
    console.log(puzzle);

    for (let i = 0; i < 81; i += 1) {
        document.getElementById('sudoku-tile-' + i).innerHTML = String(puzzle[i]);
    }
}

export function FillButton() {
    return (
        <button onClick={fillBoard}>
            Fill Board
        </button>
    )
}

export function Board() {
    let board = [];

    let style = {
        padding: '3px',
        'background-color': 'black'
    }

    for (let y = 0; y < 9; y += 1){
        for (let x = 1; x <= 9; x += 1) {
            board.push(Square(x + (9*y)));
        }
        board.push(<br />)
    }
    

    return (
        <div style={style} className="sudoku-board">
            {board}
        </div>
    )
}