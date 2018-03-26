import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LISTCATEGORY } from '../../js/consts'
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselItem from './carouselItem';
import CheckTypeOperation from './typeOperation'

class AmountInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsType: [
                '1', '0', '-1'
            ],
        }

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
                <CheckTypeOperation
                    typeOperation={this.props.typeOperation}
                    selectTypeOperation={this.props.selectTypeOperation}
                />
                <Carousel
                    showArrows={false}
                    showIndicators
                    showStatus={false}
                    emulateTouch
                    className="nznzAmountSectionCarousel"
                >
                    {this.state.itemsType.map((item, key) => {
                        return <CarouselItem
                                key={key}
                                amountfontSize={this.props.amountfontSize}
                                inputAmount={this.props.inputAmount}
                                comma={this.props.comma}
                                part={this.props.part}
                            />
                    })}
                </Carousel>
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
    selectTypeOperation: PropTypes.func,
}

AmountInput.defaultProps = {
    categoryId: '0-0',
}

export default AmountInput