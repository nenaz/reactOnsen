import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Input,
} from 'react-onsenui'
import './css/profilePage.css'

class ProfileItem extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <section className="nzProgileListItem">
                <div className="nzProgileListItemLeft">
                    <Input
                        className="accountName"
                        modifier='underbar'
                        float
                        placeholder={this.props.value}
                    />
                </div>
                <div className="nzProgileListItemRight">
                    <span className="icon-edit"></span>
                </div>
            </section>
        )
    }
}

ProfileItem.propTypes = {
    value: PropTypes.string,
}

export default ProfileItem