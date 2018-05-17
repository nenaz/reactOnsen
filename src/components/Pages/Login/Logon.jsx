import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import {
//     Switch,
//     Input,
//     Page,
//     ProgressCircular
// } from 'react-onsenui'
// import Requester from '../../../js/requester'
import LogonLP from './LogonLP';
import LogonPC from './LogonPC';

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // username: '',
            // password: '',
            modalOpen: false,
            className: '',
            animButtonClassName: '',
            buttonText: 'Войти',
            disabledInputs: false,
            // checkedPassRadio: false,
            checkPassClassName: ''
        }

        // this.req = new Requester()

        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleLogon = this.handleLogon.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleNewUser = this.handleNewUser.bind(this)
        this.goToNewUser = this.goToNewUser.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
        this.onAnimationEnd = this.onAnimationEnd.bind(this)
        // this.handleChangePassCodeRadio = this.handleChangePassCodeRadio.bind(this)
        this.togglePassCodeBlock = this.togglePassCodeBlock.bind(this)
        this.logonRequest = this.logonRequest.bind(this)
        this.logonRequestWithPassCode = this.logonRequestWithPassCode.bind(this)
        this.generateLogonPage = this.generateLogonPage.bind(this)
        
        this.handleRemovePassCode = this.handleRemovePassCode.bind(this)
    }

    // componentDidMount() {
    //     this.req.getLocal('localOptions').then((obj) => {
    //         this.setState({
    //             usePassCode: obj.usePassCode,
    //             checkedPassRadio: obj.usePassCode,
    //         })
    //         this.req.getLocal('localUserName').then((obj) => {
    //             this.setState({
    //                 username: obj,
    //             })
    //         })
    //     })
    // }

    // handleUsernameChange(e) {
    //     this.setState({ username: e.target.value })
    // }
    
    // handlePasswordChange(e) {
    //     this.setState({ password: e.target.value })
    // }

    handleLogon() {
        const usePassCode = this.state.usePassCode
        if (!usePassCode && !this.state.username && !this.state.password) {
            return false;
        }
        if (!usePassCode && this.state.checkedPassRadio) {
            this.togglePassCodeBlock(true)
        } else if (!usePassCode && !this.state.checkedPassRadio) {
            this.logonRequest()
        } else if (usePassCode) {
            this.logonRequest()
        }
    }

    logonRequestWithPassCode(value) {
        this.req.setLocal('localUserName', this.state.username)
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
        this.setState({
            animButtonClassName: 'loading',
            buttonText: '',
            disabledInputs: true
        // })
        }, () => {
            setTimeout(() => {
                this.req.send('authUser', 'POST', addObject).then(result => {
                    if (result.auth) {
                        this.setState({
                            animButtonClassName: 'loading unLoad',
                            username: '',
                            password: '',
                        }, () => {
                            this.req.setLocal('localOptions', result.token, 'webToken')
                            setTimeout(() => {
                                this.setState({
                                    animButtonClassName: 'loading unLoad icon-checked',
                                }, () => {
                                    this.props.changeLogonStatus(result.auth)
                                })
                            }, 1000);
                        })
                    } else {
                        this.setState({
                            username: '',
                            password: '',
                            disabledInputs: false,
                            animButtonClassName: '',
                            buttonText: 'Войти',
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

    // handleChangePassCodeRadio() {
    //     const check = this.state.checkedPassRadio
    //     this.req.setLocal('localOptions', !check, 'usePassCode')
    //     this.setState({
    //         checkedPassRadio: !check,
    //         buttonText: check ? 'Войти' : 'Задать',
    //     })
    // }

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

    generateLogonPage() {
        if(this.state.usePassCode) {
            return (
                <LogonPC
                    removePassCode={this.handleRemovePassCode}
                    logon={this.handleLogon}
                    disabledInputs={this.state.disabledInputs}
                />
            )
        } else {
            return (
                <LogonLP />
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
}

export default Logon