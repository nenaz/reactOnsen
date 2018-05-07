import React,{ Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Utils from '../../js/utils'

class BalanceTitle extends Component{
    constructor(props){
        super(props)
        this.state ={}
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
            <section className="nzBalanceTitle">
                <div className="nzBalanceTitleRow _balance">
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnFirst">Баланс</span>
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnSecond"></span>
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnThird">{this.props.amount}</span>
                </div>
                <hr className="nzBalanceTitleLine" />
                <div className="nzBalanceTitleRow _title">
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnFirst"></span>
                    <span className="nzBalanceTitleColumn">Доходы</span>
                    <span className="nzBalanceTitleColumn">Расходы</span>
                </div>
                <div className="nzBalanceTitleRow">
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnFirst">Сегодня</span>
                    <span className="nzBalanceTitleColumn">{balanceObj.amountUp}</span>
                    <span className="nzBalanceTitleColumn">{balanceObj.amountDown}</span>
                </div>
            </section>
        )
    }
}

BalanceTitle.propTypes = {
    amount: PropTypes.string
}

export default connect((state) => ({
    operations: state.changeLastOperations
}))(BalanceTitle)