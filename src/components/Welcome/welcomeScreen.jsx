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
    }

    render() {
        return (
            <Page className={this.props.className}>
                <section className="nzWelcomeSection">
                    <div className="nzWelcomeSectionBlock">
                        <span>Welcome!</span>
                    </div>
                </section>
                <ProgressCircular indeterminate className="nzProgressWelcomePage" />
            </Page>
        )
    }
}

export default WelcomeScreen