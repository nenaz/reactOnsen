import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
} from 'react-onsenui'
import ToolbarCustom from '../../../ToolbarCustom'

class ViewOperations extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.renderToolbar = this.renderToolbar.bind(this)
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="Операции"
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                {/* <UseRemoteDB />
                <Geolocation /> */}
            </Page>
        )
    }
}

ViewOperations.propTypes = {
    route: PropTypes.object,
}

export default ViewOperations