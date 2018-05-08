import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Toolbar,
    ToolbarButton,
} from 'react-onsenui'

class ToolbarC extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left">
                    <ToolbarButton />
                </div>
                <div className="center">{this.props.title}</div>
                <div className="right">
                    <ToolbarButton />
                </div>
            </Toolbar>
        )
    }
}

ToolbarC.propTypes = {
    title: PropTypes.string,
    handlerCanselClick: PropTypes.func,
}

export default ToolbarC