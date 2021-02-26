import React from 'react'

export class Square extends React.Component {
    constructor(props) {
        super(props);        
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