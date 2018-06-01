import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    BackButton,
    Toolbar,
    Switch,
    AlertDialog,
    Modal,
    Checkbox,
} from 'react-onsenui'
import Requester from '../../../js/requester'
import Sync from '../../../js/sync'

class OptionsPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            checked: JSON.parse(localStorage.getItem('localOptions')).connectDB || false,
            alertDialogShow: false,
            isOpenModal: false,
            sync: false,
            alertDialogSyncShow: false,
            syncText: '',
            sync1: false,
            sync2: false,
            sync3: false,
            sync4: false,
        }

        this.req = new Requester()
        this.sync = new Sync()

        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.showAlertDialog = this.showAlertDialog.bind(this)
        this.hideAlertDialog = this.hideAlertDialog.bind(this)
        this.handleAlertDialogCancel = this.handleAlertDialogCancel.bind(this)
        this.handleAlertDialogOk = this.handleAlertDialogOk.bind(this)
        this.handleAlertDialogSyncCancel = this.handleAlertDialogSyncCancel.bind(this)
        this.handleAlertDialogSyncOk = this.handleAlertDialogSyncOk.bind(this)
        this.showAlertDialogSync = this.showAlertDialogSync.bind(this)
    }

    renderToolbar() {
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handlerCanselClick}>Back</BackButton>
            : null;
        return (
            <Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>{this.props.route.title}</div>
            </Toolbar>
        )
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    handleChange() {
        // this.setState({
        //     checked: e.target.checked
        // }, () => {
        //     // this.req.updateOption('connectDB', this.state.checked)
        //     this.showAlertDialog()
        // });
        this.showAlertDialog()
    }

    showAlertDialog() {
        this.setState({alertDialogShow: true })
    }

    hideAlertDialog() {
        this.setState({ alertDialogShow: false })
    }

    handleAlertDialogCancel() {
        this.hideAlertDialog()
    }

    handleAlertDialogOk(e) {
        this.setState({
            checked: e.target.checked,
            alertDialogSyncShow: true,
            // this.setState({ isOpen: false })
        }, () => {
            // this.req.updateOption('connectDB', this.state.checked)
            this.showAlertDialogSync()
        })
        this.hideAlertDialog()
    }

    showAlertDialogSync() {
        this.setState({ alertDialogSyncShow: true })
    }

    handleAlertDialogSyncOk() {
        this.setState({
            isOpenModal: true,
            alertDialogSyncShow: false,
        }, () => {
            this.sync.getAllDataFromServer()
        })
    }

    handleAlertDialogSyncCancel() {
        this.setState({ alertDialogSyncShow: false })
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <section className="nzOptions">
                    <div className="nzOptionsTextBlock">
                        <span className="nzOptionsTextBlockELem">
                            Использовать удаленую БД для хранения данных?
                        </span>
                    </div>
                    <div className="nzOptionsSwitchBlock">
                        <Switch
                            // disabled
                            checked={this.state.checked}
                            onChange={this.handleChange}
                        />
                    </div>
                </section>
                <AlertDialog
                    isOpen={this.state.alertDialogShow}
                    isCancelable={false}>
                    <div className='alert-dialog-title'>Внимание!</div>
                    <div className='alert-dialog-content'>
                        Вы действительно хотите откл
                    </div>
                    <div className='alert-dialog-footer'>
                        <button onClick={this.handleAlertDialogCancel} className='alert-dialog-button'>
                            Cancel
                        </button>
                        <button onClick={this.handleAlertDialogOk} className='alert-dialog-button'>
                            Ok
                        </button>
                    </div>
                </AlertDialog>
                <AlertDialog
                    isOpen={this.state.alertDialogSyncShow}
                    isCancelable={false}>
                    <div className='alert-dialog-title'>Внимание!</div>
                    <div className='alert-dialog-content'>
                        Вы хотите провести синхронизацию данных с {this.state.syncText}
                    </div>
                    <div className='alert-dialog-footer'>
                        <button onClick={this.handleAlertDialogSyncCancel} className='alert-dialog-button'>
                            Cancel
                        </button>
                        <button onClick={this.handleAlertDialogSyncOk} className='alert-dialog-button'>
                            Ok
                        </button>
                    </div>
                </AlertDialog>
                <Modal
                    isOpen={this.state.isOpenModal}
                >
                    <div>
                        <div className="nzSyncBlock">
                            <span className="shapeNew" /><span className="nzSyncElemText">Счета</span>
                        </div>
                        <div className="nzSyncBlock">
                            <span className="shapeNew" /><span className="nzSyncElemText">Операции</span>
                        </div>
                        <div className="nzSyncBlock">
                            <span className="shapeNew" /><span className="nzSyncElemText">График</span>
                        </div>
                        <div className="nzSyncBlock">
                            <span className="shapeNew" /><span className="nzSyncElemText">Уведомления</span>
                        </div>
                    </div>
                </Modal>
            </Page>
        )
    }
}

OptionsPage.propTypes = {
    route: PropTypes.object
}

export default OptionsPage