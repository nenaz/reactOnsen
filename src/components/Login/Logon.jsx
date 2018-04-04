import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Button,
    Input,
    Page,
    Modal,
    Fab
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
        }

        this.req = new Requester()

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleLogon = this.handleLogon.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleNewUser = this.handleNewUser.bind(this)
        this.goToNewUser = this.goToNewUser.bind(this)
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value })
    }
    
    handlePasswordChange(e) {
        this.setState({ password: e.target.value })
    }

    handleLogon() {
        const addObject = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({
            username: '',
            password: '',
        })
        this.req.send('authUser', 'POST', addObject).then(result => {
            this.props.changeLogonStatus(result)
        })
    }

    handleModalOpen() {
        this.setState({ modalOpen: true })
    }

    handleModalClose() {
        this.setState({ modalOpen: false })
    }

    handleNewUser(event) {
        this.goToNewUser(event);
    }

    goToNewUser(event) {
        this.setState({
            className: 'nzNewUser'
        })
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
            >
                <section className={`nzLogonSection ${this.state.className}`}>
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
                        <Button
                            label="Submit"
                            primary={true}
                            onClick={this.handleLogon}
                            modifier='large outline'
                        >Войти</Button>
                        {/* <Button
                            label="Submit"
                            primary={true}
                            onClick={this.goToNewUser}
                            modifier='large outline'    
                        >Зарегистрироваться</Button> */}
                    </section>
                    <section>
                        <div>
                            <span>{this.props.errorLogonStatus}</span>
                        </div>
                        <div>
                            <span>{this.props.errorLogonText}</span>
                        </div>
                    </section>
                    <Fab
                        style={{ backgroundColor: '#4282cc' }}
                        // onClick={this.handleClick}
                        position='bottom right'>
                    </Fab>
                </section>
            </Page>
        )
    }
}

Logon.propTypes = {
    changeLogonStatus: PropTypes.func.isRequired,
}

export default Logon