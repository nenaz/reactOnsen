import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import StatementBalanc from '../../StatementBalance'
import BalanceTitle from '../../StatementBalance/balanceTitle'

class WidgetBalanceSection extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    allBalance() {
        let amount = 0
        this.props.changeAccountsList.map((item) => {
            if (item.amount && item.consider) {
                amount += (item.amount * 1)
            }
            return item
        })
        return amount.toFixed(2)
    }

    render() {
        return (
            <section className="nzBalance">
                <BalanceTitle amount={this.allBalance()}/>
            </section>
        )
    }
}

WidgetBalanceSection.propTypes = {
    pushPage: PropTypes.func,
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(WidgetBalanceSection)