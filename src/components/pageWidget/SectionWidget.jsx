import React, { Component } from 'react'
import WidgetTitle from './widgetTitle'
import WidgetButtonsSection from '../Button'
import Utils from '../../js/utils'

class SectionWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionParams: {}
        }
        this.renderButtons = this.renderButtons.bind(this)
    }

    componentWillMount() {
        debugger
        this.setState({
            sectionParams: Utils.selectSectionsParams(this.props.name)
        })
    }

    renderButtons() {
        
        if (this.state.sectionParams.defaultButtons) {
            return <WidgetButtonsSection />
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
                    <div style={{ margin: '8px' }}  >
                        <WidgetTitle title={this.state.sectionParams.title} />
                        {this.renderButtons()}
                    </div>
                </div>
            </section>
        )
    }
}

export default SectionWidget