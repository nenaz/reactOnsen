import React, { Component } from 'react'
import { connect } from 'react-redux'

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
            <div style={{
                fontSize: '25px',
                textAlign: 'center',
                color: '#1f1f21'
            }}>{this.allBalance()}</div>
        )
    }
}

export default connect((state) => ({
    changeAccountsList: state.changeAccountsList
}))(WidgetBalanceSection)