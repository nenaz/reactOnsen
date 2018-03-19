import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Input,
    Fab,
    BackButton
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
        // window.history.back()
        // this.props.changeAnimationState('backMainFromNewAccount')
        // setTimeout(() => {
        //     this.props.changeAnimationState('')
        // }, 500);
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
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountNumber}
                            onChange={this.handleNumberChange}
                            modifier='underbar'
                            float
                            placeholder={`${this.props.accountToEdit.number}` || 'Номер счета'}
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountDate}
                            onChange={this.handleDateChange}
                            modifier='underbar'
                            float
                            placeholder={`${this.props.accountToEdit.date}` || 'Действителен до'}
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.accountPeople}
                            onChange={this.handlePeopleChange}
                            modifier='underbar'
                            float
                            placeholder={`${this.props.accountToEdit.people}` || 'Имя владельца'}
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

}

export default connect((state) => ({
    accountToEdit: state.changeAccountToEdit
}), {
    changeAnimationState,
    addAccountToList,
    editAccountInList
})(EditAccount)