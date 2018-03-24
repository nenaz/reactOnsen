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
    Modal,
    Fab,
    Button
} from 'react-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import Section from '../pageWidget'
import { Link } from 'react-router-dom'
import About from '../About'
import Icon from '../Icon';
import { ICONPLUS, ICONMENU } from '../../js/consts';

class MainPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            isOpenPopover: false,
            isOpenLeftMenu: false,
            modalOpen: false
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
        this.renderRow = this.renderRow.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.pushPage = this.pushPage.bind(this)

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
                <div className="right" />
            </Toolbar>
        )
    }

    handleSelectLeftMenuItem(e) {
        console.log(e.target.value)
        this.hideLeftMenu()
    }

    renderRow(row, index) {
        switch(row.name) {
            // case 'exit':
            //     return (
            //         <ListItem key={row.name}>
            //             <Link
            //                 to='/logon'
            //                 style={{
            //                     textDecoration: 'none',
            //                 }}
            //                 onClick={this.props.changeLogonStatus}
            //             >
            //                 {row.text}
            //             </Link>
            //         </ListItem>
            //     )
            case 'about': 
                return (
                    <ListItem
                        key={row.name}
                        onClick={row.onClick}
                    >
                        {row.text}
                    </ListItem>
                )
            case 'options': 
                return (
                    <ListItem
                        key={row.name}
                        onClick={row.onClick}
                    >
                        {row.text}
                    </ListItem>
                )
            // case 'download':
            //     return (
            //         <ListItem key={row.name}>
            //             <Link to={'/download'} style={{
            //                 textDecoration: 'none',
            //                 color: '#250606'
            //             }}>
            //                 {row.text}
            //             </Link>
            //         </ListItem>
            //     )
            default: return(<ListItem key={row.name} onClick={this.handleSelectLeftMenuItem} tappable>{row.text}</ListItem>)
        }
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

    render(){
        return (
            <Page
                className="nzPage"
                renderToolbar={this.renderToolbar}
                renderModal={() => (
                    <Modal
                        isOpen={this.state.modalOpen}
                    >
                        <About handleModalClose={this.handleModalClose}/>
                    </Modal>
                )}
            >
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
                                dataSource={[
                                    { name: 'report', text: 'Отчет' },
                                    { name: 'operations', text: 'Операции' },
                                    { name: 'download', text: 'Скачать PDF' },
                                    { name: 'options', text: 'Настройки', onClick: () => {this.pushPage('options')}},
                                    { name: 'about', text: 'О программе', onClick: this.handleModalOpen },
                                    { name: 'exit', text: 'Выход' },
                                ]}
                                renderRow={this.renderRow}
                            />
                        </Page>
                    </SplitterSide>
                    <SplitterContent>
                        <Page >
                            <Section
                                name="AccountsList"
                                pushPage={this.pushPage}
                            />
                            <Section name="Balance" />
                            {/* <Section name="Chart" /> */}
                            <Section name="LastOperations" />
                        </Page>
                    </SplitterContent>
                </Splitter>
                <Fab position='bottom right' onClick={() => {
                    this.pushPage('addOperation')
                }}>
                    <span className="icon-plus"
                        style={{
                            lineHeight: '56px'
                        }}
                    />
                </Fab>
            </Page>
        )
    }
}

export default MainPage