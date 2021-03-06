import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    List,
    ListItem
} from 'react-onsenui'
import { LEFTMENUITEMS } from '../../../js/consts'

class LeftMenu extends Component{
    constructor(props){
        super(props)
        this.state ={}
        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(row, index) {
        switch (row.name) {
            case 'about':
                return (
                    <ListItem
                        key={row.name}
                        onClick={row.onClick}
                    >
                        {row.text}
                    </ListItem>
                )
            case 'options':
                return (
                    <ListItem
                        key={row.name}
                        onClick={() => { this.props.pushPage('options') } }
                    >
                        {row.text}
                    </ListItem>
                )
            default: return (
                <ListItem
                    key={row.name}
                    onClick={this.props.handleSelectLeftMenuItem}
                    tappable
                >
                    {row.text}
                </ListItem>
            )
        }
    }

    render(){
        return (
            <Page>
                <List
                    dataSource={LEFTMENUITEMS}
                    renderRow={this.renderRow}
                />
            </Page>
        )
    }
}

LeftMenu.propTypes = {
    pushPage: PropTypes.func.isRequired,
    handleSelectLeftMenuItem: PropTypes.func.isRequired,
}

export default LeftMenu