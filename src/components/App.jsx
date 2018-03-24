import React, { Component } from 'react'
import '../css/App.css'
import '../css/style.css'
import '../css/ionicons.css'
import DownloadPDF from './DownloadPDF'
import store from '../store'
import { Provider } from 'react-redux'
import AddAccount from './addAccount'
import EditAccount from './EditAccount'
import MainPage from './mainPage'
import { connect } from 'react-redux'
import AddOperation from './addOperation'
import { addOperationToList, addAccountToList } from '../AC'
import Requester from '../js/requester'
import { ProgressCircular, Navigator } from 'react-onsenui'
import OptionsPage from './Options';

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
    // this.connectDB = this.req.JSON.parse(localStorage.getItem('localOptions')).connectDB
    // this.connectDB = true

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
    this.getAccounts()
    this.getOperations()
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
      case 'options': return (
        <OptionsPage
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'chart': return (
        <OptionsPage
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

  getOperations() {
    this.req.request('getOperations').then(result => {
      const arrOper = result.reverse()
      arrOper.map(item => this.props.addOperationToList(item))
    })
  }

  getAccounts() {
    this.req.request('getAccounts').then(result => {
      const arrAcc = result.reverse()
      arrAcc.map(item => this.props.addAccountToList(item))
    })
  }

  changeLogonStatus(obj) {
    const resultObj = JSON.parse(obj)
    const logon = resultObj.result
    if (logon) {
      this.getOperations()
      this.getAccounts()
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
