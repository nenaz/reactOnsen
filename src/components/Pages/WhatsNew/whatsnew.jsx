import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button
} from 'react-onsenui'
import config from '../../../js/config'
import Requester from '../../../js/requester'
import { connect } from 'react-redux'
import {
    setNewFunctions,
} from '../../../AC'

class WhatsNew extends Component{
    constructor(props){
        super(props)
        this.state ={
            descriptions: ''
        }

        this.showUpdateDescription = this.showUpdateDescription.bind(this)
        this.handleButtonClose = this.handleButtonClose.bind(this)

        this.req = new Requester()
    }

    showUpdateDescription() {
        if (this.props.newFunctions.show) {
            const description = this.props.newFunctions.updateDescription.map((item, key) => {
                return (
                    <li key={key}>{item}</li>
                )
            })
            return description
        } else {
            return false
        }
    }

    handleButtonClose() {
        this.props.setNewFunctions({
            show: false,
        })
        this.req.request('setShowNews', {
            id: this.props.newFunctions._id
        }).then((result) => {

        })
        this.props.handleModalClose()
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
                        onClick={this.handleButtonClose}
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

export default connect((state) => ({
    newFunctions: state.updateNewFunctions,
}), {
    setNewFunctions,
})(WhatsNew)