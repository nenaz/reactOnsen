import React,{ Component} from 'react'
import {
    Page,
    Modal,
    ProgressCircular,
    Fab,
} from 'react-onsenui'
import { connect } from 'react-redux'
import {
    changeAnimationState,
    addOperationToList,
    editAccountInList,
    selectTypeOperation,
    editData,
    addOneCategoryForChart,
    saveDataOfScan,
} from '../../../../AC'
import '../../../../css/App.css'
import Utils from '../../../../js/utils'
import KeyboardMain from '../../../Keyboard'
import Requester from '../../../../js/requester'
import GetCoord from '../../../../js/coorditates'
import { ICONCHECKING } from '../../../../js/consts'
import Icon from '../../../Icon'
import SelectTypeOperation from '../../../SelectTypeOperation'
import PageCategory from '../../Category'
import PageAccount from '../../Account'
import ToolbarCustom from '../../../ToolbarCustom'

const COEFFICIENT = 0.46;
// const FORMULA = `calc(1rem + ((1vw - ${this.generateAmountFontSize()}) * 20))`;


class AddOperation extends Component{
    constructor(props){
        super(props)
        this.state ={
            inputAmount: '0',
            comma: false,
            part: '00',
            accountBalance: '0,00',
            accountName: (props.changeAccountsList.length)
                ? props.changeAccountsList[0].accountName : '',
            accountFromAmount: (props.changeAccountsList.length)
                ? String(props.changeAccountsList[0].amount) : '0',
            accountNameTo: (props.changeAccountsList.length > 1)
                ? props.changeAccountsList[1].accountName : '',
            accountToAmount: (props.changeAccountsList.length > 1)
                ? String(props.changeAccountsList[1].amount) : '0',
            id: (props.changeAccountsList.length)
                ? this.props.changeAccountsList[0]._id : '',
            idTo: (props.changeAccountsList.length > 1)
                ? this.props.changeAccountsList[1]._id : '',
            amountfontSize: 'calc(1rem + (1vw - 0px) * 20)',
            section1Class: '',
            section2Class: '',
            showPageAccounts: false,
            showPageCategory: false,
            categoryId: '0-0',
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
        this.handleRunAnimation = this.handleRunAnimation.bind(this)
        this.handlerBackClick = this.handlerBackClick.bind(this)
        this.handleSelectAccount = this.handleSelectAccount.bind(this)
        this.handleSelectCategoty = this.handleSelectCategoty.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSelectAccountTo = this.handleSelectAccountTo.bind(this)
        this.generateAmountFontSize = this.generateAmountFontSize.bind(this)
        this.addOperationToList = this.addOperationToList.bind(this)
        this.editAccountInList = this.editAccountInList.bind(this)
        this.renderToolbarForSelect = this.renderToolbarForSelect.bind(this)
        this.selectTooltipForRendering = this.selectTooltipForRendering.bind(this)
        this.selectRenderBackgroundPage = this.selectRenderBackgroundPage.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.selectAddOrEditDataForChart = this.selectAddOrEditDataForChart.bind(this)
    }

    componentDidMount() {
        const elem = document.getElementsByClassName('nzAmountTextBlock')[0]
        const width = elem.offsetWidth
        elem.style.maxWidth = width + 'px'
        if (this.props.dataScanner) {
            this.props.saveDataOfScan(null)
            const data = this.props.dataScanner.text
            const t1 = data.indexOf('&s=')
            const t2 = data.indexOf('&fn=')
            const count = Math.ceil(data.substring(t1 + 3, t2) * 1)
            this.setState({
                inputAmount: count,
            }, () => {
                this.props.saveDataOfScan(null)
            })
        }
    }

    handlerOkClick() {
        this.setState({
            modalOpen: true
        }, () => {
            // this.Pos.getPositions().then((coord) => {
                this.addOperationToList({
                    coords: {
                        latitude: 54,
                        longitude: 54,
                    }
                })
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
            date: Utils.nowDate(false, false, true),
            typeOperation: this.props.typeOperation,
            _id: Utils.getRandomId(),
            operCoord: {
                lat: coord.coords.latitude,
                lon: coord.coords.longitude
            },
            id: this.state.id,
            categoryId: this.state.categoryId,
            accountName: this.state.accountName
        }
        if (this.props.typeOperation === '2') {
            addObject.accountNameTo = this.state.accountNameTo
            addObject.idTo = this.state.idTo
        }
        this.props.addOperationToList(addObject)
        this.selectAddOrEditDataForChart(addObject)
        this.req.request('addItem', addObject)
    }

    editAccountInList() {
        const updateObj = {
            amount: Number(`${this.state.inputAmount}.${this.state.part}`),
            idFrom: this.state.id,
            accountNameFrom: this.state.accountName,
            accountFromAmount: this.state.accountFromAmount * 1,
            typeOperation: this.props.typeOperation,
        }
        if (this.props.typeOperation !== '2') {
            this.props.editAccountInList(updateObj)
            this.req.request('updateItem', updateObj)
        } else {
            const transferObj = {
                accountNameTo: this.state.accountNameTo,
                idTo: this.state.idTo,
                amount: Number(`${this.state.inputAmount}.${this.state.part}`),
                transfer: true,
                accountToAmount: this.state.accountToAmount * 1,
                typeOperation: '1',
            }
            updateObj.typeOperation = '0'
            this.props.editAccountInList(transferObj)
            const obj = Object.assign({}, updateObj, transferObj)
            this.req.request('transfer', obj)
        }
        this.props.editAccountInList(updateObj)
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
        this.props.selectTypeOperation('0');
    }

    selectTooltipForRendering() {
        if (this.state.showPageAccounts || this.state.showPageCategory) {
            return this.renderToolbarForSelect()
        }
        return this.renderToolbar()
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="Новая операция"
                handlerCanselClick={this.handleClick}
            />
        )
    }

    renderToolbarForSelect() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title={this.props.route.title}
                handlerCanselClick={this.handlerBackClick}
                className="nzCatToolbar"
            />
        )
    }

    handleClick() {
        this.props.navigator.popPage();
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

    handleRunAnimation(type, transfer) {
        this.setState({
            section1Class: 'section1Class transition',
            section2Class: 'section2Class transition'
        })
        if (!type) {
            this.setState({
                showPageAccounts: true,
                transfer
            })
        } else {
            this.setState({
                showPageCategory: true,
                transfer
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
                    handleSelectAccount={(!this.state.transfer)
                        ? this.handleSelectAccount
                        : this.handleSelectAccountTo
                    }
                />
            </section>)
    }

    handleSelectAccount(e) {
        const id = e.currentTarget.getAttribute('id');
        const obj = this.props.changeAccountsList.find(item => {
            return item._id === id
        })
        this.setState({
            id,
            accountName: e.currentTarget.getAttribute('name'),
            accountFromAmount: String(obj.amount),
        })
        this.handlerBackClick()
    }

    handleSelectAccountTo(e) {
        const idTo = e.currentTarget.getAttribute('id')
        const obj = this.props.changeAccountsList.find(item => {
            return item._id === idTo
        })
        this.setState({
            idTo,
            accountNameTo: e.currentTarget.getAttribute('name'),
            accountToAmount: String(obj.amount),
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

    selectAddOrEditDataForChart(obj) {
        const res = this.props.dataForChart.find(function (item) {
            return item.catId === +obj.categoryId[0]
        })
        if (res) {
            this.props.editData(obj)
        } else {
            this.props.addOneCategoryForChart(obj)
        }
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
                    <SelectTypeOperation
                        typeOperation={this.props.typeOperation}
                        handleRunAnimation={this.handleRunAnimation}
                        inputAmount={this.state.inputAmount}
                        comma={this.state.comma}
                        part={this.state.part}
                        amountfontSize={this.state.amountfontSize}
                        accountName={this.state.accountName}
                        accountFromAmount={this.state.accountFromAmount}
                        accountNameTo={this.state.accountNameTo}
                        accountToAmount={this.state.accountToAmount}
                        categoryId={this.state.categoryId}
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
    typeOperation: state.changeTypeOperation,
    dataForChart: state.redAddDataToList,
    dataScanner: state.saveDataOfScan || null,
}), {
    changeAnimationState,
    addOperationToList,
    editAccountInList,
    selectTypeOperation,
    editData,
    addOneCategoryForChart,
    saveDataOfScan,
})(AddOperation)