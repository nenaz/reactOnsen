import React,{ Component} from 'react'
import { 
    Page,
    Popover,
    List,
    ListHeader,
    ListItem,
    Switch,
    Splitter,
    SplitterContent,
    SplitterSide,
    Toolbar,
    ToolbarButton,
    Icon,
    Fab
} from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import Section from '../pageWidget'
import { Link } from 'react-router-dom'

class MainPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            isOpenPopover: false,
            isOpenLeftMenu: false
        }

        this.renderToolbar = this.renderToolbar.bind(this)
        this.showPopover = this.showPopover.bind(this)
        this.hidePopover = this.hidePopover.bind(this)
        this.canselPopover = this.canselPopover.bind(this)
        this.getTarget = this.getTarget.bind(this)
        this.showLeftMenu = this.showLeftMenu.bind(this)
        this.hideLeftMenu = this.hideLeftMenu.bind(this)
        this.handleAddOperationClick = this.handleAddOperationClick.bind(this)
    }

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

    handleAddOperationClick(e) {
        // this.props.changeAnimationState('')
    }

    renderToolbar() {
        return (
            <Toolbar style={{
                position: 'relative'
            }}>
                <div className="left">
                    <ToolbarButton onClick={this.showLeftMenu}>
                        <Icon icon="ion-android-menu, material:md-menu"></Icon>
                    </ToolbarButton>
                </div>
                <div className="center">Center</div>
                <div className="right">
                    <ToolbarButton onClick={this.showPopover} ref='button'>
                        <Icon icon="ion-android-more-vertical"></Icon>
                    </ToolbarButton>
                </div>
            </Toolbar>
        )
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Popover
                    isOpen={this.state.isOpenPopover}
                    onOpen={this.showPopover}
                    onHide={this.hidePopover}
                    isCancelable={true}
                    onCancel={this.canselPopover}
                    getTarget={this.getTarget}
                    direction='down'
                >
                    <List>
                        <ListHeader>Settings</ListHeader>
                        <ListItem>
                            <div className="center">
                                Enable cool feature
                                </div>
                            <div className="right">
                                <Switch checked></Switch>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                Enable even cooler feature
                                </div>
                            <div className="right">
                                <Switch></Switch>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div className="center">
                                Enable amazing feature
                                </div>
                            <div className="right">
                                <Switch disabled></Switch>
                            </div>
                        </ListItem>
                    </List>
                </Popover>
                <Splitter>
                    <SplitterSide
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
                        <Page>
                            <List 
                                dataSource={['Profile', 'Followers', 'Settings']}
                                renderRow={(title) => (
                                    <ListItem key={title} onClick={this.hideLeftMenu} tappable>{title}</ListItem>
                                )}
                            />
                        </Page>
                    </SplitterSide>
                    <SplitterContent>
                        <Page >
                            <Section name="AccountsList" />
                            <Section name="Balance" />
                            {/* <Section name="Chart" /> */}
                            <Section name="LastOperations" />

                        </Page>
                    </SplitterContent>
                </Splitter>
                <Fab position='bottom right'>
                    <Link to='/addOperation' style={{ textDecoration: 'none' }}>+</Link>
                </Fab>
            </Page>
        )
    }
}

export default MainPage