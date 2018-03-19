import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    changeAnimationState,
    accountToEdit
} from '../../AC'
import Icon from '../Icon'
import { ICONPURSE } from '../../js/consts'

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

        // const elem = event.currentTarget
        // const elemBoundingCR = elem.getBoundingClientRect()
        // elem.style.left = `${elemBoundingCR.left}px`
        // setTimeout(() => {
        //     elem.classList.add('nzAnimaion')
        //     elem.style.width = `${elemBoundingCR.width}px`
        // }, 100)
        // setTimeout(() => {
        //     elem.classList.add('nzAnimaionNext')
        //     elem.style.left = '0px'
        // }, 200);
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
            return (
                <span
                    className="nzAccountButtonItem icon-wallet"
                    onClick={() => {
                        this.props.pushPage('editAccount')
                    }}
                />
            )
        }
    }



    render() {
        // const buttonPos = this.buttonPosition()
        return (
            <div
                className="nzAccountButton"
                id={this.props.params._id}
                // onClick={this.handlerButtonClick}
                // style={{}}
            >
                <span className="nzAccountButtonItem _default">{this.props.params.name}</span>
                {this.renderIcon()}
                {!this.props.params.iconEnable && <span className="nzAccountButtonItem _default">{this.props.params.balance}</span>}
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