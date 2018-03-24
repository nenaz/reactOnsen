import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AmountInput extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderLists = this.renderLists.bind(this)
    }

    renderLists() {
        if (this.props.typeOperation === '-1') {
            return (
                <div onClick={() => {
                    this.props.handleRunAnimation(0)
                }}>
                    <span className="nzAmountSelectTitle">Счет</span>
                    <span className="nzAmountSelectText">{this.props.accountNameTo}</span>
                </div>
            )
        } else {
            return (
                <div onClick={() => {
                    this.props.handleRunAnimation(1)
                }}>
                    <span className="nzAmountSelectTitle">Категория</span>
                    <span className="nzAmountSelectText">Еда</span>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="nzAmountSection">
                <div className="nzAmountInput">
                    <div className="nzAmountItem nzTypeOperation">
                        <span>{this.state.typeOper}</span>
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
                    {this.renderLists()}
                </div>
            </div>
        )
    }
}

AmountInput.propTypes = {
    typeOperation: PropTypes.string,
    accountNameTo: PropTypes.string,
}

export default AmountInput