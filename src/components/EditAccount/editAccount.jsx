import React, { Component} from 'react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Input,
    Fab
} from 'react-onsenui'
import { connect } from 'react-redux'
import {
    changeAnimationState,
    addAccountToList,
    editAccountInList
} from '../../AC'
import { Link } from 'react-router-dom'
import Requester from '../../js/requester'
import { ICONCHECKING, ICONCANCEL } from '../../js/consts'
import Icon from '../Icon'
import ToolbarC from '../Toolbar'


class EditAccount extends Component{
    constructor(props){
        super(props)
        this.state = {}
        
        this.req = new Requester()

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.handlerOkClick = this.handlerOkClick.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.handleAccountNameChange = this.handleAccountNameChange.bind(this)
        this.editAccountInList = this.editAccountInList.bind(this)
    }

    handleAmountChange(e) {
        this.setState({ amount: e.target.value })
    }
    
    handleAccountNameChange(e) {
        this.setState({ accountName: e.target.value })
    }

    handlerCanselClick() {
        window.history.back()
        this.props.changeAnimationState('backMainFromNewAccount')
        setTimeout(() => {
            this.props.changeAnimationState('')
        }, 500);
    }

    renderToolbar() {
        return (
            // <Toolbar style={{
            //     position: 'relative'
            // }}>
            //     <div className="left" />
            //     <div className="center">Edit Account</div>
            //     <div className="right">
            //         <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerCanselClick}>
            //             <ToolbarButton ref='button'>
            //                 <Icon iconBase64={ICONCANCEL} />
            //             </ToolbarButton>
            //         </Link>
            //     </div>
            // </Toolbar>
            <ToolbarC
                title='Изменить счет'
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    handlerOkClick(e) {
        this.editAccountInList();
        this.handlerCanselClick()
    }

    editAccountInList() {
        const updateObj = {
            balance: this.state.amount,
            _id: this.props.accountToEdit._id,
            name: this.state.accountName
        }
        this.props.editAccountInList(updateObj)
        this.req.updateItem('localAccounts', updateObj)
    }

    render() {
        const disabled = (this.props.accountToEdit.pname === 'default') ? true : false
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className="nzEditAccountPage">
                    <div className="nzAccountPageInputBlock">
                        <Input
                            disabled={disabled}
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder={this.props.accountToEdit.name || 'Название счета'}
                            className="nzNewAccountName"
                        />
                        <Input
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            placeholder={`${this.props.accountToEdit.balance}` || '0'}
                            className="nzNewAmountValue"
                        />
                    </div>
                </div>
                <Fab
                    onClick={this.handlerCanselClick}
                    className="nzFabButtonCansel"
                    modifier="mini"
                >
                    <span className="icon-cancel" />
                </Fab>
                <Fab
                    position='bottom right'
                    onClick={this.handlerOkClick}
                >
                    <Icon iconBase64={ICONCHECKING} />
                </Fab>
            </Page>
        )
    }
}

export default connect((state) => ({
    accountToEdit: state.changeAccountToEdit
}), {
    changeAnimationState,
    addAccountToList,
    editAccountInList
})(EditAccount)