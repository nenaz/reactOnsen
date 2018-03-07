import React, { Component } from 'react'
import WidgetButtonsSection from '../ButtonSection'
import WidgetBalanceSection from './widgetBalance'
import WidgetChartSection from './widgetChart'
import WidgetLastSection from './widgetLastOperations'
import Utils from '../../js/utils'
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
            return <WidgetTemplate title={this.state.sectionParams.title} children={<WidgetButtonsSection />} />
        } else if (this.state.sectionParams.balance) {
            return <WidgetTemplate selectTitle title={this.state.sectionParams.title} children={<WidgetBalanceSection />} />
        } else if (this.state.sectionParams.chart) {
            return <WidgetTemplate title={this.state.sectionParams.title} children={<WidgetChartSection />} />
        } else if (this.state.sectionParams.last) {
            return <WidgetTemplate selectTitle titleType={1} children={<WidgetLastSection />}
                />
        } else {
            return <div />
        }
    }

    render() {
        return (
            <section style={{ margin: '8px' }}>
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #f0f0f0'
                }}>
                    {this.renderButtons()}
                </div>
            </section>
        )
    }
}

export default SectionWidget