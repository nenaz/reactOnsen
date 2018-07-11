import React, { Component} from 'react'
import PropTypes from 'prop-types'
import './css/authButton.css'
import { connect } from 'react-redux'

class AuthButton extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <button
                className={this.props.currentClassName}
                onClick={this.props.logonFunc}
                style={this.props.buttonStyle}
            >
                <span className="content">{this.props.buttonText}</span>
            </button>
        )
    }
}

AuthButton.propTypes = {
    buttonText: PropTypes.string,
    buttonStyle: PropTypes.object,
    logonFunc: PropTypes.func,
}

export default connect((state) => ({
    currentClassName: state.changeAuthButtonClassName,
}))(AuthButton)