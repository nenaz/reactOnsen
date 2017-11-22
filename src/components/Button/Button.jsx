import React, { Component } from 'react'

class ButtonAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: (this.props.params.textSize) ? this.props.params.textSize : '10px',
                backgroundColor: this.props.params.backgroundColor,
                width: '33%',
                padding: '5px',
                color: this.props.params.textColor,
                borderRadius: '2px',
                border: '1px solid ' + this.props.params.borderColor,
                boxSizing: 'border-box',
                margin: '1px 0'
            }}>
                <span>{this.props.params.name}</span>
                <span>{this.props.params.balance}</span>
            </div>
        )
    }
}

export default ButtonAccount