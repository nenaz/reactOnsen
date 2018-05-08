import React, { Component } from 'react';
import { string } from 'prop-types';
/* global window */

export default class Link extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        window.alert('Кликнули по ссылке!')
        this.setState({
            clicked: true
        })
    }

    render() {
        const { title, url } = this.props;

        return (
            <a
                href={url}
                onClick={this.handleClick}
            >
                {title}
            </a>
        )
    }
}