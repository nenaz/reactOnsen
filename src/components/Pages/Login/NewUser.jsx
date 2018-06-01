import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Input
} from 'react-onsenui'
import Requester from '../../../js/requester'

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        }

        this.req = new Requester()
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value })
    }

    handleRegister() {
        const newUserObj = {
            username: this.state.username,
            password: this.state.password
        }
        this.req.send('newUser', 'POST', newUserObj).then(result => {
            if (result.token) {
                this.req.setLocal('localOptions', result.token)
            }
        })
    }

    render() {
        return (
            <section className={`nzLogonPageAddUser ${this.props.cssName}`}>
                <div className={this.props.disabledInputs
                    ? "nzAddUserButton nzDisable"
                    : "nzAddUserButton"}
                >
                    <span
                        className="shape"
                        onClick={this.props.handleNewUser}
                    />
                </div>
                <section className="nzAddUserSection">
                    <section>
                        <Input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            modifier='underbar material'
                            float
                            placeholder='Логин'
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
                        />
                    </section>
                    <section>
                        <Input
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPassword}
                            modifier='underbar material'
                        type='password'
                            float
                            placeholder='Подтвердить пароль'
                        />
                    </section>
                    <section>
                        <Button
                            label="Submit"
                            primary={true}
                            onClick={this.handleRegister}
                            modifier='large outline'
                        >
                            <span>Зарегистрироваться</span>
                        </Button>
                    </section>
                </section>
            </section>
        )
    }
}

NewUser.propTypes = {
    cssName: PropTypes.string,
    disabledInputs: PropTypes.bool,
    handleNewUser: PropTypes.func,
}

export default NewUser