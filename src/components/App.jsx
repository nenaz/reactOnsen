import React, { Component } from 'react'
import './css/App.css'
import * as Ons from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import './css/ionicons.css'
import ButtonAccount from './Button'
import Utils from '../js/utils'

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
    if (this.state.render) {
      return (
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
                  <section style={{ margin: '8px' }}>
                    <div style={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0'
                    }}>
                      <div style={{ margin: '8px' }}  >
                        <span style={{
                          margin: '5px',
                          display: 'inline-block',
                          fontSize: '13px',
                          width: '100%',
                          marginBottom: '10px',
                          marginTop: '0'
                        }}>Список счетов</span>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between'
                        }}>
                          <ButtonAccount params={Utils.selectButtonsParams()}/>
                          <ButtonAccount params={Utils.selectButtonsParams('AccountsButtonAdd')}/>
                          <ButtonAccount params={Utils.selectButtonsParams('AccountButton')}/>
                          <ButtonAccount params={Utils.selectButtonsParams('AccountButton')}/>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section style={{ margin: '16px' }}>
                    <div style={{
                      height: '200px',
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0'
                    }}></div>
                  </section>
                  <ons-fab style={{
                    position: 'absolute',
                    top: '85%',
                    left: '85%'
                  }} onClick={this.handleAddClick}>
                    <ons-icon icon="md-plus"></ons-icon>
                  </ons-fab>
                </Ons.Page>
              </Ons.SplitterContent>
            </Ons.Splitter>
          </Ons.Page>
        </div>
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
            }}></span>
          </div>
        </Ons.Page>
      )
    }
  }
}

export default App
