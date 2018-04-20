import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Toast
} from 'react-onsenui'
import Login from '../Login'
import Logon from '../Login/Logon'
import WelcomeScreeen from './welcomeScreen'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animationClass: '',
            toastShown: false,
        }
        this.handleDismiss = this.handleDismiss.bind(this)
        this.fetch = true;
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         animationClass: 'FadeOut'
        //     })
        // }, 3000);
    }

    componentWillUpdate(nextProps, nextState) { 
        if (nextProps.errorLogonStatus && this.fetch) {
            this.setState({
                toastShown: true,
            }, () => {
                this.fetch = false;
            })
        }
        console.log(nextProps);
        console.log(nextState);
        
    }

    // component

    handleDismiss() {
        this.setState({
            toastShown: false,
            errorLogonStatus: '',
        }, () => {
            this.fetch = true
        })
    }

    render() {
        return(
            <div id="test" style={{
                overflow: 'hidden',
                display: 'inline-block'
            }}>
                <WelcomeScreeen className={`nzWelcomePage ${this.state.animationClass}`} />
                <Logon
                    className={`nzLoginPage ${this.state.animationClass}`}
                    changeLogonStatus={this.props.changeLogonStatus}
                    uuid={this.props.cordova
                        ? this.props.cordova.define.moduleMap['cordova-plugin-device.device'].exports.uuid
                        : null
                    }
                />
                <Toast isOpen={this.state.toastShown}>
                    <div className="message">
                        {this.props.errorLogonText}
                    </div>
                    <button onClick={this.handleDismiss}>
                        Закрыть
                    </button>
                </Toast>
            </div>
        )
    }
}

Welcome.propTypes = {
    changeLogonStatus: PropTypes.func.isRequired,
    errorLogonStatus: PropTypes.string,
    errorLogonText: PropTypes.string,
    cordova: PropTypes.object,
}

Welcome.defaultProps = {
    cordova: null
}

export default Welcome