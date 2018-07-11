import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Switch,
    AlertDialog,
    Modal,
    Button,
} from 'react-onsenui'
import Requester from '../../../js/requester'
import Sync from '../../../js/sync'
import ToolbarCustom from '../../ToolbarCustom'

class OptionsPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            checked: JSON.parse(localStorage.getItem('localOptions')).connectDB || false,
            alertDialogShow: false,
            isOpenModal: false,
            sync: false,
            alertDialogSyncShow: false,
            // syncText: '',
            sync1: false,
            sync2: false,
            sync3: false,
            sync4: false,
            switchText1: JSON.parse(localStorage.getItem('localOptions')).connectDB
                ? 'локальное'
                : 'серверное',
            switchText21: JSON.parse(localStorage.getItem('localOptions')).connectDB
                ? 'локальные'
                : 'серверными',
            switchText22: JSON.parse(localStorage.getItem('localOptions')).connectDB
                ? 'серверные'
                : 'локальными',
        }

        this.req = new Requester()
        this.sync = new Sync()

        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.showAlertDialog = this.showAlertDialog.bind(this)
        // this.hideAlertDialog = this.hideAlertDialog.bind(this)
        this.handleAlertDialogCancel = this.handleAlertDialogCancel.bind(this)
        this.handleAlertDialogOk = this.handleAlertDialogOk.bind(this)
        this.handleAlertDialogSyncCancel = this.handleAlertDialogSyncCancel.bind(this)
        this.handleAlertDialogSyncOk = this.handleAlertDialogSyncOk.bind(this)
        // this.showAlertDialogSync = this.showAlertDialogSync.bind(this)
        this.renderStatSync = this.renderStatSync.bind(this)
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="Настройки"
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    handleChange(e) {
        this.setState({
            checked: e.target.checked,
            alertDialogShow: true,
        });
    }

    handleAlertDialogCancel() {
        let checked = this.state.checked
        this.setState({
            checked: !checked,
            alertDialogShow: false,
        });
    }

    handleAlertDialogOk(e) {
        this.setState({
            alertDialogSyncShow: true,
            alertDialogShow: false,
        }, () => {
            this.req.updateOption('connectDB', this.state.checked)
        })
    }

    handleAlertDialogSyncOk() {
        this.setState({
            isOpenModal: true,
            alertDialogSyncShow: false,
        }, () => {
            this.sync.startSync().then(result => {
                this.renderStatSync()
            })
        })
    }

    handleAlertDialogSyncCancel() {
        this.setState({
            alertDialogSyncShow: false,
        })
    }

    renderStatSync() {
        const stat = JSON.parse(localStorage.getItem('localStat'))
        this.setState({
            syncAccount: stat.statAccount ? 'anim' : '',
            syncOperations: stat.statOperations ? 'anim' : '',
        })
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
                        Перейти на {this.state.switchText1} хранение данных?
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
                        Хотите синхронизировать {this.state.switchText21} данные с {this.state.switchText22}
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
                            <span className={`shapeNew ${this.state.syncAccount}`} /><span className="nzSyncElemText">Счета</span>
                        </div>
                        <div className="nzSyncBlock">
                            <span className={`shapeNew ${this.state.syncOperations}`} /><span className="nzSyncElemText">Операции</span>
                        </div>
                        <div className="nzSyncBlock">
                            <span className={`shapeNew ${this.state.suncAccount}`} /><span className="nzSyncElemText">График</span>
                        </div>
                        <div className="nzSyncBlock">
                            <span className={`shapeNew ${this.state.suncAccount}`} /><span className="nzSyncElemText">Уведомления</span>
                        </div>
                    </div>
                    <Button className="nzSyncModalClose" onClick={() => this.setState({ isOpenModal: false })}>
                        Close
                    </Button>
                </Modal>
            </Page>
        )
    }
}

OptionsPage.propTypes = {
    route: PropTypes.object
}

export default OptionsPage