import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    // Page,
    Toolbar,
    ToolbarButton,
    // Input,
    // Select,
    // Toast,
    // Fab
} from 'react-onsenui'
import Icon from '../Icon'
import { Link } from 'react-router-dom'
import { ICONCANCEL } from '../../js/consts'

class ToolbarC extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        // if ()
        return (
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left">
                    <ToolbarButton />
                </div>
                <div className="center">{this.props.title}</div>
                <div className="right">
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={this.props.handlerCanselClick}>
                        <ToolbarButton ref='button'>
                            <Icon iconBase64={ICONCANCEL} />
                        </ToolbarButton>
                    </Link>
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