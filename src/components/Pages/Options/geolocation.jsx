import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Switch,
    AlertDialog,
} from 'react-onsenui'

class Geolocation extends Component{
    constructor(props){
        super(props)
        this.state ={
            checked: JSON.parse(localStorage.getItem('localOptions')).useGeolocation || false,
            alertDialogGeoShow: false,
            updateOptionName: 'useGeolocation',
        }

        this.handleSwitchChange = this.handleSwitchChange.bind(this)
        this.handleAlertDialogGeoCancel = this.handleAlertDialogGeoCancel.bind(this)
        this.handleAlertDialogGeoOk = this.handleAlertDialogGeoOk.bind(this)
    }

    handleSwitchChange(e) {
        this.setState({
            checked: e.target.checked,
            alertDialogGeoShow: true,
        })
    }

    handleAlertDialogGeoCancel() {
        let checked = this.state.checked
        this.setState({
            checked: !checked,
            alertDialogGeoShow: false,
        });
    }

    handleAlertDialogGeoOk() {
        this.setState({
            alertDialogGeoShow: false,
        }, () => {
            this.req.updateOption(this.state.updateOptionName, this.state.checked)
        })
    }

    render(){
        return (
            <section>
                <section className="nzOptions">
                    <div className="nzOptionsTextBlock">
                        <span
                            className="nzOptionsTextBlockELem"
                        >Определять местоположение при создании операции?</span>
                    </div>
                    <div className="nzOptionsSwitchBlock">
                        <Switch
                            checked={this.state.checked}
                            onChange={this.handleSwitchChange}
                        />
                    </div>
                </section>
                <AlertDialog
                    isOpen={this.state.alertDialogGeoShow}
                    isCancelable={false}>
                    <div className='alert-dialog-title'>Внимание!</div>
                    <div className='alert-dialog-content'>
                        Хотите определять местоположение при создании операции?
                    </div>
                    <div className='alert-dialog-footer'>
                        <button onClick={this.handleAlertDialogGeoCancel} className='alert-dialog-button'>
                            Нет
                        </button>
                        <button onClick={this.handleAlertDialogGeoOk} className='alert-dialog-button'>
                            Да
                        </button>
                    </div>
                </AlertDialog>
            </section>
        )
    }
}

Geolocation.propTypes = {

}

export default Geolocation