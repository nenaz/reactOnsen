import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    Icon,
    ToolbarButton,
    Button
} from 'react-onsenui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAnimationState, addOperationToList, editAccountInList } from '../../AC'
import '../../css/App.css'
import Utils from '../../js/utils'
import KeyboardMain from '../Keyboard'
import TypeOperation from './typeOperation'
import Requester from '../../js/requester'

class AddOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            inputAmount: '0',
            typeOperation: this.props.typeOperation || "0",
            comma: false,
            part: '00',
            accountBalance: '0,00',
            accountName: props.changeAccountsList[0].name,
        }

        this.req = new Requester()

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
        const addObject = {
            amount: `${this.state.inputAmount}.${this.state.part}`,
            currency: 'RUB',
            data: Utils.nowDate(true),
            account: this.state.accountName
        }
        this.props.addOperationToList(addObject)
        this.props.editAccountInList({
            accountBalance: addObject.amount,
            accountName: addObject.account
        })
        this.req.send('addOperation', 'POST', addObject)
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
                position: 'relative',
                backgroundColor: 'rgb(0, 140, 164)'
            }}>
                <div className="left">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.handlerCanselClick}>
                        <ToolbarButton >
                            <Icon icon="ion-close" style={{
                                color: 'white'
                            }}/>
                        </ToolbarButton>
                    </Link>
                </div>
                <div className="center" style={{
                    color: 'white'
                }}></div>
                <div className="right">
                    <ToolbarButton ref='button' onClick={this.handlerOkClick}>
                        <Icon icon="ion-checkmark" style={{
                            color: 'white'
                        }}/>
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

    componentDidMount() {
        const elem = document.getElementsByClassName('nzAmountTextBlock')[0]
        const width = elem.offsetWidth
        elem.style.maxWidth = width + 'px'
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <TypeOperation typeOperation={this.props.typeOperation}/>
                <div className="nzAmountInput">
                    <div className="nzAmountItem nzTypeOperation">
                        <span>{Utils.convertTypeOperation(this.props.typeOperation)}</span>
                    </div>
                    <div className="nzAmountItem nzAmountTextBlock">
                        <span>{this.state.inputAmount}{(this.state.comma) ? ',' : ''}{(this.state.comma) ?
                            this.state.part : ''}</span>
                    </div>
                    <div className="nzAmountItem nzCurrency">
                        <span>RUB</span>
                    </div>
                </div>
                <div className="nzFromToText">
                    <select onChange={this.handleChangeSelect}>
                        {this.props.changeAccountsList.map((item, key) => {
                            return <option key={key} defaultValue={(item.name === this.state.accountName) ? this.state.accountName : ""}
                                value={item.name} balance={item.balance}>
                                {item.name}
                            </option>
                        })}
                    </select>
                    <span>{this.state.accountBalance}</span>
                </div>
                
                <Button className="" modifier='outline large'>Шаблоны</Button>
                <KeyboardMain
                    handlerClickCalcButton={this.handlerClickCalcButton}
                    handlerClickBackButton={this.handlerClickBackButton}
                    handlerClickCommaButton={this.handlerClickCommaButton}
                    handlerMathOperationClick={this.handlerMathOperationClick}
                />
            </Page>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList,
    typeOperation: state.changeTypeOperation
}), {
    changeAnimationState,
    addOperationToList,
    editAccountInList
})(AddOperation)