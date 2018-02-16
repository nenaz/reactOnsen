import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Icon,
    Input,
    Select,
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
import { Link } from 'react-router-dom'
import Requester from '../../js/requester'

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
            pname: 'AccountButton'
        }
        this.props.addAccountToList(addObject)
        this.req.send('addAccount', 'POST', addObject)
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
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerCanselClick}>
                        <ToolbarButton >
                            <Icon icon="ion-close" />
                        </ToolbarButton>
                    </Link>
                </div>
                <div className="center">New Account</div>
                <div className="right">
                    <ToolbarButton ref='button' onClick={this.handlerOkClick}>
                        <Icon icon="ion-checkmark" />
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }
    
    // renderBottomTollbar() {
    //     return (
    //         <div className="right">
    //             <ToolbarButton ref='button' onClick={this.handlerOkClick}>
    //                 <Icon icon="ion-checkmark" />
    //             </ToolbarButton>
    //         </div>
    //     );
    // }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={{
                    margin: '8px'
                }}>
                    <div style={{
                        margin: '8px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Input
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder="Название счета"
                            style={{
                                alignContent: 'space-around',
                                margin: '10px'
                            }}
                        />
                        <Input
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            placeholder="Начальное значение"
                            style={{
                                alignContent: 'space-around',
                                margin: '10px'
                            }}
                        />
                        <Select id="choose-sel" style={{
                            alignContent: 'space-around',
                            margin: '0 10px 10px 10px'
                        }} value={this.state.modifier} modifier={this.state.modifier} onChange={this.editSelects}>
                            <option value="basic">Basic</option>
                            <option value="material">Material</option>
                            <option value="underbar">Underbar</option>
                        </Select>
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
                    <Icon icon="ion-checkmark" style={{
                        position: 'relative',
                        top: '-3px',
                        left: '1px'
                    }}/>
                </Fab>
            </Page>
        )
    }
}

export default connect(null, {
    changeAnimationState,
    addAccountToList
})(AddAccount)