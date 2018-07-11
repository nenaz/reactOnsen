import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Input,
    Fab,
    AlertDialog,
    Switch
} from 'react-onsenui'
import { connect } from 'react-redux'
import {
    editAccountInList,
    deleteAccountFromList
} from '../../../../AC'
import Requester from '../../../../js/requester'
import { ICONCHECKING } from '../../../../js/consts'
import Icon from '../../../Icon'
import ToolbarCustom from '../../../ToolbarCustom';


class EditAccount extends Component{
    constructor(props){
        super(props)
        this.state = {
            accountDate: '',
            accountNumber: '',
            accountPeople: '',
            accountName: '',
            placeholderAccountDate: props.accountToEdit.accountDate || 'Действителен до',
            placeholderAccountNumber: props.accountToEdit.accountNumber || 'Номер счета',
            placeholderAccountPeople: props.accountToEdit.accountPeople || 'Имя владельца',
            placeholderAccountName: props.accountToEdit.accountName || 'Название счета',
            amount: 0,
            alertDialogShown: false,
            update: false,
            consider: props.accountToEdit.consider !== undefined
                ? props.accountToEdit.consider
                : true,
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
        this.validateForm = this.validateForm.bind(this)
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this)
    }

    validateForm() {
        const update = (this.state.accountDate ||
                this.state.accountNumber ||
                this.state.accountPeople ||
                this.state.accountName ||
                this.state.amount ||
                this.state.consider !== this.props.accountToEdit.consider
            )
            ? true
            : false
        this.setState({
            update
        })
    }

    handlePeopleChange(e) {
        this.setState({
            accountPeople: e.target.value,
        }, () => {
            this.validateForm()
        });
    }

    handleDateChange(e) {
        this.setState({
            accountDate: e.target.value,
        }, () => {
            this.validateForm()
        });
    }

    handleNumberChange(e) {
        this.setState({
            accountNumber: e.target.value,
        }, () => {
            this.validateForm()
        });
    }


    handleAmountChange(e) {
        this.setState({
            amount: Number(e.target.value),
        }, () => {
            this.validateForm()
        })
    }

    handleAccountNameChange(e) {
        this.setState({
            accountName: e.target.value,
        }, () => {
            this.validateForm()
        })
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="Редактировать счет"
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    handlerOkClick(e) {
        this.editAccountInList();
        this.handlerCanselClick()
    }

    editAccountInList() {
        debugger
        const updateObj = {
            idFrom: this.props.accountToEdit._id,
            _id: this.props.accountToEdit._id,
            accountNameFrom: this.state.accountName,
            accountName: this.state.accountName || this.props.accountToEdit.accountName,
            accountDate: this.state.accountDate,
            accountNumber: this.state.accountNumber,
            accountPeople: this.state.accountPeople,
            consider: this.state.consider,
        }
        if (this.state.amount) {
            updateObj.amount = this.state.amount
        }
        if (this.state.update) {
            this.props.editAccountInList(updateObj)
            this.req.request('updateAccounts', updateObj)
        }
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

    handleChangeSwitch(event) {
        const check = event.target.checked
        this.setState({
            consider: !check,
        }, () => {
            this.validateForm()
        })
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className="nzEditAccountPage">
                    <div className="nzAccountPageInputBlock">
                        <Input
                            className="nzNewAccountName"
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder={this.state.placeholderAccountName}
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={String(this.state.amount)}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            type="number"
                            placeholder='Сумма'
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountNumber}
                            onChange={this.handleNumberChange}
                            modifier='underbar'
                            float
                            placeholder={this.state.placeholderAccountNumber}
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountDate}
                            onChange={this.handleDateChange}
                            modifier='underbar'
                            float
                            placeholder={this.state.placeholderAccountDate}
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountPeople}
                            onChange={this.handlePeopleChange}
                            modifier='underbar'
                            float
                            placeholder={this.state.placeholderAccountPeople}
                        />
                        <section className="nzOptions">
                            <div className="nzOptionsTextBlock">
                                <span className="nzOptionsTextBlockELem">
                                    Не учитывать в общем балансе
                                </span>
                            </div>
                            <div className="nzOptionsSwitchBlock">
                                <Switch
                                    checked={!this.state.consider}
                                    onChange={this.handleChangeSwitch}
                                />
                            </div>
                        </section>
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
                    disabled={!this.state.update}
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