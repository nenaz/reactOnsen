import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    ProgressCircular
} from 'react-onsenui'
import config from '../../../js/config'

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
                <div className="nzVersion">
                    <span>v. {config.version}</span>
                </div>
            </Page>
        )
    }
}

WelcomeScreen.propTypes = {
    className: PropTypes.string
}

export default WelcomeScreen