import React,{ Component} from 'react'
import PropTypes from 'prop-types'
import {
    List,
    ListHeader,
    ListItem,
    Page,
} from 'react-onsenui'
import ToolbarCustom from '../../ToolbarCustom'
import { DATAICONS } from '../../../js/consts'

class About extends Component{
    constructor(props){
        super(props)
        this.state ={
            iconsMadeByText: 'Icons made by ',
            fromText: " from ",
            isLicensedByText: " is licensed by ",
            CCText: "CC 3.0 BY",
        }

        this.renderToolbar = this.renderToolbar.bind(this)
        this.handlerCanselClick = this.handlerCanselClick.bind(this)
        this.renderRow = this.renderRow.bind(this)
    }

    renderToolbar() {
        return (
            <ToolbarCustom
                hasBackButton={this.props.route.hasBackButton}
                title="О программе"
                handlerCanselClick={this.handlerCanselClick}
            />
        )
    }

    handlerCanselClick() {
        this.props.navigator.popPage();
    }

    renderRow(row, index) {
        return (
            <ListItem key={index}>
                <div className='left'></div>
                <div className='center'>
                    <div>{this.state.iconsMadeByText}
                        <a href={row.href1} title={row.title1}>{row.title1}</a>{this.state.fromText}
                        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>{this.state.isLicensedByText}
                        <a href="http://creativecommons.org/licenses/by/3.0/"
                            title="Creative Commons BY 3.0"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{this.state.CCText}</a>
                    </div>
                </div>
            </ListItem>
        );
    }

    render(){
        return (
            <Page renderToolbar={this.renderToolbar}>
                <List
                    dataSource={DATAICONS}
                    renderRow={this.renderRow}
                    renderHeader={() => <ListHeader>icons creators</ListHeader>}
                />
            </Page>
        )
    }
}

About.propTypes = {
    route: PropTypes.object,
    navigator: PropTypes.any,
}

export default About