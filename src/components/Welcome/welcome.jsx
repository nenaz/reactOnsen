import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Input,
    ProgressCircular,
    Navigator
} from 'react-onsenui'
import Login from '../Login'
import WelcomeScreeen from './welcomeScreen'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderPage(route, navigator) {
        switch (route.title) {
            case 'login': return (
                <Login
                    key={route.title}
                    route={route}
                    navigator={navigator}
                />
            )
            default: return (
                <WelcomeScreeen
                    key={route.title}
                    route={route}
                    navigator={navigator}
                />
            )
        }
    }

    render() {
        return(
            <Navigator
                swipeable
                renderPage={this.renderPage}
                initialRoute={{
                    title: 'welcome page',
                    hasBackButton: false
                }}
                animation='lift'
                animationOptions={{
                    duration: 0.3
                }}
            />
        )
    }
}

Welcome.propTypes = {

}

export default Welcome