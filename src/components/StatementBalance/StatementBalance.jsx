import React,{ Component} from 'react'
import Balance from './Balance'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Utils from '../../js/utils'

class StatementBalance extends Component{
    constructor(props){
        super(props)
        this.state ={}
        
        this.getTodayBalance = this.getTodayBalance.bind(this)
    }

    getTodayBalance() {
        const itemUp = this.props.operations.filter((item) => {
            return item.typeOperation === "1"
        })
        const itemDown = this.props.operations.filter((item) => {
            return item.typeOperation === "0"
        })
        return ({
            amountUp: Utils.dailyCounting(itemUp),
            amountDown: Utils.dailyCounting(itemDown)
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