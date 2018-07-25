import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Switch,
    Input,
    Page,
    Dialog,
} from 'react-onsenui'
import Requester from '../../../js/requester'
import NewUser from './NewUser'
import PassCode from '../PassCode';
import './css/Logon.css'
import InputPassCode from '../PassCode/ResetPassCode'
import { connect } from 'react-redux'
import { changeAuthButtonClassName } from '../../../AC'
import LogonButton from './LogonButton'

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalOpen: false,
            className: '',
            buttonText: 'Войти',
            disabledInputs: false,
            checkedPassRadio: false,
            checkPassClassName: '',
            authDialogShow: false,
            errorText: '',
        }

        this.req = new Requester()

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleLogon = this.handleLogon.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleNewUser = this.handleNewUser.bind(this)
        this.goToNewUser = this.goToNewUser.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
        this.onAnimationEnd = this.onAnimationEnd.bind(this)
        this.handleChangePassCodeRadio = this.handleChangePassCodeRadio.bind(this)
        this.togglePassCodeBlock = this.togglePassCodeBlock.bind(this)
        this.logonRequest = this.logonRequest.bind(this)
        this.logonRequestWithPassCode = this.logonRequestWithPassCode.bind(this)
        this.generateLogonPage = this.generateLogonPage.bind(this)
        this.handleRemovePassCode = this.handleRemovePassCode.bind(this)
        this.handleClickCanselRequestButton = this.handleClickCanselRequestButton.bind(this)
        this.handleHideDialog = this.handleHideDialog.bind(this)
    }

    componentDidMount() {
        this.req.getLocal('localOptions').then((obj) => {
            this.setState({
                usePassCode: obj.usePassCode,
                checkedPassRadio: obj.usePassCode,
                connectDB: obj.connectDB,
            }, () => {
                if (!this.state.connectDB) {
                    this.setState({
                        disabledInputs: true,
                    }, () => {
                        setTimeout(() => {
                            this.props.changeLogonStatus(true)
                        }, 3500);
                    })
                }
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

    handleLogon(passcode) {
        const usePassCode = this.state.usePassCode
        if (!usePassCode && !this.state.username && !this.state.password) {
            return false;
        }
        if (!usePassCode && this.state.checkedPassRadio) {
            this.togglePassCodeBlock(true)
        } else if (!usePassCode && !this.state.checkedPassRadio) {
            this.logonRequest()
        } else if (usePassCode) {
            this.setState({
                passcode
            }, () => {
                this.logonRequest()
            })
        }
    }

    logonRequestWithPassCode(value) {
        this.req.setLocal2('localUserName', this.state.username)
        this.req.send('setPass', 'POST', {
            passcode: value,
            username: this.state.username,
            password: this.state.password
        }).then(result => {
            window.location.reload()
        })
    }

    logonRequest() {
        const addObject = {
            username: this.state.username,
        }
        if (this.state.passcode) {
            addObject.passcode = this.state.passcode
        } else {
            addObject.password = this.state.password
        }
        this.props.changeAuthButtonClassName('loading')
        this.setState({
            buttonText: '',
            disabledInputs: true
        }, () => {
            setTimeout(() => {
                this.req.send('authUser', 'POST', addObject).then(result => {
                    if (result.auth) {
                        this.props.changeAuthButtonClassName('loading unLoad')
                        this.setState({
                            username: '',
                            password: '',
                        }, () => {
                            this.req.setLocal('localOptions', result.token, 'webToken')
                            setTimeout(() => {
                                this.props.changeAuthButtonClassName('loading unLoad icon-checked')
                                this.props.changeLogonStatus(result.auth)
                            }, 1000);
                        })
                    } else {
                        this.props.changeAuthButtonClassName('')
                        this.setState({
                            username: '',
                            password: '',
                            disabledInputs: false,
                            buttonText: 'Войти',
                            authDialogShow: true,
                            errorText: result.status === 401
                                ? 'Ошибка авторизации'
                                : 'Ошибка тайм-аута',
                        })
                    }
                })
            }, 1500)
        })
    }

    handleModalOpen() {
        this.setState({ modalOpen: true })
    }

    handleModalClose() {
        this.setState({ modalOpen: false })
    }

    handleNewUser(event) {
        if (!this.state.className) {
            this.goToNewUser(event);
        } else {
            this.goToLogin();
        }
    }

    goToNewUser(event) {
        this.setState({
            className: 'nzNewUser'
        })
    }

    goToLogin() {
        this.setState({
            className: 'nzNewUser nzNoNewUser'
        })
    }

    onAnimationEnd(event) {
        if (event.animationName === 'noAnimUser' && this.state.className === "nzNewUser nzNoNewUser") {
            this.setState({
                className: ''
            })
        }
    }

    handleChangePassCodeRadio() {
        const check = this.state.checkedPassRadio
        this.req.setLocal('localOptions', !check, 'usePassCode')
        this.setState({
            checkedPassRadio: !check,
            buttonText: check ? 'Войти' : 'Задать',
        })
    }

    togglePassCodeBlock(value) {
        const className = value ? 'setPassCodeAnim' : ''
        this.setState({
            checkPassClassName: className
        })
    }

    handleRemovePassCode() {
        this.setState({
            usePassCode: false,
            checkedPassRadio: false,
            username: '',
            passcode: '',
        }, () => {
            this.req.setLocal('localUserName', '')
            this.req.setLocal('localOptions', false, 'usePassCode')
        })
    }

    handleClickCanselRequestButton() {
        this.req.abort()
    }

    handleHideDialog() {
        this.setState({
            authDialogShow: false,
        })
    }

    generateLogonPage() {
        if (this.state.usePassCode && this.state.connectDB) {
            return (
                <InputPassCode
                    username={this.state.username}
                    className={this.props.className}
                    handleLogon={this.handleLogon}
                    handleRemovePassCode={this.handleRemovePassCode}
                />
            )
        } else {
            return (
                <Page
                    className={`logonForm ${this.props.className}`}
                    onAnimationEnd={this.onAnimationEnd}
                >
                    <NewUser
                        disabledInputs={this.state.disabledInputs}
                        cssName={this.state.className}
                        handleNewUser={this.handleNewUser}
                        onAnimationEnd={this.onAnimationEnd}
                    />
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
                        <section className="nzLogonSectionButton">
                            <section className="nzSwitchBlock">
                                <Switch
                                    disabled={this.state.disabledInputs}
                                    checked={this.state.checkedPassRadio}
                                    onChange={this.handleChangePassCodeRadio}
                                />
                                <p
                                    className={this.state.disabledInputs
                                        ? "nzDisable"
                                        : ""}
                                >Pass code</p>
                            </section>
                            <LogonButton
                                buttonText={this.state.buttonText}
                                logonFunc={this.handleLogon}
                                blockClassName="nzPC"
                                circularClassName="nzLogonSectionButtonCircular"
                            />
                        </section>
                    </section>
                    {this.state.checkPassClassName &&
                    <PassCode
                        checkPassClassName={this.state.checkPassClassName}
                        togglePassCodeBlock={this.togglePassCodeBlock}
                        logonRequestWithPassCode={this.logonRequestWithPassCode}
                        passCodeBlockStyle="nzLogonPassCodeBlock"
                    />}
                    <Dialog
                        isOpen={this.state.authDialogShow}
                        isCancelable={true}
                        onCancel={this.handleHideDialog}
                    >
                        <div className="nzDialog">
                            <p>{this.state.errorText}</p>
                            <p>
                                <button onClick={this.handleHideDialog}>Закрыть</button>
                            </p>
                        </div>
                    </Dialog>
                </Page>
            )
        }
    }

    render() {
        return (
            this.generateLogonPage()
        )
    }
}

Logon.propTypes = {
    changeLogonStatus: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default connect(null, {
    changeAuthButtonClassName,
})(Logon)