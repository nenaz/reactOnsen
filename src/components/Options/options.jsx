import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    BackButton,
    Toolbar,
    Switch
} from 'react-onsenui'

class OptionsPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            checked: false
        }

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
        this.setState({ checked: e.target.checked });
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <section>
                    <div style={{
                        color: 'white'
                    }}>
                        <span>Использовать удаленую БД для хранения данных?</span>
                    </div>
                    <div>
                        <Switch
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

}

export default OptionsPage