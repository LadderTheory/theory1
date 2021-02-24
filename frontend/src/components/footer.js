import React from 'react'

export default class Footer extends React.Component {
    render() {
        let style = {
            position: "fixed",
            bottom: "0",
            left: '0',
            width: '100%',
            backgroundColor: '#181c24',
            paddingLeft: '10px',
            fontSize: '.4em',
            textAlign: "left",
        };

        return (
            <div style={style} className="footer">
                <p>Thank you tyler.</p>
                <p>You've been a big help</p>
            </div>
        )
    }
}