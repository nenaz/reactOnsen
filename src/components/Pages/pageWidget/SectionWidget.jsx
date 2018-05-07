import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WidgetButtonsSection from '../../ButtonSection'
import WidgetBalanceSection from './widgetBalance'
import WidgetChartSection from './widgetChart'
import WidgetLastSection from './widgetLastOperations'
import Utils from '../../../js/utils'
import WidgetTemplate from './widgetTemplate';

class SectionWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionParams: {}
        }
        this.renderButtons = this.renderButtons.bind(this)
    }

    componentWillMount() {
        this.setState({
            sectionParams: Utils.selectSectionsParams(this.props.name)
        })
    }

    renderButtons() {
        if (this.state.sectionParams.defaultButtons) {
            return <WidgetTemplate title={this.state.sectionParams.title} children={<WidgetButtonsSection pushPage={this.props.pushPage}/>} />
        } else if (this.state.sectionParams.amount) {
            return <WidgetTemplate selectTitle title={this.state.sectionParams.title} children={<WidgetBalanceSection pushPage={this.props.pushPage} />} />
        } else if (this.state.sectionParams.chart) {
            return <WidgetTemplate title={this.state.sectionParams.title} children={<WidgetChartSection pushPage={this.props.pushPage} />} />
        } else if (this.state.sectionParams.last) {
            return <WidgetTemplate selectTitle titleType={1} children={<WidgetLastSection pushPage={this.props.pushPage} />}
                />
        } else {
            return <div />
        }
    }

    render() {
        return (
            <section className="nzWidgetSection">
                <div className="nzWidgetBlock">
                    {this.renderButtons()}
                </div>
            </section>
        )
    }
}

SectionWidget.propTypes = {
    pushPage: PropTypes.func,
}

export default SectionWidget