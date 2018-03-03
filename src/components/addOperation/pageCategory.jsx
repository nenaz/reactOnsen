import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    List,
    ListItem,
    Modal,
    Button
} from 'react-onsenui'
import Title from "../Title";
import { LISTCATEGORY } from '../../js/consts'
import PageSubCategory from './pageSubCategory'

class PageCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogShown: false,
            subcategory: [],
            modalOpen: false,
        }

        this.renderRowCategory = this.renderRowCategory.bind(this)
        this.renderRowTopCategory = this.renderRowTopCategory.bind(this)
        this.showSubCategory = this.showSubCategory.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    renderRowTopCategory(row) {
        return (
            <ListItem
                key={row}
                style={{
                    borderBottom: '1px solid #eceff1'
                }}
                tappable
            >
                <span>{row}</span>
            </ListItem>
        )
    }

    renderRowCategory(row) {
        return (
            <ListItem
                key={row.value}
                style={{
                    borderBottom: '1px solid #eceff1',
                }}
                tappable
                onClick={this.showSubCategory}
                id={row.value}
            >
                <span>{row.title}</span>
            </ListItem>
        )
    }

    showSubCategory(e) {
        console.log(LISTCATEGORY[e.currentTarget.id])
        this.setState({
            subcategory: LISTCATEGORY[e.currentTarget.id],
            modalOpen: true
        });
    }

    handleSelectSubCategory(e) {
        this.setState({
            modalOpen: false,
        })
    }

    renderModal() {
        return (
            <Modal isOpen={this.state.modalOpen}>
                <PageSubCategory
                    dataSource={this.state.subcategory}
                    handleHideModal={this.setValue}
                    handleSelectCategoty={this.props.handleSelectCategoty}
                />
            </Modal>
        )
    }

    setValue(value, name) {
        if (name) {
            this.setState({
                [name]: value
            })
        }
    }

    render() {
        return (
            <Page className="test"
                renderModal={this.renderModal}
            >
                <section>
                    <Title title="Частые категории"/>
                    <List
                        dataSource={[1,2,3,4]}
                        renderRow={this.renderRowTopCategory}
                    />
                </section>
                <section>
                    <Title title="Категории"/>
                    <List
                        dataSource={LISTCATEGORY}
                        renderRow={this.renderRowCategory}
                        style={{
                            height: '59vh',
                            overflowY: 'scroll'
                        }}
                    />
                </section>
            </Page>
        )
    }
}

export default PageCategory

PageCategory.propTypes = {
    handleSelectCategoty: PropTypes.func,
}