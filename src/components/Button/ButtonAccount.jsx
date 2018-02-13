import React, { Component } from 'react'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    changeAnimationState,
    accountToEdit
} from '../../AC'

class ButtonAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderIcon = this.renderIcon.bind(this)
        this.handlerButtonClick = this.handlerButtonClick.bind(this)
        this.handleEditAccount = this.handleEditAccount.bind(this)
    }

    handlerButtonClick(event) {
        this.state.changeAnimationState('')
    }

    handleEditAccount(e) {
        this.props.accountToEdit(this.props.params._id);
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
            return <Ons.Icon icon={this.props.params.icon} onClick={this.props.editAccount}/>
        } else {
            if (this.props.params.linkEnable) {
                const link = '/' + this.props.params.link
                return (
                    <Link to={{
                        pathname: link,
                        state: {
                                fromDashboard: true
                            }
                        }} style={{ textDecoration: 'none' }} onClick={this.handleEditAccount}>
                        <Ons.Icon icon={this.props.params.icon} />
                    </Link>
                )
            }
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
            }} id={this.props.params._id}>
                <span>{this.props.params.name}</span>
                {this.renderIcon()}
            </div>
        )
    }
}

export default connect(null, {
    accountToEdit,
    changeAnimationState
})(ButtonAccount)