import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    BackButton,
    Toolbar,
    Switch,
    AlertDialog,
} from 'react-onsenui'
import Requester from '../../../js/requester'

class OptionsPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            checked: JSON.parse(localStorage.getItem('localOptions')).connectDB || false,
            alertDialogShown: false,
        }

        this.req = new Requester()

        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.showAlertDialog = this.showAlertDialog.bind(this)
        this.hideAlertDialog = this.hideAlertDialog.bind(this)
        this.handleAlertDialogCancel = this.handleAlertDialogCancel.bind(this)
        this.handleAlertDialogOk = this.handleAlertDialogOk.bind(this)
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
        this.setState({alertDialogShown: true })
    }

    hideAlertDialog() {
        this.setState({ alertDialogShown: false })
    }

    handleAlertDialogCancel() {
        this.hideAlertDialog()
    }

    handleAlertDialogOk(e) {
        this.setState({
            checked: e.target.checked
        }, () => {
            this.req.updateOption('connectDB', this.state.checked)
        })
        this.hideAlertDialog()
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
                    isOpen={this.state.alertDialogShown}
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
            </Page>
        )
    }
}

OptionsPage.propTypes = {
    route: PropTypes.object
}

export default OptionsPage