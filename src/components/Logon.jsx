import React, { Component } from 'react';
import {
    Button,
    Input,
    Page,
    Modal
} from 'react-onsenui'
import Requester from '../js/requester'
import NewUser from './NewUser'

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalOpen: false
        }

        this.req = new Requester()

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleLogon = this.handleLogon.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
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
            password: ''
        })
        this.req.send('Logon', 'POST', addObject).then(result => {
            this.props.changeLogonStatus(result)
        })
    }

    handleModalOpen() {
        this.setState({ modalOpen: true })
    }

    handleModalClose() {
        this.setState({ modalOpen: false })
    }

    render() {
        return (
            <Page
                renderModal={() => (
                    <Modal
                        isOpen={this.state.modalOpen}
                    >
                        <NewUser handleModalClose={this.handleModalClose} />
                    </Modal>
                )}
            >
                <section>
                    <div>
                        <section>
                            <Input
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='Username' />
                        </section>
                        <section>
                            <Input
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                modifier='underbar'
                                type='password'
                                float
                                placeholder='Password' />
                        </section>
                        <section>
                            <Button
                                label="Submit"
                                primary={true}
                                onClick={this.handleLogon}
                                modifier='large'
                            >Войти</Button>
                            <Button
                                label="Submit"
                                primary={true}
                                onClick={this.handleModalOpen}
                                modifier='large'    
                            >Зарегистрироваться</Button>
                        </section>
                        <section>
                            <div>
                                <span>{this.props.errorLogonStatus}</span>
                            </div>
                            <div>
                                <span>{this.props.errorLogonText}</span>
                            </div>
                        </section>
                    </div>
                </section>
            </Page>
        )
    }
}

// Logon.p
export default Logon

//     < div id = "fb-root" ></div >
//         <script>(function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.12&appId=174938706452010&autoLogAppEvents=1';
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));</script>