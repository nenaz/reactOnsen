import React, { Component } from 'react'
import PageAccounts from './pageAccounts'
import Utils from '../../js/utils'

class AmountInput extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="nzAmountInput">

                <div className="nzAmountItem nzTypeOperation">
                    <span>{Utils.convertTypeOperation(this.props.typeOperation)}</span>
                </div>
                <div className="nzAmountItem nzAmountTextBlock">
                    <span style={{
                        fontSize: this.state.amountfontSize,
                    }}>{this.state.inputAmount}{(this.state.comma) ? ',' : ''}{(this.state.comma) ?
                        this.state.part : ''}</span>
                </div>
                <div className="nzAmountItem nzCurrency">
                    <span>RUB</span>
                </div>
                <section>
                    <span
                        onClick={this.props.handleRunAnimation}
                    > Выбрать счет </span>
                    {/*<PageCategory />*/}
                </section>
            </div>
        )
    }
}

export default AmountInput