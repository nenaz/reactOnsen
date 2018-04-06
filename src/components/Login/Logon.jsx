import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Button,
    Input,
    Page,
    Modal,
    Fab,
    Icon,
    ProgressCircular
} from 'react-onsenui'
import Requester from '../../js/requester'
import NewUser from './NewUser'

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalOpen: false,
            className: '',
            animButtonClassName: '',
            buttonText: 'Войти'
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
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }
    
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleLogon() {
        const addObject = {
            // username: this.state.username,
            // password: this.state.password
            username: 'nenaz',
            password: 'nenaz',
            uuid: this.props.uuid,
        }
        this.setState({
            username: '',
            password: '',
        })
        this.setState({
            animButtonClassName: 'loading',
            buttonText: '',
        // })
        }, () => {
            setTimeout(() => {
                this.req.send('authUser', 'POST', addObject).then(result => {
                    if (result.result) {
                        this.setState({
                            animButtonClassName: 'loading unLoad',
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    animButtonClassName: 'loading unLoad icon-checked',
                                }, () => {
                                    this.props.changeLogonStatus(result)
                                })
                            }, 1000);
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

    render() {
        return (
            <Page
                className={`logonForm ${this.props.className}`}
                renderModal={() => (
                    <Modal
                        isOpen={this.state.modalOpen}
                    >
                        <NewUser handleModalClose={this.handleModalClose} />
                    </Modal>
                )}
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
                    <section className="nzAddUserSection">
                        <section>
                            <Input
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                modifier='underbar material'
                                float
                                placeholder='Логин' />
                        </section>
                        <section>
                            <Input
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                modifier='underbar material'
                                type='password'
                                float
                                placeholder='Пароль' />
                        </section>
                        <section>
                            <Input
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                modifier='underbar material'
                                type='password'
                                float
                                placeholder='Пароль' />
                        </section>
                        <section>
                            <Button
                                label="Submit"
                                primary={true}
                                onClick={this.handleLogon}
                                modifier='large outline'
                            >Зарегистрироваться</Button>
                        </section>
                    </section>
                </section>
                <section className="nzLogonSection">
                    <section>
                        <Input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            modifier='underbar material'
                            float
                            placeholder='Логин' />
                    </section>
                    <section>
                        <Input
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            modifier='underbar material'
                            type='password'
                            float
                            placeholder='Пароль' />
                    </section>
                    <section className="nzLogonSectionButton">
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