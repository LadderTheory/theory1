import React from 'react';

export class FilterBox extends React.Component {
    constructor(props) {
        super(props);
    }

    static types = {
        CHECKBOX: 'CHECKBOX',
        SLIDER: 'SLIDER',
    }

    static template(type) {
        console.log(type)

        let rtm = {
            type: type,
        }

        switch (type) {
            case FilterBox.types.CHECKBOX:
                rtm.name = "";
                break;
        }

        return rtm;
    }

    render() {
        console.log(this.props)
        return (
            <p>filterbox</p>
        )
    }
}