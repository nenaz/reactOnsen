import React, { Component } from 'react'
import './css/App.css'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import './css/ionicons.css'
import Section from './pageWidget'
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      // rightMenuOpen: false,
      isOpenPopover: false,
      isOpenLeftMenu: false
    }

    // this.rightMenu = this.rightMenu.bind(this)
    this.showPopover = this.showPopover.bind(this)
    this.hidePopover = this.hidePopover.bind(this)
    this.canselPopover = this.canselPopover.bind(this)
    this.getTarget = this.getTarget.bind(this)
    this.showLeftMenu = this.showLeftMenu.bind(this)
    this.hideLeftMenu = this.hideLeftMenu.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        render: true
      })
    }, 2000)
  }

  

  componentWillUnmount() {
    console.log('componentWillUnmount') 
  }

  // rightMenu() {
  //   this.setState({
  //     rightMenuOpen: !this.state.rightMenuOpen
  //   }) 
  // }

  getTarget() {
    return this.refs.button;
  }

  showPopover() {
    console.log('show')
    this.setState({ isOpenPopover: true });
  }

  hidePopover() {
    this.setState({ isOpenPopover: false });
  }

  canselPopover() {
    this.setState({ isOpenPopover: false });
  }

  showLeftMenu() {
    console.log('show')
    this.setState({ isOpenLeftMenu: true });
  }

  hideLeftMenu() {
    this.setState({ isOpenLeftMenu: false });
  }

  handleAddClick() {
    
  }

  render() {
    // if (this.state.render) {
      return (
        <Provider store={store}>
          <Router >
            <Route render={({ location }) => (
              <div>
                <Route exact path="/" render={() => (
                  <Redirect to="/main" />
                )} />
                <div >
                  <ReactCSSTransitionGroup transitionName={{
                    'enter': 'exp-enter',
                    'enterActive': 'exp-enter-active',
                    'leave': 'exp-leave',
                    'leaveActive': 'exp-leave-active',
                  }}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
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
            <div>
              <Ons.Page>
                <Ons.Popover
                  isOpen={this.state.isOpenPopover}
                  onOpen={this.showPopover}
                  onHide={this.hidePopover}
                  isCancelable={true}
                  onCancel={this.canselPopover}
                  getTarget={this.getTarget}
                  direction='down'
                >
                  <ons-list>
                    <ons-list-header>Settings</ons-list-header>
                    <ons-list-item>
                      <div className="center">
                        Enable cool feature
                        </div>
                      <div className="right">
                        <ons-switch checked></ons-switch>
                      </div>
                    </ons-list-item>
                    <ons-list-item>
                      <div className="center">
                        Enable even cooler feature
                        </div>
                      <div className="right">
                        <ons-switch></ons-switch>
                      </div>
                    </ons-list-item>
                    <ons-list-item>
                      <div className="center">
                        Enable amazing feature
                        </div>
                      <div className="right">
                        <ons-switch disabled></ons-switch>
                      </div>
                    </ons-list-item>
                  </ons-list>

                </Ons.Popover>
                <Ons.Splitter>
                  <Ons.SplitterSide
                    style={{
                      borderRight: '1px solid rgba(212, 215, 216, 0.1)'
                    }}
                    side='left'
                    width={200}
                    collapse={true}
                    swipeable={true}
                    isOpen={this.state.isOpenLeftMenu}
                    onClose={this.hideLeftMenu}
                    onOpen={this.showLeftMenu}
                  >
                    <Ons.Page>
                      <Ons.List
                        dataSource={['Profile', 'Followers', 'Settings']}
                        renderRow={(title) => (
                          <Ons.ListItem key={title} onClick={this.hideLeftMenu} tappable>{title}</Ons.ListItem>
                        )}
                      />
                    </Ons.Page>
                  </Ons.SplitterSide>
                  <Ons.SplitterContent>
                    <Ons.Page renderToolbar={this.renderToolbar}>
                      <ons-toolbar style={{
                        position: 'relative'
                      }}>
                        <div className="left">
                          <ons-toolbar-button onClick={this.showLeftMenu}>
                            <ons-icon icon="ion-android-menu, material:md-menu"></ons-icon>
                          </ons-toolbar-button>
                        </div>
                        <div className="center">Center</div>
                        <div className="right">
                          <ons-toolbar-button onClick={this.showPopover} ref='button'>
                            <ons-icon icon="ion-android-more-vertical"></ons-icon>
                          </ons-toolbar-button>
                        </div>
                      </ons-toolbar>

                      <Section name="AccountsList" />
                      <Section name="Balance" />

                    </Ons.Page>
                  </Ons.SplitterContent>
                </Ons.Splitter>
              </Ons.Page>
            </div>
          </Router>
        </Provider>
      )
  //   } else {
  //     return (
  //       <Loading />
  //     )
  //   }
  }
}

export default App
