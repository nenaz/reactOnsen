import React, { Component } from 'react'
import '../css/App.css'
import '../css/ionicons.css'
import Loading from './Loading'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  // Link
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
import Logon from './Logon'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      logon: false,
      errorLogonText: '',
      errorLogonStatus: ''
    }

    this.renderPage = this.renderPage.bind(this)
    this.getOperations = this.getOperations.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.changeLogonStatus = this.changeLogonStatus.bind(this)
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     render: true
    //   })
    // }, 2000)
  }

  renderPage({ match: { params } }) {
    switch (params.name) {
      case 'addAccount': return <AddAccount />
      case 'addOperation': return <AddOperation />
      case 'editAccount': return <EditAccount />
      default: return <MainPage />
    }
  }

  getOperations(req) {
    req.send('getLastFive', 'POST').then(result => {
      const arrOper = (JSON.parse(result)).reverse()
      arrOper.map(item => this.props.addOperationToList(item))
    })
  }

  getAccounts(req) {
    req.send('getAccounts', 'POST').then(result => {
      const arrAcc = (JSON.parse(result)).reverse()
      arrAcc.map(item => this.props.addAccountToList(item))
    })
  }

  changeLogonStatus(obj) {
    const resultObj = JSON.parse(obj)
    const logon = resultObj.result
    if (logon) {
      const req = new Requester()
      this.getOperations(req)
      this.getAccounts(req)
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
    if (this.state.render && this.state.logon) {
      return (
        <Provider store={store}>
          <Router >
            <Route render={({ location }) => (
              <div>
                <Route exact path="/" render={() => (
                  <Redirect to="/main" />
                )} />
                <div >
                  <ReactCSSTransitionGroup transitionName={Utils.selectAnimationClassForPage(this.props.changeAnimationState)}
                    transitionEnterTimeout={1250}
                    transitionLeaveTimeout={1250}>
                    <Route
                      location={location}
                      key={location.key}
                      path="/:name"
                      component={this.renderPage}
                    />
                  </ReactCSSTransitionGroup>
                </div>        
              </div>
            )} />
          </Router>
        </Provider>
      )
    } else {
      return (
        <Logon
          changeLogonStatus={this.changeLogonStatus}
          errorLogonStatus={this.state.errorLogonStatus}
          errorLogonText={this.state.errorLogonText}
        />
      )
    }
  }
}

export default connect((state) => ({
  changeAnimationState: state.changeAnimationState
}), {
  addOperationToList,
  addAccountToList
})(App)
