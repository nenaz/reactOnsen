import React,{ Component} from 'react'
import {
    Page,
    Toolbar,
    Modal,
    ProgressCircular,
    Fab,
    BackButton,
    // Carousel,
    // CarouselItem
} from 'react-onsenui'
import { connect } from 'react-redux'
import { changeAnimationState, addOperationToList, editAccountInList } from '../../AC'
import '../../css/App.css'
import Utils from '../../js/utils'
import KeyboardMain from '../Keyboard'
import Requester from '../../js/requester'
import GetCoord from '../../js/coorditates'
import { ICONCHECKING } from '../../js/consts'
import Icon from '../Icon'
import AmountInput from './AmountInput'
import PageCategory from './pageCategory'
import PageAccount from './pageAccounts'

const COEFFICIENT = 0.46;
// const FORMULA = `calc(1rem + ((1vw - ${this.generateAmountFontSize()}) * 20))`;


class AddOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            inputAmount: '0',
            typeOperation: this.props.typeOperation || '0',
            comma: false,
            part: '00',
            accountBalance: '0,00',
            accountName: (props.changeAccountsList.length) ?
                props.changeAccountsList[0].name : '',
            accountNameTo: (props.changeAccountsList.length) ?
                props.changeAccountsList[0].name : '',
            id: (props.changeAccountsList.length) ?
                this.props.changeAccountsList[0]._id : '',
            idTo: (props.changeAccountsList.length) ?
                this.props.changeAccountsList[0]._id : '',
            amountfontSize: 'calc(1rem + (1vw - 0px) * 20)',
            section1Class: '',
            section2Class: '',
            showPageAccounts: false,
            showPageCategory: false,
            categoryId: null,
            showProcess: false,
            modalOpen: false,
            carouselIndex: 0,
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
        this.selectTypeOperation = this.selectTypeOperation.bind(this)
        this.handleSelectAccountTo = this.handleSelectAccountTo.bind(this)
        this.handleChangeCarousel = this.handleChangeCarousel.bind(this)
        this.setIndex = this.setIndex.bind(this)
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
            amount: `${this.state.inputAmount}.${this.state.part}`,
            currency: 'RUB',
            data: Utils.nowDate(true),
            typeOperation: this.state.typeOperation,
            _id: Utils.getRandomId(),
            operCoord: {
                lat: coord.coords.latitude,
                lon: coord.coords.longitude
            },
            id: this.state.id,
            categoryId: this.state.categoryId,
        }
        if (this.state.typeOperation === '2') {
            addObject.idTo = this.state.idTo
        }
        this.props.addOperationToList(addObject)
        this.req.request('addItem', addObject)
        this.props.editAccountInList(addObject)
        // if (this.state.typeOperation === '2') {
        //     this.props.editAccountInList(addObject)
        // }
    }

    editAccountInList(addObject) {
        const obj = this.props.changeAccountsList.find(item => { return item._id === this.state.id })
        debugger
        const updateObj = {
            amount: obj.amount,
            id: obj._id,
            name: obj.name,
            accountDate: obj.accountDate,
            accountNumber: obj.accountNumber,
            accountPeople: obj.accountPeople,
        }
        this.req.request('updateItem', updateObj)
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    selectTooltipForRendering() {
        if (this.state.showPageAccounts || this.state.showPageCategory) {
            return this.renderToolbarForSelect()
        }
        return this.renderToolbar()
    }

    renderToolbar() {
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
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handlerBackClick}>Back</BackButton>
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

    handleSelectAccountTo(e) {
        this.setState({
            idTo: e.currentTarget.getAttribute('id'),
            accountNameTo: e.currentTarget.getAttribute('name')
        })
        this.handlerBackClick()
    }

    handleSelectCategoty(e) {
        console.log(e.currentTarget.getAttribute('id'))
        this.setState({
            categoryId: e.currentTarget.getAttribute('id')
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

    selectTypeOperation(typeOperation) {
        this.setState({ 
            typeOperation,
            carouselIndex: typeOperation * 1
        })
    }

    handleChangeCarousel(event) {
        this.setState({
            typeOperation: `${event.activeIndex}`,
            carouselIndex: event.activeIndex * 1
        })
    }

    setIndex(event) {
        // debugger
        // this.setState({ carouselIndex: index });
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
                    <AmountInput
                        typeOperation={this.state.typeOperation}
                        handleRunAnimation={this.handleRunAnimation}
                        inputAmount={this.state.inputAmount}
                        comma={this.state.comma}
                        part={this.state.part}
                        amountfontSize={this.state.amountfontSize}
                        accountName={this.state.accountName}
                        accountNameTo={this.state.accountNameTo}
                        categoryId={this.state.categoryId}
                        // typeOperation={this.state.typeOperation}
                        selectTypeOperation={this.selectTypeOperation}
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