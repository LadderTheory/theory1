import React from 'react'

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