import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LISTCATEGORY } from '../../js/consts'

class AmountInput extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.renderLists = this.renderLists.bind(this)
        this.getCurrentCategoryName = this.getCurrentCategoryName.bind(this)
    }

    getCurrentCategoryName() {
        const id = this.props.categoryId || '0-0'
        const items = id.split('-')
        const categoryName = LISTCATEGORY.find(item => {
            return item.value === items[0] * 1
        })
        return categoryName
    }

    renderLists() {
        if (this.props.typeOperation === '2') {
            return (
                <div onClick={() => {
                    this.props.handleRunAnimation(0)
                }}>
                    <span className="nzAmountSelectTitle">Счет</span>
                    <span className="nzAmountSelectText">{this.props.accountNameTo}</span>
                </div>
            )
        } else {
            const name = this.getCurrentCategoryName()
            return (
                <div onClick={() => {
                    this.props.handleRunAnimation(1)
                }}>
                    <span className="nzAmountSelectTitle">Категория</span>
                    <span className="nzAmountSelectText">{name.title}</span>
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
                        <span className="nzAmountSelectAmount">{this.props.inputAmount}</span>
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
    categoryId: PropTypes.string,
}

AmountInput.defaultProps = {
    categoryId: '0-0',
}

export default AmountInput