import React from 'react'
import PropTypes from 'prop-types'
import {
    Switch,
} from 'react-onsenui'

const OptionsItem = (props) => {
    return (
        <section className="nzOptions">
            <div className="nzOptionsTextBlock">
                <span className="nzOptionsTextBlockELem">
                    {props.title}
                </span>
            </div>
            <div className="nzOptionsSwitchBlock">
                <Switch
                    checked={props.checked}
                    onChange={props.handleChangeSwitch}
                />
            </div>
        </section>
    )
}

OptionsItem.propTypes = {
    title: PropTypes.string,
    checked: PropTypes.bool,
    handleChangeSwitch: PropTypes.func,
}

export default OptionsItem