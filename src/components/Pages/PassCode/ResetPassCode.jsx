import React, { Component} from 'react'
import {
    Page,
    Input
} from 'react-onsenui'
import PropTypes from 'prop-types'
import './css/ResetPassCode.css'

class ResetPassCode extends Component{
    constructor(props){
        super(props)
        this.state ={
            passcode: '',
            buttonText: 'Войти',
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
                <section className="nzLogonSection">
                    <section className="nzLogonWithPassCode">
                        <Input
                            value={this.state.passcode}
                            onChange={this.handlePasscodeChange}
                            modifier='underbar material'
                            float
                            placeholder='PassCode'
                            // disabled={this.state.disabledInputs}
                            maxLength={6}
                            type="password"
                        />
                        <button
                            className={this.props.animButtonClassName}
                            onClick={() => {
                                this.props.handleLogon(this.state.passcode)
                            }}
                        >
                            <span className="content">{this.state.buttonText}</span>
                        </button>
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