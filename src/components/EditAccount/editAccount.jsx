import React, { Component} from 'react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Icon,
    Input,
    // Select,
    // Toast,
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
    }

    handleAmountChange(e) {
        this.setState({ amount: e.target.value })
    }
    
    handleAccountNameChange(e) {
        this.setState({ accountName: e.target.value })
    }

    handlerCanselClick() {
        this.props.changeAnimationState('backMainFromNewAccount')
        setTimeout(() => {
            this.props.changeAnimationState('')
        }, 500);
    }

    renderToolbar() {
        return (
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left" />
                <div className="center">Edit Account</div>
                <div className="right">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerCanselClick}>
                        <ToolbarButton ref='button'>
                            <Icon icon="ion-close" />
                        </ToolbarButton>
                    </Link>
                </div>
            </Toolbar>
        )
    }

    handlerOkClick(e) {
        const updateObj = {
            id: this.props.accountToEdit._id,
            name: this.state.accountName,
            accountBalance: this.state.amount
        }
        this.props.editAccountInList(updateObj);
        this.req.send('updateAccountAmount', 'POST', updateObj) // edit account
        // this.req.send('updateAccount', 'POST', updateObj) // update all accounts
        window.history.back()
        this.handlerCanselClick()
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={{
                    margin: '8px'
                }}>
                    <section>
                        <Input
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder={this.props.accountToEdit.name || 'Название счета'}
                            style={{
                                alignContent: 'space-around',
                                margin: '10px'
                            }}
                        />
                    </section>
                    <section>
                        <Input
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            placeholder={this.props.accountToEdit.balance || '0'}
                            style={{
                                alignContent: 'space-around',
                                margin: '10px'
                            }}
                        />
                    </section>
                </div>
                <Fab position='bottom right' onClick={this.handlerOkClick}>
                    <Icon icon="ion-checkmark" style={{
                        position: 'relative',
                        top: '-3px',
                        left: '1px'
                    }} />
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