import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
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
        this.props.changeAnimationState('')
    }

    handleEditAccount(e) {
        this.props.accountToEdit(this.props.params);
    }

    renderIcon() {
        if (this.props.params.iconEnable) {
            return (
                <span
                    className="nzAccountButtonItem icon-plus"
                    onClick={() => {
                        this.props.pushPage('addAccount')
                    }}
                />
            )
        } else {
            let cardIcon;
            if (!this.props.params.accountNumber) {
                cardIcon = 'icon-wallet'
            } else if (this.props.params.accountNumber[0] === '4') {
                cardIcon = 'icon-visa'
            } else {
                cardIcon = 'icon-mastercard'
            }
            return (
                <span
                    // className="nzAccountButtonItem icon-wallet"
                    className={`nzAccountButtonItem ${cardIcon}`}
                    onClick={() => {
                        this.props.pushPage('editAccount')
                    }}
                />
            )
        }
    }



    render() {
        return (
            <div
                className="nzAccountButton"
                id={this.props.params._id}
                onClick={this.handleEditAccount}
            >
                <span className="nzAccountButtonItem _default">{this.props.params.accountName}</span>
                {this.renderIcon()}
                {!this.props.params.iconEnable &&
                    <span className="nzAccountButtonItem _default">{this.props.params.amount}</span>
                }
            </div>
        )
    }
}

ButtonAccount.propTypes = {
    pushPage: PropTypes.func
}

export default connect(null, {
    accountToEdit,
    changeAnimationState
})(ButtonAccount)