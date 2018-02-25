import React, { Component } from 'react'
import {
    Button,
    Page,
    List,
    ListItem
} from 'react-onsenui'

class PageTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(row) {
        return (
            <ListItem>
                <span>{row}</span>
            </ListItem>
        )
    }

    render() {
        return (
            <Page>
                <List
                    dataSource={[1,2,3,4,5]}
                    renderRow={this.renderRow}
                />
            </Page>
        )
    }
}

export default PageTemplate