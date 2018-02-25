import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Select,
    Radio,
    List,
    ListItem
} from 'react-onsenui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAnimationState, addOperationToList, editAccountInList } from '../../AC'
import '../../css/App.css'
import Utils from '../../js/utils'
import KeyboardMain from '../Keyboard'
import TypeOperation from './typeOperation'
import Requester from '../../js/requester'
import { ICONCHECKING, ICONCANCEL } from '../../js/consts'
import Icon from '../Icon'
import AmountInput from './AmountInput'

const COEFFICIENT = 0.46;
// const FORMULA = `calc(1rem + ((1vw - ${this.generateAmountFontSize()}) * 20))`;


class AddOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            inputAmount: '0',
            typeOperation: this.props.typeOperation || "0",
            comma: false,
            part: '00',
            accountBalance: '0,00',
            accountName: (props.changeAccountsList.length) ?
                props.changeAccountsList[0].name : '',
            id: (props.changeAccountsList.length) ?
                this.props.changeAccountsList[0]._id : '',
            amountfontSize: 'calc(1rem + (1vw - 0px) * 20)',
            section1Class: '',
            section2Class: ''
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
        this.generateAmountFontSize = this.generateAmountFontSize.bind(this)
        this.addOperationToList = this.addOperationToList.bind(this)
        this.editAccountInList = this.editAccountInList.bind(this)
        this.renderRowRadio = this.renderRowRadio.bind(this)
        this.handleRunAnimation = this.handleRunAnimation.bind(this)
    }

    handlerOkClick() {
        this.addOperationToList()
        this.editAccountInList()
        window.history.back()
        this.handlerCanselClick()
    }

    addOperationToList() {
        const addObject = {
            balance: `${this.state.inputAmount}.${this.state.part}`,
            currency: 'RUB',
            data: Utils.nowDate(true),
            typeOperation: this.state.typeOperation,
            _id: this.state.id
        }
        this.props.addOperationToList(addObject)
        this.req.setLocal('localItems', addObject)
        this.props.editAccountInList(addObject)
    }

    editAccountInList() {
        const obj = this.props.changeAccountsList.find(item => { return item._id === this.state.id })
        const updateObj = {
            balance: obj.balance,
            _id: obj._id
        }
        this.req.updateItem('localAccounts', updateObj)
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
                            <Icon iconBase64={ICONCANCEL} />
                        </ToolbarButton>
                    </Link>
                </div>
                <div className="center" style={{
                    color: 'white'
                }}></div>
                <div className="right">
                    <ToolbarButton ref='button' onClick={this.handlerOkClick}>
                        <Icon iconBase64={ICONCHECKING} />
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
                inputAmount: amount + e.target.textContent,
            }, () => {
                this.generateAmountFontSize();
            });
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
            }, () => {
                this.generateAmountFontSize();
            });
        }
    }

    handlerClickCommaButton() {
        this.setState({
            comma: true
        })
    }

    handleChangeSelect(event) {
        this.setState({
            id: event.target.selectedOptions[0].getAttribute('id')
        });
    }

    componentDidMount() {
        const elem = document.getElementsByClassName('nzAmountTextBlock')[0]
        const width = elem.offsetWidth
        elem.style.maxWidth = width + 'px'
    }

    generateAmountFontSize() {
        const nowLength = this.state.inputAmount.length - 5;
        let res;
        if (nowLength > 0) {
            res = COEFFICIENT * nowLength;
        } else {
            res = 0;
        }
        this.setState({
            amountfontSize: `calc(1rem + (1vw - ${res}px) * 20)`,
        });
    }

    renderRowRadio(row) {
        return (
            <ListItem key={row.id}>
                <label className='left'>
                    <Radio />
                </label>
                <label className='center'>{row.text}</label>
            </ListItem>
        )
    }

    handleRunAnimation() {
        this.setState({
            section1Class: 'section1Class transition',
            section2Class: 'section2Class transition',
        })
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar} style={{
                overflow: 'hidden'
            }}>
                <section className={`sectionClass ${this.state.section1Class}`}>
                    <TypeOperation typeOperation={this.props.typeOperation} />
                    <AmountInput
                        typeOperation={this.props.typeOperation}
                        handleRunAnimation={this.handleRunAnimation}
                    />
                </section>
                <section className={`sectionClass ${this.state.section2Class}`}>
                    <KeyboardMain
                        handlerClickCalcButton={this.handlerClickCalcButton}
                        handlerClickBackButton={this.handlerClickBackButton}
                        handlerClickCommaButton={this.handlerClickCommaButton}
                        handlerMathOperationClick={this.handlerMathOperationClick}
                    />
                </section>
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