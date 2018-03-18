import React,{ Component} from 'react'
import {
    Page,
    Input,
    Toast,
    Fab
} from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import { connect } from 'react-redux'
import {
    changeAnimationState,
    addAccountToList
} from '../../AC'
import Requester from '../../js/requester'
import Utils from '../../js/utils'
import { ICONCHECKING } from '../../js/consts'
import Icon from '../Icon'
import ToolbarC from '../Toolbar'

class AddAccount extends Component{
    constructor(props){
        super(props)
        this.state ={
            accountName: '',
            amount: '',
            modifier: '',
            toastShown: false,
            error: false
        }

        this.req = new Requester()

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.handleAccountNameChange = this.handleAccountNameChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.handlerOkClick = this.handlerOkClick.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleDismiss = this.handleDismiss.bind(this)
    }

    handlerCanselClick() {
        this.props.changeAnimationState('backMainFromNewAccount')
        setTimeout(() => {
            this.props.changeAnimationState('')
        }, 500);
    }

    handleAccountNameChange(e) {
        this.setState({ 
            accountName: e.target.value
        });
    }
    
    handleAmountChange(e) {
        let noError = (e && e.data) ? e.data.match(/\d/) : null
        if (noError === null) {
            this.setState({
                error: true
            })
        }
        this.setState({ 
            amount: e.target.value
        })
    }

    handleEditSelects(e) {
        this.setState({ modifier: e.target.value });
    }

    handlerOkClick(e) {
        const addObject = {
            name: this.state.accountName,
            balance: this.state.amount,
            currency: 'RUB',
            pname: 'AccountButton',
            _id: Utils.getRandomId()
        }
        this.props.addAccountToList(addObject)
        this.req.setLocal('localAccounts', addObject)
        window.history.back()
        this.handlerCanselClick()
    }

    handleDismiss() {
        this.setState({
            toastShown: false 
        })
    }

    handleShow() {
        this.setState({
            toastShown: true
        })
    }

    renderToolbar() {
        return (
            <ToolbarC
                title='Добавить счет'
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className="nzAddAccountPage">
                    <div className="nzAddAccountPageInputBlock">
                        <Input
                            className="nzNewAccountName"
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder="Название счета"
                        />
                        <Input
                            className="nzNewAmountValue"
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            placeholder="Начальное значение"
                        />
                    </div>
                </div>
                <Toast isOpen={this.state.toastShown}>
                    <div className="message">
                        An error has occurred!
                    </div>
                    <button onClick={this.handleDismiss}>
                        Dismiss
                    </button>
                </Toast>
                <Fab position='bottom right' onClick={this.handlerOkClick}>
                    <Icon iconBase64={ICONCHECKING} />
                </Fab>
            </Page>
        )
    }
}

export default connect(null, {
    changeAnimationState,
    addAccountToList
})(AddAccount)