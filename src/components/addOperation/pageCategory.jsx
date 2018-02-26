import React, { Component } from 'react'
import {
    Button,
    Page,
    List,
    ListItem
} from 'react-onsenui'

class PageCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(row) {
        return (
            <ListItem key={row}>
                <span>{row}</span>
            </ListItem>
        )
    }

    render() {
        return (
            <Page>
                <List
                    dataSource={['a', 'b', 'c', 'd', 'e']}
                    renderRow={this.renderRow}
                />
            </Page>
        )
    }
}

export default PageCategory