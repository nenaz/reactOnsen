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
            // if (this.props.params.linkEnable) {
                const link = '/' + this.props.params.link
                return (
                    <Link
                        to={link}
                        style={{
                            textDecoration: 'none',
                            color: this.props.params.textColor
                        }}
                        ref="addButton"
                        onClick={this.handlerButtonClick}
                    >
                        <span className="nzAccountButtonItem icon-plus" />
                    </Link>
                )
            // }
        //     return <Ons.Icon icon={this.props.params.icon} onClick={this.props.editAccount}/>
        } else {
        //     if (this.props.params.linkEnable) {
                const link = '/' + this.props.params.link
                return (
                    <Link to={link}
                        style={{
                            textDecoration: 'none',
                            color: this.props.params.textColor
                        }}
                        onClick={this.handleEditAccount}
                    >
                        <span className="nzAccountButtonItem icon-wallet" />
                    </Link>
                )
        //     }
        }
        // return <span className={`nzAccountButtonItem ${icon}`} />
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

export default connect(null, {
    accountToEdit,
    changeAnimationState
})(ButtonAccount)