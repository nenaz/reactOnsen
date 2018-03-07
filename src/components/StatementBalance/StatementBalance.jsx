import React,{ Component} from 'react'
import Balance from './Balance'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class StatementBalance extends Component{
    constructor(props){
        super(props)
        this.state ={}
        
        this.getTodayBalance = this.getTodayBalance.bind(this)
    }

    getTodayBalance() {
        let amountUp = 0
        let amountDown = 0
        const itemUp = this.props.operations.filter((item) => {
            return item.typeOperation === "1"
        })
        const itemDown = this.props.operations.filter((item) => {
            return item.typeOperation === "0"
        })
        itemUp.map(item => amountUp += item.balance * 1)
        itemDown.map(item => amountDown += item.balance * 1)
        return ({
            amountUp,
            amountDown
        })
    }

    render(){
        const balanceObj = this.getTodayBalance()
        return (
            <section className="nzBalanceData">
                <Balance amount={balanceObj.amountUp} />
                <Balance amount={this.props.balance} typeBalance/>
                <Balance amount={balanceObj.amountDown} separator />
            </section>
        )
    }
}

StatementBalance.propTypes = {
    balance: PropTypes.string
}

export default connect((state) => ({
    operations: state.changeLastOperations
}))(StatementBalance)