import React, { Component} from 'react'
import {
    Page,
} from 'react-onsenui'
import PropTypes from 'prop-types'
import './css/ResetPassCode.css'
import PassCode from './PassCode'
import LogonButton from '../Login/LogonButton'

class ResetPassCode extends Component{
    constructor(props){
        super(props)
        this.state ={
            passcode: '',
        }
        this.handlePasscodeChange = this.handlePasscodeChange.bind(this)
    }

    handlePasscodeChange(e) {
        this.setState({ passcode: e.target.value })
    }

    render(){
        return (
            <Page
                className={`logonForm ${this.props.className}`}
                onAnimationEnd={this.props.onAnimationEnd}
            >
                <section className="nzPassCodeSection">
                    <section className="nzLogonWithPassCode">
                        <PassCode
                            passCodeBlockStyle="nzPassCodeInput"
                            hideCancelButton
                            handleLogon={this.props.handleLogon}
                        />
                        <LogonButton
                            buttonText={this.state.buttonText}
                            buttonStyle={{
                                backgroundColor: '#fff',
                            }}
                            logonFunc={this.handleLogon}
                            blockClassName="nzLogonButtonBlock"
                            circularClassName="nzButtonCircular"
                        />
                        <div className="nzRemovePassCode">
                            <span
                                onClick={this.props.handleRemovePassCode}
                            >Сбросить код доступа</span>
                        </div>
                    </section>
                </section>
            </Page>
        )
    }
}

ResetPassCode.propTypes = {
    username: PropTypes.string,
    handleRemovePassCode: PropTypes.func,
    handleLogon: PropTypes.func,
    onAnimationEnd: PropTypes.func,
    animButtonClassName: PropTypes.string,
}

export default ResetPassCode