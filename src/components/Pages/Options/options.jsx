import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    BackButton,
    Toolbar,
    Switch
} from 'react-onsenui'
import Requester from '../../../js/requester'

class OptionsPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            checked: JSON.parse(localStorage.getItem('localOptions')).connectDB || false,
        }

        this.req = new Requester()

        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    renderToolbar() {
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handlerCanselClick}>Back</BackButton>
            : null;
        return (
            <Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>{this.props.route.title}</div>
            </Toolbar>
        )
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    handleChange(e) {
        this.setState({
            checked: e.target.checked
        }, () => {
            this.req.updateOption('connectDB', this.state.checked)
        });
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <section className="nzOptions">
                    <div className="nzOptionsTextBlock">
                        <span className="nzOptionsTextBlockELem">
                            Использовать удаленую БД для хранения данных?
                        </span>
                    </div>
                    <div className="nzOptionsSwitchBlock">
                        <Switch
                            disabled
                            checked={this.state.checked}
                            onChange={this.handleChange}
                        />
                    </div>
                </section>
            </Page>
        )
    }
}

OptionsPage.propTypes = {
    route: PropTypes.object
}

export default OptionsPage