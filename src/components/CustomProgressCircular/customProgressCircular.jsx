import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    ProgressCircular,
} from 'react-onsenui'
import { connect } from 'react-redux'

class CustomeProgressCircular extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <ProgressCircular
                indeterminate
                className={`${this.props.className} ${this.props.currentClassName}`}
            />
        )
    }
}

CustomeProgressCircular.propTypes = {
    className: PropTypes.string,
}

export default connect((state) => ({
    currentClassName: state.changeAuthButtonClassName,
}))(CustomeProgressCircular)