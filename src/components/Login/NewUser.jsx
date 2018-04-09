import React, { Component } from 'react';
import {
    Button,
    Input,
    // Page,
    // Modal
} from 'react-onsenui'
import Requester from '../../js/requester'

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            email: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.req = new Requester()
    }

    handleRegister() {
        const addObj = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
        }

        this.req.send('newUser', 'POST', addObj).then(result => {
            // if (result.result) {
            //     this.setState({
            //         animButtonClassName: 'loading unLoad',
            //     }, () => {
            //         setTimeout(() => {
            //             this.setState({
            //                 animButtonClassName: 'loading unLoad icon-checked',
            //             }, () => {
            //                 this.props.changeLogonStatus(result)
            //             })
            //         }, 1000);
            //     })
            // }
        })
    }

    render() {
        return (
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
                        value={this.state.password2}
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
                        onClick={this.handleRegister}
                        modifier='large outline'
                    >Зарегистрироваться</Button>
                </section>
            </section>
        )
    }
}

export default NewUser