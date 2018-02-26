import React, { Component } from 'react'
import Utils from '../../js/utils'

class AmountInput extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="nzAmountSection">
                <div className="nzAmountInput">
                    <div className="nzAmountItem nzTypeOperation">
                        <span>{Utils.convertTypeOperation(this.props.typeOperation)}</span>
                    </div>
                    <div className="nzAmountItem nzAmountTextBlock">
                        <span style={{
                            fontSize: this.props.amountfontSize,
                        }}>{this.props.inputAmount}{(this.props.comma) ? ',' : ''}{(this.props.comma) ?
                                this.props.part : ''}</span>
                    </div>
                    <div className="nzAmountItem nzCurrency">
                        <span>RUB</span>
                    </div>
                </div>
                <div className="nzAmountSelect">
                    <div onClick={() => {
                        this.props.handleRunAnimation(0)
                    }}>
                        <span className="nzAmountSelectTitle">Счет</span>
                        <span className="nzAmountSelectText">{this.props.accountName}</span>
                    </div>
                    <div onClick={() => {
                        this.props.handleRunAnimation(1)
                    }}>
                        <span className="nzAmountSelectTitle">Категория</span>
                        <span className="nzAmountSelectText">Еда</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AmountInput