import React, { Component } from 'react'
import { connect } from 'react-redux'
import StatementBalanc from '../StatementBalance'
import BalanceTitle from '../StatementBalance/balanceTitle'

class WidgetBalanceSection extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    allBalance() {
        let balance = 0
        this.props.changeAccountsList.map((item) => {
            balance += (item.balance * 1)
            return item
        })
        return balance.toFixed(2)
    }

    render() {
        return (
            <section className="nzBalance">
                <BalanceTitle />
                <StatementBalanc balance={this.allBalance()}/>
            </section>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(WidgetBalanceSection)