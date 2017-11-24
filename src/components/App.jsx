import React, { Component } from 'react'
import '../css/App.css'
import '../css/ionicons.css'
import Loading from './Loading'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import store from '../store'
import { Provider } from 'react-redux'
import AddAccount from './addAccount'
import MainPage from './mainPage'
import Utils from '../js/utils'
import { connect } from 'react-redux'
import { changeAnimationState } from '../AC'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false
    }

    this.renderPage = this.renderPage.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        render: true
      })
    }, 2000)
  }

  renderPage({ match: { params } }) {
    switch (params.name) {
      case 'addAccount': return <AddAccount />
      // case 'final': return <Page3 />
      default: return <MainPage />
    }
  }

  render() {
    console.log(this.props.changeAnimationState)
    if (this.state.render) {
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
                    transitionEnterTimeout={650}
                    transitionLeaveTimeout={650}>
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
        <Loading />
      )
    }
  }
}

export default connect((state => ({
  changeAnimationState: state.changeAnimationState
})))(App)
