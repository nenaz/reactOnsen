import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    ProgressCircular,
    Input,
    Page,
} from 'react-onsenui'
import css from './css/logonpc.css';

class LogonPC extends Component{
    constructor(props){
        super(props)
        this.state ={
            buttonText: 'Войти',
            // passcode: ''
        }

        this.handlePasscodeChange = this.handlePasscodeChange.bind(this)
    }

    handlePasscodeChange(e) {
        this.setState({ passcode: e.target.value })
    }

    render(){
        return (
            <Page
                // className={`logonForm ${this.props.className}`}
                // onAnimationEnd={this.onAnimationEnd}
            >
                <section>
                    <section className="nzLogonSection">
                        <div className="nzLogonWithPassCode">
                            <Input
                                value={this.state.passcode}
                                onChange={this.handlePasscodeChange}
                                modifier='underbar material'
                                float
                                placeholder='PassCode'
                                disabled={this.props.disabledInputs}
                                maxLength={6}
                                type="password"
                            />
                            <button
                                // className={this.state.animButtonClassName}
                                onClick={this.props.logon}
                            >
                                <span className="content">{this.state.buttonText}</span>
                            </button>
                            {/* <ProgressCircular
                                indeterminate
                                // className={`nzLogonSectionButtonCircular ${this.state.animButtonClassName}`}
                                className={`nzLogonSectionButtonCircular `}
                            /> */}
                        </div>
                    </section>
                    <section className="nzRemovePassCode">
                        <span
                            onClick={this.props.removePassCode}
                        >Сбросить код доступа</span>
                    </section>
                </section>
            </Page>
        )
    }
}

LogonPC.propTypes = {
    removePassCode: PropTypes.func,
    logon: PropTypes.func,
    disabledInputs: PropTypes.bool,
}

export default LogonPC