import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
} from 'react-onsenui'
import {  Navbar, List, ListItem } from 'framework7-react';
import ToolbarCustom from '../../ToolbarCustom'

class Report extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.renderToolbar = this.renderToolbar.bind(this)
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="Отчет"
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    render(){
        return (
            // <Page renderToolbar={this.renderToolbar}>
            //     {/* <UseRemoteDB />
            //     <Geolocation /> */}
            // </Page>
            <Page>
                <Navbar title="My Page" />
                <List>
                    <ListItem title="Item 1" />
                    <ListItem title="Item 2" />
                </List>
            </Page>
        )
    }
}

Report.propTypes = {
    route: PropTypes.object,
}

export default Report