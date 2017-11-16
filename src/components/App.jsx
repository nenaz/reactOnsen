import React, { Component } from 'react'
import './css/App.css'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import RightMenu from './RightMenu'

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

  rightMenu() {
    return <RightMenu />
  }

  render() {
    if (this.state.render) {
      return (
        <Ons.Page>
          <div className="toolbar">
            <div className="toolbar__left">
              <span className="toolbar-button">
                <i className="ion-navicon" style={{
                  fontSize: '32px',
                  verticalAlign: '-6px'
                  }}></i>
              </span>
            </div>
            <div className="toolbar__center">
              Обзор
            </div>
            <div className="toolbar__right">
              <span className="toolbar-button toolbar-button--material" onClick={this.rightMenu}>
                <i className="zmdi zmdi-more-vert"></i>
              </span>
            </div>
          </div>
        </Ons.Page>
      )
    } else {
      return (
        <Ons.Page>
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 25px)',
            left: 'calc(50% - 25px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Ons.ProgressCircular indeterminate />
            <span style={{
              color: '#0076ff'
            }}>loading ...</span>
          </div>
        </Ons.Page>
      )
    }
  }
}

export default App
