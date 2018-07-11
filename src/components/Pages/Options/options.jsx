import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
} from 'react-onsenui'
import ToolbarCustom from '../../ToolbarCustom'
import UseRemoteDB from './useRemoteDB';
import Geolocation from './geolocation';

class OptionsPage extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.renderToolbar = this.renderToolbar.bind(this)
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="Настройки"
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <UseRemoteDB />
                <Geolocation />
            </Page>
        )
    }
}

OptionsPage.propTypes = {
    route: PropTypes.object
}

export default OptionsPage