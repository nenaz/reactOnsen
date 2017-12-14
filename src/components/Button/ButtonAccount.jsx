import React, { Component } from 'react'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAnimationState } from '../../AC'

class ButtonAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderIcon = this.renderIcon.bind(this)
        this.handlerButtonClick = this.handlerButtonClick.bind(this)
    }

    handlerButtonClick() {
        this.props.changeAnimationState('')
    }

    renderIcon() {
        if (this.props.params.iconEnable) {
            if (this.props.params.linkEnable) {
                const link = '/' + this.props.params.link
                return (
                    <Link to={link} style={{ textDecoration: 'none' }} onClick={this.handlerButtonClick}>
                        <Ons.Icon icon={this.props.params.icon} />
                    </Link>
                )
            }
            return <Ons.Icon icon={this.props.params.icon} />
        }
        return <span>{this.props.params.balance}</span>
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
                {this.renderIcon()}
            </div>
        )
    }
}

export default connect((state => ({
    changeAnimationState
})))(ButtonAccount)