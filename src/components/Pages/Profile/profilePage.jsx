import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    BackButton,
    Toolbar,
} from 'react-onsenui'

class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state ={}

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
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

    render(){
        return (
            <Page renderToolbar={this.renderToolbar} />
        )
    }
}

ProfilePage.propTypes = {

}

export default ProfilePage