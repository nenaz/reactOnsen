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
            // errorLogonStatus: '',
        }
        this.handleDismiss = this.handleDismiss.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                animationClass: 'FadeOut'
            })
        }, 3000);
    }

    // componentDidUpdate(nextProps, nextState) { 
    //     if (nextProps.errorLogonStatus && !nextState.toastShown) {
    //         this.setState({
    //             toastShown: true,
    //             errorLogonStatus: nextProps.errorLogonStatus
    //         })
    //     }
    // }

    // component

    handleDismiss() {
        this.setState({
            toastShown: false,
            // errorLogonStatus: ''
        })
    }

    render() {
        return(
            <div>
                <WelcomeScreeen className={`nzWelcomePage ${this.state.animationClass}`} />
                {/* <Login className={`nzLoginPage ${this.state.animationClass}`} /> */}
                <Logon
                    className={`nzLoginPage ${this.state.animationClass}`}
                    changeLogonStatus={this.props.changeLogonStatus}
                />
                {this.props.errorLogonStatus && <Toast isOpen={this.props.errorLogonStatus}>
                    <div className="message">
                        {this.props.errorLogonText}
                    </div>
                    <button onClick={this.handleDismiss}>
                        Закрыть
                    </button>
                </Toast>}
            </div>
        )
    }
}

Welcome.propTypes = {
    changeLogonStatus: PropTypes.func.isRequired,
    errorLogonStatus: PropTypes.string,
    errorLogonText: PropTypes.string,
}

export default Welcome