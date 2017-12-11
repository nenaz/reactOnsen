import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    Icon,
    ToolbarButton,
    Button,
    Select
} from 'react-onsenui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAnimationState, addOperationToList } from '../../AC'
import '../../css/App.css'
import Utils from '../../js/utils'

class AddOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            inputAmount: '0',
            CD: '',
            comma: false,
            part: '00',
            accountBalance: '0,00',
            accountName: props.changeAccountsList[0].name,
        }

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerOkClick = this.handlerOkClick.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.handlerClickCalcButton = this.handlerClickCalcButton.bind(this)
        this.handlerMathOperationClick = this.handlerMathOperationClick.bind(this)
        this.handlerClickBackButton = this.handlerClickBackButton.bind(this)
        this.handlerClickCommaButton = this.handlerClickCommaButton.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }

    handlerOkClick(e) {
        this.props.addOperationToList({
            amount: `${this.state.inputAmount},${this.state.part}`,
            currency: 'RUB',
            data: Utils.nowDate(true),
            account: ''
        })
        window.history.back()
        this.handlerCanselClick()
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
                <div className="left">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerCanselClick}>
                        <ToolbarButton >
                            <Icon icon="ion-close" />
                        </ToolbarButton>
                    </Link>
                </div>
                <div className="center">New Operation</div>
                <div className="right">
                    <ToolbarButton ref='button' onClick={this.handlerOkClick}>
                        <Icon icon="ion-checkmark" />
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }

    handlerClickCalcButton(e) {
        const amount = (this.state.inputAmount === '0') ? '' : this.state.inputAmount
        const part = (this.state.part === '00') ? '' : this.state.part
        if (this.state.comma) {
            this.setState({
                part: part + e.target.textContent
            })
        } else {
            this.setState({
                inputAmount: amount + e.target.textContent
            })
        }
    }

    handlerMathOperationClick() {

    }

    handlerClickBackButton(e) {
        const amount = this.state.inputAmount
        const part = this.state.part
        if (this.state.comma) {
            if (part.length) {
                this.setState({
                    part: part.substring(0, part.length - 1)
                })
            } else {
                this.setState({
                    comma: false
                })
            }
        } else {
            this.setState({
                inputAmount: amount.substring(0, amount.length - 1)
            })
        }
    }

    handlerClickCommaButton() {
        this.setState({
            comma: true
        })
    }

    handleChangeSelect(event) {
        this.setState({
            accountName: event.target.value,
            accountBalance: event.target.selectedOptions[0].getAttribute('balance')
        });
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className="nzTitle">
                    <Button className="nzTitleCol">Доход</Button>
                    <Button className="nzTitleCol">Расход</Button>
                    <Button className="nzTitleCol">Перевод</Button>
                </div>
                <div className="nzAmountInput">
                    <span>{this.state.CD}</span>
                    <div className="nzAmountTextBlock">
                        <span>{this.state.inputAmount}{(this.state.comma) ? ',' : ''}{(this.state.comma) ?
                            this.state.part : ''}</span>
                    </div>
                    <span>RUB</span>
                </div>
                <div className="nzFromToText">
                    <select onChange={this.handleChangeSelect}>
                        {this.props.changeAccountsList.map((item, key) => {
                            return <option selected={(item.name === this.state.accountName) ? "selected" : ""}
                                value={item.name} balance={item.balance}>
                                {item.name}
                            </option>
                        })}
                    </select>
                    <span>{this.state.accountBalance}</span>
                </div>
                <div className='nzKeyboard'>
                    <div className="nzButtonsBlock1">
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>9</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>8</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>7</Button>
                        </div>
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>6</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>5</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>4</Button>
                        </div>
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>3</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>2</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>1</Button>
                        </div>
                        <div className="nzButtonRow">
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickBackButton}>Back</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCalcButton}>0</Button>
                            <Button class="nzButton" modifier='quiet' onClick={this.handlerClickCommaButton}>,</Button>
                        </div>
                    </div>
                    <div className="nzButtonsBlock2">
                        <div className="nzButtonCol">
                            <Button class="nzButton" modifier='outline' onClick={this.handlerMathOperationClick}>/</Button>
                            <Button class="nzButton" modifier='outline'>*</Button>
                            <Button class="nzButton" modifier='outline'>-</Button>
                            <Button class="nzButton" modifier='outline'>+</Button>
                            <Button class="nzButton" modifier='outline'>=</Button>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList,
}), {
    changeAnimationState,
    addOperationToList
})(AddOperation)