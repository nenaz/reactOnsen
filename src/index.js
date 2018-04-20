import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import './css/magic.css'
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker'

if (window.navigator) {
    console.log('navigator')
}
let cordova = undefined
if (window.cordova) {
    console.log('cordova')
    cordova = window.cordova
}

ReactDOM.render(<Root cordova={cordova}/>, document.getElementById('root'))
registerServiceWorker()
