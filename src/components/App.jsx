import React, { Component } from 'react'
import logo from '../logo.svg'
import './css/App.css'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      // progress: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        render: true
      })
    }, 5000)
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Progress</div>
      </Ons.Toolbar>
    )
  }

  componentWillUnmount() {

  }

  render() {
    if (this.state.render) {
      return (
        <Ons.Page>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </Ons.Page>
      )
    } else {
      return (
        <Ons.Page>
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 16px)',
            left: 'calc(50% - 16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Ons.ProgressCircular indeterminate />
            <span style={{
              color: '#0076ff'
            }}>Loding ...</span>
          </div>
        </Ons.Page>
      )
    }
  }

}

export default App
