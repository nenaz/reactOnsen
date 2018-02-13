import React, { Component} from 'react'
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
import { connect } from 'react-redux'
import {
    changeAnimationState,
    addAccountToList
} from '../../AC'
import { Link } from 'react-router-dom'

class EditAccount extends Component{
    constructor(props){
        super(props)
        this.state = {}

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.handlerOkClick = this.handlerOkClick.bind(this)
    }

    // componentWillMount() {

    // }

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

    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={{
                    margin: '8px'
                }}>
                    <section>
                        
                    </section>
                    
                    
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
                        {/* <Select
                            id="choose-sel"
                            style={{
                                alignContent: 'space-around',
                                margin: '0 10px 10px 10px'
                            }}
                            value={this.state.modifier}
                            modifier={this.state.modifier}
                            onChange={this.editSelects}
                        >
                            <option value="basic">Basic</option>
                            <option value="material">Material</option>
                            <option value="underbar">Underbar</option>
                        </Select> */}
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
    addAccountToList
})(EditAccount)