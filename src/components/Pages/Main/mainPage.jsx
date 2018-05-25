import React,{ Component} from 'react'
import PropTypes from 'prop-types'
import { 
    Page,
    Splitter,
    SplitterContent,
    SplitterSide,
    Toolbar,
    ToolbarButton,
    Modal,
    SpeedDial,
    SpeedDialItem,
    Fab,
} from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import Section from '../pageWidget'
import WhatsNew from '../WhatsNew'
import Icon from '../../Icon';
import { ICONMENU } from '../../../js/consts';
import LeftMenu from '../../Menu/LeftMenu'
import { connect } from 'react-redux'

class MainPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            isOpenPopover: false,
            isOpenLeftMenu: false,
            modalOpen: false,
            showAboutComponent: true,
        }

        this.renderToolbar = this.renderToolbar.bind(this)
        this.showPopover = this.showPopover.bind(this)
        this.hidePopover = this.hidePopover.bind(this)
        this.canselPopover = this.canselPopover.bind(this)
        this.getTarget = this.getTarget.bind(this)
        this.showLeftMenu = this.showLeftMenu.bind(this)
        this.hideLeftMenu = this.hideLeftMenu.bind(this)
        this.handleAddOperationClick = this.handleAddOperationClick.bind(this)
        this.handleSelectLeftMenuItem = this.handleSelectLeftMenuItem.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.pushPage = this.pushPage.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.handlerNotification = this.handlerNotification.bind(this)
        this.closeApp = this.closeApp.bind(this)
        this.renderFixed = this.renderFixed.bind(this)

        this.count = 0
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
                        <Icon iconBase64={ICONMENU} styleObj={{
                            width: '25px',
                            top: '10%',
                            position: 'relative'
                        }} />
                    </ToolbarButton>
                </div>
                <div className="center">Текущее состояние</div>
                <div className="right">
                    {this.props.newFunctions.show &&
                        <div
                            className="ion-android-alert nzNotification"
                            onClick={this.handlerNotification}
                        />
                    }
                </div>
            </Toolbar>
        )
    }

    handleSelectLeftMenuItem(e) {
        this.hideLeftMenu()
    }

    handleModalOpen() {
        this.setState({ modalOpen: true })
        this.hideLeftMenu()
    }

    handleModalClose() {
        this.setState({ modalOpen: false })
    }

    pushPage(name = 'main') {
        this.props.navigator.pushPage({
            title: name,
            hasBackButton: true
        });

        this.count += 1
    }

    handlerNotification() {
        this.setState({
            modalOpen: true,
            showAboutComponent: false
        })
    }

    closeApp() {
        navigator.app.exitApp()
    }

    renderModal() {
        // return (
        //     <Modal isOpen={this.state.modalOpen} >
        //         <About handleModalClose={this.handleModalClose} />
        //     </Modal>
        // )
    }

    renderFixed() {
        return (
            <SpeedDial position='bottom right'>
                <Fab
                    position='bottom right'
                >
                    <span className="icon-plus2"
                        style={{
                            lineHeight: '56px'
                        }}
                    />
                </Fab>
                <SpeedDialItem
                    onClick={() => {
                        this.pushPage('addOperation')
                    }}
                >
                    <span className="icon-plus2"
                        style={{
                            lineHeight: '56px'
                        }}
                    />
                </SpeedDialItem>
                <SpeedDialItem>
                    <span className="icon-qr-code-scan" />
                </SpeedDialItem>
            </SpeedDial>
        );
    }

    render(){
        return (
            <Page
                className="nzPage"
                renderToolbar={this.renderToolbar}
                renderModal={this.renderModal}
                // renderFixed={this.renderFixed}
            >
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
                        <LeftMenu
                            pushPage={this.pushPage}
                            handleSelectLeftMenuItem={this.handleSelectLeftMenuItem}
                            closeApp={this.closeApp}
                        />
                    </SplitterSide>
                    <SplitterContent>
                        <Page >
                            <Section
                                name="AccountsList"
                                pushPage={this.pushPage}
                            />
                            <Section name="Balance" />
                            <Section name="Chart" />
                            <Section name="LastOperations" />
                        </Page>
                    </SplitterContent>
                </Splitter>
                {/* {this.props.accountsLength && <Fab
                    position='bottom right'
                    onClick={() => {
                        this.pushPage('addOperation')
                    }}
                >
                    <span className="icon-plus2"
                        style={{
                            lineHeight: '56px'
                        }}
                    />
                </Fab>} */}
                {this.props.accountsLength && <SpeedDial position='bottom right' className="nzSpeedDial">
                    <Fab
                        position='bottom right'
                        style={{
                            bottom: '0px',
                            right: '0px',
                        }}
                    >
                        <span className="icon-plus2"
                            style={{
                                lineHeight: '56px'
                            }}
                        />
                    </Fab>
                    <SpeedDialItem
                        onClick={() => {
                            this.pushPage('addOperation')
                        }}
                    >
                        <span className="icon-plus2"
                            style={{
                                lineHeight: '40px'
                            }}
                        />
                    </SpeedDialItem>
                    <SpeedDialItem>
                        <span className="icon-qr-code-scan"
                            style={{
                                lineHeight: '40px'
                            }}
                        />
                    </SpeedDialItem>
                </SpeedDial>}
                
                <Modal isOpen={this.state.modalOpen} >
                    <WhatsNew handleModalClose={this.handleModalClose} />
                </Modal>
            </Page>
        )
    }
}

MainPage.propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
}

export default connect((state) => ({
    newFunctions: state.updateNewFunctions,
    accountsLength: state.changeAccountsList.length,
}))(MainPage)