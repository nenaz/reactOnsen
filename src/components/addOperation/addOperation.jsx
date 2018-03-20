import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    ToolbarButton,
    Modal,
    ProgressCircular,
    Fab,
    BackButton
} from 'react-onsenui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeAnimationState, addOperationToList, editAccountInList } from '../../AC'
import '../../css/App.css'
import Utils from '../../js/utils'
import KeyboardMain from '../Keyboard'
import TypeOperation from './typeOperation'
import Requester from '../../js/requester'
import GetCoord from '../../js/coorditates'
import { ICONCHECKING, ICONCANCEL, ICONBACK } from '../../js/consts'
import Icon from '../Icon'
import AmountInput from './AmountInput'
import PageCategory from './pageCategory'
import PageAccount from './pageAccounts'
import ToolbarC from '../Toolbar'

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
            section2Class: '',
            showPageAccounts: false,
            showPageCategory: false,
            categoryId: null,
            showProcess: false,
            modalOpen: false,
        }

        this.req = new Requester()
        this.Pos = new GetCoord()

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
        this.handleRunAnimation = this.handleRunAnimation.bind(this)
        this.handlerBackClick = this.handlerBackClick.bind(this)
        this.renderToolbarForSelect = this.renderToolbarForSelect.bind(this)
        this.selectTooltipForRendering = this.selectTooltipForRendering.bind(this)
        this.selectRenderBackgroundPage = this.selectRenderBackgroundPage.bind(this)
        this.handleSelectAccount = this.handleSelectAccount.bind(this)
        this.handleSelectCategoty = this.handleSelectCategoty.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
        // this.handleSelectAccount = this.handleSelectAccount.bind(this)
    }

    componentDidMount() {
        const elem = document.getElementsByClassName('nzAmountTextBlock')[0]
        const width = elem.offsetWidth
        elem.style.maxWidth = width + 'px'
    }

    handlerOkClick() {
        this.setState({
            modalOpen: true
        }, () => {
            // this.Pos.getPositions().then((coord) => {
                this.addOperationToList(
                    {
                        coords: {
                            latitude: 54,
                            longitude: 54,
                        }
                    }
                )
                this.editAccountInList()
                this.handlerCanselClick()
            // })
        })
    }

    addOperationToList(coord) {
        const addObject = {
            balance: `${this.state.inputAmount}.${this.state.part}`,
            currency: 'RUB',
            data: Utils.nowDate(true),
            typeOperation: this.state.typeOperation,
            _id: Utils.getRandomId(),
            operCoord: {
                lat: coord.coords.latitude,
                lon: coord.coords.longitude
            }
        }
        this.props.addOperationToList(addObject)
        // this.req.setLocal('localItems', addObject)
        this.req.save('addItem', addObject)
        this.props.editAccountInList(addObject)
    }

    editAccountInList() {
        const obj = this.props.changeAccountsList.find(item => { return item._id === this.state.id })
        const updateObj = {
            balance: obj.balance,
            _id: obj._id
        }
        // this.req.updateItem('localAccounts', updateObj)
        this.req.save('updateItem', updateObj)
    }

    handlerCanselClick() {
        // window.history.back()
        // this.props.changeAnimationState('backMainFromNewAccount')
        // setTimeout(() => {
        //     this.props.changeAnimationState('')
        //     this.setState({
        //         modalOpen: false
        //     })
        // }, 500);
        this.props.navigator.popPage();
    }

    selectTooltipForRendering() {
        if (this.state.showPageAccounts || this.state.showPageCategory) {
            return this.renderToolbarForSelect()
        }
        return this.renderToolbar()
    }

    renderToolbar() {
        // return (
        //     <ToolbarC
        //         title = 'Добавить запись'
        //         handlerCanselClick = { this.handlerCanselClick }
        //     />
        // )
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handleClick}>Back</BackButton>
            : null;
        return (
            <Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>{this.props.route.title}</div>
            </Toolbar>
        )
    }

    handleClick() {
        this.props.navigator.popPage();
    }

    renderToolbarForSelect() {
        // return (
        //     <Toolbar className="nzCatToolbar">
        //         <div className="left">
        //             <ToolbarButton ref='button' onClick={this.handlerBackClick}>
        //                 <Icon iconBase64={ICONBACK}/>
        //             </ToolbarButton>
        //         </div>
        //         <div className="center" />
        //         <div className="right">
        //             <ToolbarButton ref='button' />
        //         </div>
        //     </Toolbar>
        // )
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handlerCanselClick}>Back</BackButton>
            : null;
        return (
            <Toolbar className="nzCatToolbar">
                <div className='left'>{backButton}</div>
                <div className='center'>{this.props.route.title}</div>
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

    handleRunAnimation(type) {
        this.setState({
            section1Class: 'section1Class transition',
            section2Class: 'section2Class transition'
        })
        if (!type) {
            this.setState({
                showPageAccounts: true
            })
        } else {
            this.setState({
                showPageCategory: true
            })
        }
    }

    handlerBackClick() {
        this.setState({
            section1Class: '',
            section2Class: '',
            showPageAccounts: false,
            showPageCategory: false
        })
    }

    selectRenderBackgroundPage() {
        return (this.state.showPageCategory) ?
            (<section className="sectionClass sectionCategory">
                <PageCategory
                    handleSelectCategoty={this.handleSelectCategoty}
                />
            </section>) :
            (<section className="sectionClass sectionAccount">
                <PageAccount
                    handleSelectAccount={this.handleSelectAccount}
                />
            </section>)
    }

    handleSelectAccount(e) {
        this.setState({
            id: e.currentTarget.getAttribute('id'),
            accountName: e.currentTarget.getAttribute('name')
        })
        this.handlerBackClick()
    }

    handleSelectCategoty(e) {
        console.log(e.currentTarget.getAttribute('id'))
        this.setState({
            typeOperation: e.currentTarget.getAttribute('id')
        })
        this.handlerBackClick()
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.modalOpen}>
                <ProgressCircular indeterminate className="nzProgressAddOper" />
            </Modal>
        )
    }

    render() {
        const pageAcc = this.selectRenderBackgroundPage()
        return (
            <Page
                className="nzPageNewItem"
                renderToolbar={this.selectTooltipForRendering}
                renderModal={this.renderModal}
            >
                <section className={`sectionClass sectionBlock ${this.state.section1Class}`}>
                    <TypeOperation typeOperation={this.props.typeOperation} />
                    <AmountInput
                        typeOperation={this.props.typeOperation}
                        handleRunAnimation={this.handleRunAnimation}
                        inputAmount={this.state.inputAmount}
                        comma={this.state.comma}
                        part={this.state.part}
                        amountfontSize={this.state.amountfontSize}
                        accountName={this.state.accountName}
                    />
                </section>
                <section className={`sectionClass sectionBlock ${this.state.section2Class}`}>
                    <KeyboardMain
                        handlerClickCalcButton={this.handlerClickCalcButton}
                        handlerClickBackButton={this.handlerClickBackButton}
                        handlerClickCommaButton={this.handlerClickCommaButton}
                        handlerMathOperationClick={this.handlerMathOperationClick}
                    />
                    <Fab
                        className="nzFabButtonCansel"
                        modifier="mini"
                        onClick={this.handlerCanselClick}
                    >
                        <span className="icon-left-arrow" />
                    </Fab>
                    <Fab
                        position='bottom right'
                        onClick={this.handlerOkClick}
                    >
                        <Icon iconBase64={ICONCHECKING} />
                    </Fab>
                </section>
                {pageAcc}
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