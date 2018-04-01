import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    Input
} from 'react-onsenui'

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Page>
                <section style={{
                    margin: 'auto',
                    height: '100vh',
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                                // margin: auto;
                                // height: 100vh;
                                // width: 40 %;
                                // display: flex;
                                // flex-direction: column;
                                // justify-content: center;
                }}>
                    <div style={{
//                         background-color: rgba(255,255,255,0.3);
// height: 40%;
// display: flex;
// flex-direction: column;
// justify-content: center;
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        height: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <div>
                            <Input />
                        </div>
                        <div>
                            <Input />
                        </div>
                        <div>
                            <Input />
                        </div>
                    </div>
                </section>
            </Page>
        )
    }
}

Welcome.propTypes = {

}

export default Welcome