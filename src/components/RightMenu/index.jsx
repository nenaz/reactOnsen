import React, { Component } from 'react'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

class RightMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        if (this.props.action) {
            return (
                <ul className="list">
                    <li className="list-item">
                        <div className="list-item__center">Dog</div>
                    </li>
                    <li className="list-item">
                        <div className="list-item__center">Cat</div>
                    </li>
                    <li className="list-item">
                        <div className="list-item__center">Hamster</div>
                    </li>
                </ul>
            )
        } else return <b />
    }
}

export default RightMenu