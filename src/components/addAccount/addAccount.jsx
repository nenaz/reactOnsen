import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Icon,
    Input,
    Select
} from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import { connect } from 'react-redux'
import { changeAnimationState } from '../../AC'
import { Link } from 'react-router-dom'

class AddAccount extends Component{
    constructor(props){
        super(props)
        this.state ={
            accountName: '',
            amount: '',
            modifier: ''
        }

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerButtonClick = this.handlerButtonClick.bind(this)
        this.handleAccountNameChange = this.handleAccountNameChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
    }

    handlerButtonClick() {
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
        this.setState({ 
            amount: e.target.value
        });
    }

    handleEditSelects(e) {
        this.setState({ modifier: e.target.value });
    }

    renderToolbar() {
        return (
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerButtonClick}>
                        <ToolbarButton >
                            <Icon icon="ion-close" />
                        </ToolbarButton>
                    </Link>
                </div>
                <div className="center">New Account</div>
                <div className="right">
                    <ToolbarButton onClick={this.showPopover} ref='button'>
                        <Icon icon="ion-checkmark" />
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }

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
            </Page>
        )
    }
}

export default connect(null,{
    changeAnimationState
})(AddAccount)