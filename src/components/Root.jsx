import React, { Component } from 'react';
import { Provider } from 'react-redux'
import App from './App'
import store from '../store'

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App cordova={this.props.cordova}/>
            </Provider>
        )
    }
}

export default Root