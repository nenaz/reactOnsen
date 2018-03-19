import React, { Component } from 'react'
import '../css/App.css'
import '../css/style.css'
import '../css/ionicons.css'
import DownloadPDF from './DownloadPDF'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import store from '../store'
import { Provider } from 'react-redux'
import AddAccount from './addAccount'
import EditAccount from './EditAccount'
import MainPage from './mainPage'
import Utils from '../js/utils'
import { connect } from 'react-redux'
import AddOperation from './addOperation'
import { addOperationToList, addAccountToList } from '../AC'
import Requester from '../js/requester'
import { ProgressCircular, Navigator } from 'react-onsenui'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      logon: false,
      errorLogonText: '',
      errorLogonStatus: ''
    }

    this.req = new Requester()

    this.renderPage = this.renderPage.bind(this)
    this.getOperations = this.getOperations.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.changeLogonStatus = this.changeLogonStatus.bind(this)
  }

  // componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     render: true
    //   })
    // }, 2000)
  // }
  componentWillMount() {
    this.req.initialize();
  }

  componentDidMount() {
    this.getAccounts(this.req)
    this.getOperations(this.req)
    setTimeout(() => {
      this.setState({
        render: true
      })
    }, 2000)
  }

  renderPage(route, navigator) {
    switch (route.title) {
      case 'addAccount': return (
        <AddAccount
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'addOperation': return (
        <AddOperation
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'editAccount': return (
        <EditAccount
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'download': return <DownloadPDF />
      default: return (
        <MainPage
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
    }
  }

  getOperations(req) {
    const arrOper = (req.getLocal('localItems'))
    arrOper.map(item => this.props.addOperationToList(item))
  }

  getAccounts(req) {
    const arrAcc = req.getLocal('localAccounts')
    arrAcc.map(item => this.props.addAccountToList(item))
  }

  changeLogonStatus(obj) {
    const resultObj = JSON.parse(obj)
    const logon = resultObj.result
    if (logon) {
      this.getOperations(this.req)
      this.getAccounts(this.req)
      this.setState({
        logon,
        render: true
      })
    } else {
      this.setState({
        errorLogonStatus: resultObj.status,
        errorLogonText: resultObj.statusText
      })
    }
  }

  render() {
    if (this.state.render) {
      return (
        <Provider store={store}>
          <Navigator
            swipeable
            renderPage={this.renderPage}
            initialRoute={{
              title: 'First page',
              hasBackButton: false
            }}
            animation='slide'
            animationOptions={{
              duration: 0.3
            }}
          />
        </Provider>
      )
    } else {
      return <ProgressCircular indeterminate className="nzProgressC" />
    }
  }
}

export default connect((state) => ({
  changeAnimationState: state.changeAnimationState
}), {
  addOperationToList,
  addAccountToList
})(App)
