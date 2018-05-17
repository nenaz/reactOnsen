import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    ProgressCircular,
    Page,
    Input,
    Switch,
} from 'react-onsenui'
import Requester from '../../../js/requester'
import NewUser from './NewUser'
import PassCode from '../PassCode';

class LogonLP extends Component{
    constructor(props){
        super(props)
        this.state ={
            username: '',
            password: '',
            buttonText: 'Войти',
            checkedPassRadio: false,
        }
        this.req = new Requester()
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleChangePassCodeRadio = this.handleChangePassCodeRadio.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.logonRequest = this.logonRequest.bind(this)
    }

    componentDidMount() {
        this.req.getLocal('localOptions').then((obj) => {
            this.setState({
                usePassCode: obj.usePassCode,
                checkedPassRadio: obj.usePassCode,
            })
            this.req.getLocal('localUserName').then((obj) => {
                this.setState({
                    username: obj,
                })
            })
        })
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleChangePassCodeRadio() {
        const check = this.state.checkedPassRadio
        this.req.setLocal('localOptions', !check, 'usePassCode')
        this.setState({
            checkedPassRadio: !check,
            buttonText: check ? 'Войти' : 'Задать',
        })
    }

    handleButtonClick() {
        const usePassCode = this.state.usePassCode
        if (!usePassCode && !this.state.username && !this.state.password) {
            return false;
        }
        if (!usePassCode && this.state.checkedPassRadio) {
            this.togglePassCodeBlock(true)
        } else if (!usePassCode && !this.state.checkedPassRadio) {
            this.logonRequest({
                username: this.state.username,
                password: this.state.password,
            })
        } else if (usePassCode) {
            this.logonRequest({
                username: this.state.username,
                passcode: this.state.passcode,
            })
        }
    }

    logonRequest(logonObj) {
        this.setState({
            animButtonClassName: 'loading',
            buttonText: '',
            disabledInputs: true
        })
        this.req.send('authUser', 'POST', logonObj).then(result => {
            if (result.auth) {
                this.props.changeLogonStatus(result.auth)
            }
        })
    }

    render(){
        return (
            <Page
                className={`logonForm ${this.props.className}`}
                onAnimationEnd={this.onAnimationEnd}
            >
                <section className={`nzLogonPageAddUser ${this.state.className}`}>
                    <div className="nzAddUserButton">
                        <span
                            className="shape"
                            onClick={this.handleNewUser}
                        />
                    </div>
                    <NewUser />
                </section>
                <section className="nzLogonSection">
                    <section>
                        <Input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            modifier='underbar material'
                            float
                            placeholder='Логин'
                            disabled={this.state.disabledInputs}
                        />
                    </section>
                    <section>
                        <Input
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            modifier='underbar material'
                            type='password'
                            float
                            placeholder='Пароль'
                            disabled={this.state.disabledInputs}
                        />
                    </section>
                    <section className="nzLogonPassCodeBlock">
                        <section className="nzSwitchBlock">
                            <Switch
                                checked={this.state.checkedPassRadio}
                                onChange={this.handleChangePassCodeRadio}
                            />
                            <p>Pass code</p>
                        </section>
                        <section className="nzLogonSectionButton">
                            <div className={`nzPC ${this.state.checkPassClassName} ${this.state.animButtonClassName}`}>
                                {this.state.checkPassClassName &&
                                    <PassCode
                                        togglePassCodeBlock={this.togglePassCodeBlock}
                                        logonRequestWithPassCode={this.logonRequestWithPassCode}
                                    />}
                                <button
                                    className={this.state.animButtonClassName}
                                    onClick={this.handleButtonClick}
                                >
                                    <span className="content">{this.state.buttonText}</span>
                                </button>
                                <ProgressCircular
                                    indeterminate
                                    className={`nzLogonSectionButtonCircular ${this.state.animButtonClassName}`}
                                />
                            </div>
                        </section>
                    </section>
                </section>
            </Page>
        )
    }
}

LogonLP.propTypes = {
    changeLogonStatus: PropTypes.func,
}

export default LogonLP