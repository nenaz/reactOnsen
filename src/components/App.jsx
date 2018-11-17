import React, { Component } from 'react'
import {
  Provider,
  connect
} from 'react-redux'
import {
  Navigator
} from 'react-onsenui'
import '../css/App.css'
import '../css/style.css'
import '../css/ionicons.css'
import DownloadPDF from './DownloadPDF'
import store from '../store'
import { AccountAdd } from '@/pages/account/add';
import { AccountPage } from '@/pages/account';
// import EditAccount from './Pages/Account/Edit'
import { EditAccount } from '@/pages/account/edit';
import MainPage from './Pages/Main'
import AddOperation from './Pages/Operation/Add'
import OptionsPage from './Pages/Options';
import ProfilePage from './Pages/Profile';
import {
  addOperationToList,
  addAccountToList,
  setNewFunctions,
  addDataToList
} from '../AC'
import Requester from '../js/requester'
import Welcome from './Pages/Welcome'
import config from '../js/config'
import Utils from '../js/utils'
import AboutPage from './Pages/About'
import ViewOperations from './Pages/Operation/View';
import Report from './Pages/Report';

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
    this.connectDB = true

    this.renderPage = this.renderPage.bind(this)
    this.getOperations = this.getOperations.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.changeLogonStatus = this.changeLogonStatus.bind(this)
    this.getNew = this.getNew.bind(this)
    this.getDataForChart = this.getDataForChart.bind(this)
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

  // componentDidMount() {
  //   Promise.all([this.getAccounts(), this.getOperations()]).then(values => {
  //     this.setState({
  //       render: true
  //     })
  //   })
  // }

  renderPage(route, navigator) {
    switch (route.title) {
      case 'AccountPage': return (
        <AccountPage
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
      case 'about': return (
        <AboutPage
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'profile': return (
        <ProfilePage
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'viewOperations': return (
        <ViewOperations
          key={route.title}
          route={route}
          navigator={navigator}
        />
      )
      case 'report': return (
        <Report
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
    return new Promise((resolve, reject) => {
      this.req.request('getOperations').then(result => {
        resolve(result)
        const arrOper = result.reverse()
        arrOper.map(item => this.props.addOperationToList(item))
      })
    })
  }

  getAccounts() {
    return new Promise((resolve, reject) => {
      this.req.request('getAccounts').then(result => {
        resolve(result)
        const arrAcc = result.reverse()
        arrAcc.map(item => this.props.addAccountToList(item))
      })
    })
  }

  getNew() {
    return new Promise((resolve, reject) => {
      this.req.request('whatsnew', {
        version: config.version,
      }).then(result => {
        resolve(result)
        this.props.setNewFunctions(result)
      })
    })
  }

  getDataForChart() {
    return new Promise((resolve, reject) => {
      this.req.request('getDataForChart', {
        nowMonthDate: Utils.nowDate(false, true)
      }).then(data => {
        // const tt = Utils.formatingDataForChart(data)
        resolve(data)
        this.props.addDataToList(data)
      })
    })
  }

  changeLogonStatus(logon) {
    if (logon) {
      Promise.all([
        this.getAccounts(),
        this.getOperations(),
        // this.getDataForChart(),
        this.getNew(),
      ]).then(values => {
        this.setState({
          render: true,
          logon
        })
      })
    } else {
      // const obj = JSON.parse(resultObj)
      // this.setState({
      //   errorLogonStatus: String(obj.status),
      //   errorLogonText: obj.statusText,
      //   render: false,
      // })
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
      return (
        <Welcome
          changeLogonStatus={this.changeLogonStatus}
          errorLogonText={this.state.errorLogonText}
          errorLogonStatus={this.state.errorLogonStatus}
        />
      )
    }
  }
}

export default connect((state) => ({
  changeAnimationState: state.changeAnimationState
}), {
  addOperationToList,
  addAccountToList,
  setNewFunctions,
  addDataToList
})(App)
