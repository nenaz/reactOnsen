import React, { Component } from 'react'
import {
    Button,
    Page,
    List,
    ListItem
} from 'react-onsenui'
import { connect } from 'react-redux'

class PageAccounts extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(row) {
        return (
            <ListItem key={row._id}>
                <span>{row.name}</span>
            </ListItem>
        )
    }

    render() {
        return (
            <Page>
                <List
                    // dataSource={[1,2,3,4,5]}
                    dataSource={this.props.changeAccountsList}
                    renderRow={this.renderRow}
                />
            </Page>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}), {})(PageAccounts)

