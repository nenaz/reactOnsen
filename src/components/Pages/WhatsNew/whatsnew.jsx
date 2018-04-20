import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button
} from 'react-onsenui'
import config from '../../../js/config'

class WhatsNew extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.showUpdateDescription = this.showUpdateDescription.bind(this)
    }

    showUpdateDescription() {
        const description = config.updateDescription.map((item, key) => {
            return (
                <li key={key}>{item}</li>
            )
        })
        return description
    }

    render(){
        return (
            <section
                style={{
                    margin: '16px',
                    backgroundColor: 'white',
                    color: 'black',
                    height: '50%',
                    borderRadius: '5%'
                }}
            >
                <section>
                    <div>Что нового</div>
                </section>
                <section>
                    <ul style={{
                        textAlign: 'left'
                    }}>
                        {this.showUpdateDescription()}
                    </ul>
                    <Button
                        onClick={this.props.handleModalClose}
                    >
                        Понятно
                    </Button>
                </section>
            </section>
        )
    }
}

WhatsNew.propTypes = {
    handleModalClose: PropTypes.func
}

export default WhatsNew