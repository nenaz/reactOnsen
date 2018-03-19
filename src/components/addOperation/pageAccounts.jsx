import React, { Component } from 'react'
import {
    Page,
    List,
    ListItem
} from 'react-onsenui'
import { connect } from 'react-redux'
import Title from '../Title'

class PageAccounts extends Component {
    constructor(props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(row) {
        return (
            <ListItem
                key={row._id}
                onClick={this.props.handleSelectItem}
                value={row._id}
                name={row.name}
            >
                <span>{row.name}</span>
            </ListItem>
        )
    }

    render() {
        return (
            <Page>
                <Title title="Счета" />
                <List
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

