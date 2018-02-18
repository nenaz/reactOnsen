import React, { Component } from 'react';
import {
    Button,
    Input
} from 'react-onsenui'
import Requester from '../js/requester'

class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.req = new Requester()

        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleLogon = this.handleLogon.bind(this)
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

    render() {
        return (
            <div>
                <section>
                    <div>
                        <p>
                            <Input
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                modifier='underbar'
                                float
                                placeholder='Username' />
                        </p>
                        <p>
                            <Input
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                modifier='underbar'
                                type='password'
                                float
                                placeholder='Password' />
                        </p>
                        <Button label="Submit" primary={true} 
                            onClick={this.handleLogon}/>
                        <p>
                            <div>
                                <span>{this.props.errorLogonStatus}</span>
                            </div>
                            <div>
                                <span>{this.props.errorLogonText}</span>
                            </div>
                        </p>
                    </div>
                </section>
            </div>
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