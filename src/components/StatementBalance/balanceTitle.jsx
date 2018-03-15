import React,{ Component} from 'react'
import PropTypes from 'prop-types'

class BalanceTitle extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <section className="nzBalanceTitle">
                <div className="nzBalanceTitleRow _balance">
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnFirst">Баланс</span>
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnSecond"></span>
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnThird">{this.props.balance}</span>
                </div>
                <hr className="nzBalanceTitleLine" />
                <div className="nzBalanceTitleRow _title">
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnFirst"></span>
                    <span className="nzBalanceTitleColumn">Доходы</span>
                    <span className="nzBalanceTitleColumn">Расходы</span>
                </div>
                <div className="nzBalanceTitleRow">
                    <span className="nzBalanceTitleColumn nzBalanceTitleColumnFirst">Сегодня</span>
                    <span className="nzBalanceTitleColumn">1000</span>
                    <span className="nzBalanceTitleColumn">-500</span>
                </div>
            </section>
        )
    }
}

BalanceTitle.propTypes = {
    balance: PropTypes.string
}

export default BalanceTitle