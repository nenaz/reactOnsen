import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    ProgressCircular
} from 'react-onsenui'

class WelcomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.pushPage = this.pushPage.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.pushPage('login')
        }, 3000);
    }

    pushPage(name = 'main') {
        // debugger
        this.props.navigator.pushPage({
            title: name,
            hasBackButton: true
        });

        this.count += 1
    }

    render() {
        return (
            <Page>
                <section className="nzWelcomePage">
                    <div className="nzWelcomePageBlock">
                        <span>Welcome!</span>
                    </div>
                </section>
                <ProgressCircular indeterminate className="nzProgressWelcomePage" />
            </Page>
        )
    }
}

export default WelcomeScreen