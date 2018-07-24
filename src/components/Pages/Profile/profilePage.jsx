import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    BackButton,
    Toolbar,
} from 'react-onsenui'
import ProfileItem from '../../ProfileItem';
import { connect } from 'react-redux'

class ProfilePage extends Component{
    constructor(props){
        super(props)
        this.state ={
            newLogin: false,
            newPassword: false,
            deleteAllData: false,
        }

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.handleNewLoginToggle = this.handleNewLoginToggle.bind(this)
    }

    renderToolbar() {
        const backButton = this.props.route.hasBackButton
            ? <BackButton onClick={this.handlerCanselClick}>Back</BackButton>
            : null;
        return (
            <Toolbar>
                <div className='left'>{backButton}</div>
                <div className='center'>Профиль пользователя</div>
            </Toolbar>
        )
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    handleNewLoginToggle(e) {
        this.setState({
            newLogin: e.target.checked,
            newLoginPanelShow: true,
        });
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                {/* <section className="nzProgileListItem">
                    <div className="nzProgileListItemLeft">
                        <Input
                            className="accountName"
                            modifier='underbar'
                            float
                            placeholder={this.props.login}
                        />
                    </div>
                    <div className="nzProgileListItemRight">
                        <span className="icon-edit"></span>
                    </div>
                </section> */}
                <ProfileItem />
            </Page>
        )
    }
}

ProfilePage.propTypes = {

}

export default connect((state) => ({
    login: state.login,
}))(ProfilePage)