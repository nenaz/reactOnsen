import React, { Component } from 'react'
import { connect } from 'react-redux'

class WidgetBalanceSection extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    allBalance() {
        let balance = this.props.changeAccountsList.map((item) => {
            console.log(balance)
            return item.balance
        })
        return balance
    }

    render() {
        return (
            <div>{this.allBalance()}</div>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(WidgetBalanceSection)