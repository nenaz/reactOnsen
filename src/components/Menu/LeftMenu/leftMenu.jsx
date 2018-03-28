import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    List,
    ListItem
} from 'react-onsenui'

class LeftMenu extends Component{
    constructor(props){
        super(props)
        this.state ={}
        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(row, index) {
        switch (row.name) {
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
            default: return (<ListItem key={row.name} onClick={this.props.handleSelectLeftMenuItem} tappable>{row.text}</ListItem>)
        }
    }

    render(){
        return (
            <Page>
                <List
                    dataSource={[
                        { name: 'report', text: 'Отчет' },
                        { name: 'operations', text: 'Операции' },
                        { name: 'download', text: 'Скачать PDF' },
                        { name: 'options', text: 'Настройки', onClick: () => { this.props.pushPage('options') } },
                        // { name: 'about', text: 'О программе', onClick: this.handleModalOpen },
                        { name: 'exit', text: 'Выход' },
                    ]}
                    renderRow={this.renderRow}
                />
            </Page>
        )
    }
}

LeftMenu.propTypes = {
    pushPage: PropTypes.func.isRequired,
    handleSelectLeftMenuItem: PropTypes.func.isRequired,
}

export default LeftMenu