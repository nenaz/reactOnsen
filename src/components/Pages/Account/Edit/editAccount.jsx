import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Toolbar,
    Input,
    Fab,
    BackButton
} from 'react-onsenui'
import { connect } from 'react-redux'
import {
    editAccountInList
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
            // amount: this.props.accountToEdit.amount || '0',
            amount: '0',
            accountName: this.props.accountToEdit.name || 'Название счета',
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
            amount: this.state.amount,
            idFrom: this.props.accountToEdit._id,
            accountNameFrom: this.state.accountName,
            accountDate: this.state.accountDate,
            accountNumber: this.state.accountNumber,
            accountPeople: this.state.accountPeople,
        }
        this.props.editAccountInList(updateObj)
        this.req.request('updateAccounts', updateObj)
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
                    position='bottom right'
                    onClick={this.handlerOkClick}
                >
                    <Icon iconBase64={ICONCHECKING} />
                </Fab>
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
    editAccountInList
})(EditAccount)