import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Switch,
    Input,
    Page,
    // Modal,
    // Fab,
    // Icon,
    ProgressCircular
} from 'react-onsenui'
import Requester from '../../../js/requester'
import NewUser from './NewUser'
import PassCode from '../PassCode';

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalOpen: false,
            className: '',
            animButtonClassName: '',
            buttonText: 'Войти',
            disabledInputs: false,
            checkedPassRadio: false,
            checkPassClassName: ''
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
    }

    componentDidMount() {
        this.req.getLocal('localOptions').then((obj) => {
            this.setState({
                usePassCode: obj.usePassCode
            })
        })
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }
    
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleLogon() {
        if (!this.state.username && !this.state.password) {
            return false;
        }
        if (!this.state.usePassCode && this.state.checkedPassRadio) {
            this.setState({
                checkPassClassName: 'setPassCodeAnim'
            })
        } else {
            const addObject = {
                username: this.state.username,
                password: this.state.password
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
    }
    
    handleRegistretion() {
        
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
        // const 
        this.setState({
            checkedPassRadio: !check,
            buttonText: check ? 'Войти' : 'Задать',
        })
    }

    render() {
        return (
            <Page
                className={`logonForm ${this.props.className}`}
                onAnimationEnd={this.onAnimationEnd}
            >
                <section className={`nzLogonPageAddUser ${this.state.className}`}>
                    <div
                        className="nzAddUserButton" 
                    >
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
                    <section style={{
                        display: 'flex'
                    }}>
                        <section style={{
                            flexGrow: 1,
                            textAlign: 'center',
                        }}>
                            <Switch
                                checked={this.state.checkedPassRadio}
                                onChange={this.handleChangePassCodeRadio}
                            />
                            <p
                                style={{
                                    position: 'relative',
                                    fontSize: '12px',
                                    margin: '0'
                                }}
                            >Pass code</p>
                        </section>
                        <section className="nzLogonSectionButton"
                            style={{
                                flexGrow: 10
                            }}
                        >
                            <div className={this.state.checkPassClassName}
                                style={{
                                    backgroundColor: '#404040',
                                    width: '225px'
                                }}
                            >
                                <PassCode checkPassClassName={this.state.checkPassClassName}/>
                                <button
                                    className={this.state.animButtonClassName}
                                    onClick={this.handleLogon}
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
                    <section>
                        <div>
                            <span>{this.props.errorLogonStatus}</span>
                        </div>
                        <div>
                            <span>{this.props.errorLogonText}</span>
                        </div>
                    </section>
                </section>
            </Page>
        )
    }
}

Logon.propTypes = {
    changeLogonStatus: PropTypes.func.isRequired,
}

export default Logon