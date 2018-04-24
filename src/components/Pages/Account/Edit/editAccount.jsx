import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Toolbar,
    Input,
    Fab,
    BackButton,
    AlertDialog
} from 'react-onsenui'
import { connect } from 'react-redux'
import {
    editAccountInList,
    deleteAccountFromList
} from '../../../../AC'
import Requester from '../../../../js/requester'
import { ICONCHECKING } from '../../../../js/consts'
import Icon from '../../../Icon'


class EditAccount extends Component{
    constructor(props){
        super(props)
        this.state = {
            accountDate: props.accountToEdit.accountDate || 'Действителен до',
            accountNumber: props.accountToEdit.accountNumber || 'Номер счета',
            accountPeople: this.props.accountToEdit.accountPeople || 'Имя владельца',
            amount: '0',
            accountName: this.props.accountToEdit.name || 'Название счета',
            alertDialogShown: false,
        }
        
        this.req = new Requester()

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.handlerOkClick = this.handlerOkClick.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.handleAccountNameChange = this.handleAccountNameChange.bind(this)
        this.editAccountInList = this.editAccountInList.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handlePeopleChange = this.handlePeopleChange.bind(this)
        this.handlerDeleteAccount = this.handlerDeleteAccount.bind(this)
        this.handlerToggleAlertDialog = this.handlerToggleAlertDialog.bind(this)
    }

    handlePeopleChange(e) {
        this.setState({
            accountPeople: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            accountDate: e.target.value
        });
    }

    handleNumberChange(e) {
        this.setState({
            accountNumber: e.target.value
        });
    }


    handleAmountChange(e) {
        this.setState({ amount: e.target.value })
    }

    handleAccountNameChange(e) {
        this.setState({ accountName: e.target.value })
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    renderToolbar() {
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handlerCanselClick}>Back</BackButton>
            : null;
        return (
            <Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>{this.props.route.title}</div>
            </Toolbar>
        )
    }

    handlerOkClick(e) {
        this.editAccountInList();
        this.handlerCanselClick()
    }

    editAccountInList() {
        const updateObj = {
            amount: this.state.amount * 1,
            idFrom: this.props.accountToEdit._id,
            accountNameFrom: this.state.accountName,
            accountDate: this.state.accountDate,
            accountNumber: this.state.accountNumber,
            accountPeople: this.state.accountPeople,
        }
        this.props.editAccountInList(updateObj)
        this.req.request('updateAccounts', updateObj)
    }

    handlerDeleteAccount() {
        const deleteObj = {
            idFrom: this.props.accountToEdit._id
        }
        this.props.deleteAccountFromList(deleteObj)
        this.req.request('deleteAccount', deleteObj)
        this.handlerCanselClick()
    }

    handlerToggleAlertDialog() {
        const showDialog = this.state.alertDialogShown
        this.setState({
            alertDialogShown: !showDialog
        })
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className="nzEditAccountPage">
                    <div className="nzAccountPageInputBlock">
                        <Input
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder='Название счета'
                            className="nzNewAccountName"
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            placeholder='Сумма'
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountNumber}
                            onChange={this.handleNumberChange}
                            modifier='underbar'
                            float
                            placeholder='Номер счета'
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountDate}
                            onChange={this.handleDateChange}
                            modifier='underbar'
                            float
                            placeholder='Действителен до'
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountPeople}
                            onChange={this.handlePeopleChange}
                            modifier='underbar'
                            float
                            placeholder='Имя владельца'
                        />
                    </div>
                </div>
                <Fab
                    className="nzFabButtonCansel"
                    modifier="mini"
                    onClick={this.handlerToggleAlertDialog}
                >
                    <span className="icon-cancel" />
                </Fab>
                <Fab
                    position='bottom right'
                    onClick={this.handlerOkClick}
                >
                    <Icon iconBase64={ICONCHECKING} />
                </Fab>
                <AlertDialog
                    isOpen={this.state.alertDialogShown}
                    isCancelable={false}
                >
                    <div className='alert-dialog-title'>Внимание!</div>
                    <div className='alert-dialog-content'>
                        Удалить этот счет!
                    </div>
                    <div className='alert-dialog-footer'>
                        <button onClick={this.handlerToggleAlertDialog} className='alert-dialog-button'>
                            Отмена
                        </button>
                        <button onClick={this.handlerDeleteAccount} className='alert-dialog-button'>
                            Да
                        </button>
                    </div>
                </AlertDialog>
            </Page>
        )
    }
}

EditAccount.propTypes = {
    accountToEdit: PropTypes.object,
}

export default connect((state) => ({
    accountToEdit: state.changeAccountToEdit
}), {
    editAccountInList,
    deleteAccountFromList
})(EditAccount)