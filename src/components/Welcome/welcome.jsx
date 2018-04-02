import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Input,
    ProgressCircular
} from 'react-onsenui'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Page>
                {/* <section className='nzWelcomLogo'> */}
                    {/* <div /> */}
                {/* <section>
                    
                </section> */}
                <section className="nzWelcomePage">
                    <div className="nzWelcomePageBlock">
                        <span>Welcome!</span>
                        {/* <div className="nzWelcomePageBlockRow">
                            <Input modifier="material transparent"
                                className="nzWelcomePageBlockRowTextField"
                            />
                        </div>
                        <div className="nzWelcomePageBlockRow">
                            <Input className="nzWelcomePageBlockRowTextField" />
                        </div>
                        <div className="nzWelcomePageBlockRow">
                            <Input className="nzWelcomePageBlockRowTextField" />
                        </div> */}
                    </div>
                </section>
                <ProgressCircular indeterminate className="nzProgressWelcomePage" />
            </Page>
        )
    }
}

Welcome.propTypes = {

}

export default Welcome