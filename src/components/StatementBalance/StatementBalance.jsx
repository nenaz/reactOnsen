import React,{ Component} from 'react'
import Balance from './Balance'
import PropTypes from 'prop-types'

class StatementBalance extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <section className="nzBalanceData">
                <Balance amount="999" />
                <Balance amount={this.props.balance} typeBalance/>
                <Balance amount="1000" separator />
            </section>
        )
    }
}

StatementBalance.propTypes = {
    balance: PropTypes.string
}

export default StatementBalance