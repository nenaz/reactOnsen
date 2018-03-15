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
    }

    handleEditAccount(e) {
        this.props.accountToEdit(this.props.params);
    }

    renderIcon() {
        // if (this.props.params.iconEnable) {
        //     if (this.props.params.linkEnable) {
        //         const link = '/' + this.props.params.link
        //         return (
        //             <Link to={link} style={{
        //                     textDecoration: 'none',
        //                     color: this.props.params.textColor
        //                 }} onClick={this.handlerButtonClick}>
        //                 <span>+</span>
        //             </Link>
        //         )
        //     }
        //     return <Ons.Icon icon={this.props.params.icon} onClick={this.props.editAccount}/>
        // } else {
        //     if (this.props.params.linkEnable) {
        //         const link = '/' + this.props.params.link
        //         return (
        //             <Link to={link} style={{
        //                 textDecoration: 'none',
        //                 color: this.props.params.textColor
        //             }} onClick={this.handleEditAccount}>
        //                 <Ons.Icon icon={this.props.params.icon} />
        //                 <span>{this.props.params.balance}</span>
        //             </Link>
        //         )
        //     }
        // }
        return <span>{this.props.params.balance}</span>
    }

    render() {
        return (
            <div className="nzAccountButton" id={this.props.params._id}>
                <span>{this.props.params.name}</span>
                <Icon iconBase64={ICONPURSE} styleObj={{
                    width: '50%',
                    left: '25%',
                    top: '0',
                    margin: '5px 0',
                }}/>
                {this.renderIcon()}
            </div>
        )
    }
}

export default connect(null, {
    accountToEdit,
    changeAnimationState
})(ButtonAccount)