import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import './css/magic.css'
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
