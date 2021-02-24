import e from 'express';
import React from 'react'

export class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        
    }

    valueDisplay() {
        let v = ' ';

        if (this.props.value != '0') {
            v = this.props.value;
        }
        
        return v
    }

    render() {
        //console.log(this.props);
        let id = this.props.id;
        let final_id = "sudoku-tile-" + id;

        let cell_style = {
            border: "black",
            //'border-width': "1px",
            //'border-style': 'solid',
            margin: '1px',
            width: '2em',
            height: '2em',
            display: 'flex',
            float: 'left',
            'background-color': this.props.color,
            color: '#282c34',
            'alignContent': 'center',
            'justifyContent': 'center',
            'flexDirection': 'column',
            //'vertical-align': 'middle',
            padding: '0px'
        }
        
        let text_style = {
            'vertical-align': 'middle',
        }

        if ((id+1) % 3 == 0) {
            if ((id+1) % 9 != 0) {
                //style['border-right-width'] = '3px';
                cell_style['marginRight'] = '3px';
            }
        }
    
        if ((18 <= id && id <= 26) || (45 <= id && id <= 53)){
            //style['border-bottom-width'] = '3px';
            cell_style['marginBottom'] = '3px';
        }
           //  

        let button = (
            <div 
            style={cell_style}
            className='sudoku-tile' 
            id={final_id}
            onClick={(e) => {
                this.props.click(e);
            }}
            onMouseEnter = {(e) => {
                this.props.hover(e, true);
            }}
            onMouseLeave = {(e) => {
                this.props.hover(e, false);
            }}
            >
                {this.valueDisplay()}
            </div>
        )

        return button;
    }
}

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: Array(81).fill(0),
            hovered: 81,
            focused: 81,
            api: {},
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    getId(arg) {
        return Number(arg.target.id.split('-')[2]);
    }

    handleClick(event) {
        //let newp = this.state.puzzle.slice();
        let id = this.getId(event);
        this.setState({focused: id})
    }

    handleHover(event, hovering) {
        let id = this.getId(event);

        if (hovering) {
            this.setState({hovered: id})
        }else{
            this.setState({hovered: 81});
        }
    }

    componentDidMount() {
        fetch("sudoku/api?full=t")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                api: result,
                });
                console.log(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({});
                console.log("Failed to contact sudoku api", error);
            }
        )
    }


    render() {
        //console.log('STATE', this.state)

        let puzzle = this.state.empty.slice();

        if (this.state.api.reduced) {
            puzzle = this.state.api.reduced.slice();
        }

        let board = [];

        let style = {
            padding: '7px',
            'background-color': 'black',
            'user-select': 'none',
        }



        for (let y = 0; y < 9; y += 1){
            for (let x = 0; x < 9; x += 1) {
                let i = x + (9*y);
                let color = 'white'

                if (i == this.state.hovered) {
                    color = '#F5F5F5'
                }

                if (i == this.state.focused) {
                    color = '#d6d6d6'
                }

                board.push(<Square 
                    id={i}
                    value={puzzle[i]}
                    click={this.handleClick}
                    hover={this.handleHover}
                    color={color}
                    key={i}
                />);
            }
            board.push(<br />)
        }
        
        let difficulty = "";

        if (this.state.api.difficulty) {
            let dif_style = {
                margin: '0px',
                textAlign: 'right',
                fontSize: ".5em"
            }

            difficulty = (
                <p style={dif_style}>Difficulty: {this.state.api.difficulty}</p>
            )
        }

        return (
            <div style={style} className="sudoku-board">
                {board}
                {difficulty}
            </div>
        )
    }
}

export class ApiFilter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value : '',
            checks: {},
        }

        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(e) {
        let x = e.target.name
        this.state.checks[x] = e.target.checked;
        this.setState({
            apple: true,
        });
    }

    render() {

        let filter_names = [
            'steps',
            'reduce',
        ];

        
        let style = {
            'background-color': '#181c24',
            margin: '15px',
        }

        let filters = [];
        let output_string = "http://somou.org/sudoku/api?"

        filter_names.forEach((x) => {
            if (typeof this.state.checks[x] == 'undefined') {
                this.state.checks[x] = false;
            }

            filters.push(
                <div>
                    <label for={x}>{x}</label>
                    <input type="checkbox" name={x} id={x} checked={this.state.checks[x]} onChange={this.handleCheck}/>
                </div>
            )

            if (this.state.checks[x]) {
                if (output_string[output_string.length - 1] != '?') {
                    output_string += '&';
                }
                output_string += x + "=t";
            }
        });

        let output_style = {
            backgroundColor: 'white',
            color: 'black',
            fontSize: '1em',
            margin: '5px',
        }

        let output = (
            <p style={output_style}>{output_string}</p>
        )        

        return (
            <div style={style} className="sudoku-api-div">
                <form>
                    {filters}
                    {output}
                </form>
            </div>
        )
    }
}