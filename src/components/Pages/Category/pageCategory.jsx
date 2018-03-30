import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Page,
    List,
    ListItem,
    Modal,
} from 'react-onsenui'
import Title from "../../Title";
import { LISTCATEGORY } from '../../../js/consts'
import PageSubCategory from './pageSubCategory'
import { connect } from 'react-redux'
import Utils from '../../../js/utils'

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
        this.getTopCategory = this.getTopCategory.bind(this)
    }

    renderRowTopCategory(row) {
        return (
            <ListItem
                key={row.value}
                style={{
                    borderBottom: '1px solid #eceff1'
                }}
                tappable
                onClick={this.props.handleSelectCategoty}
                id={row.value}
            >
                <span>{row.title}</span>
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
        if (this.state.subcategory.data) {
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
        return false;
    }

    setValue(value, name) {
        if (name) {
            this.setState({
                [name]: value
            })
        }
    }

    getTopCategory() {
        return Utils.createTopCategory(this.props.topOperations)
    }

    render() {
        const data = Utils.createTopCategorys(LISTCATEGORY)
        return (
            <Page className="nzPageCategory"
                renderModal={this.renderModal}
            >
                <section className="nzTopCategory">
                    <Title title="Частые категории"/>
                    <List
                        dataSource={data}
                        renderRow={this.renderRowTopCategory}
                    />
                </section>
                <section className="nzAllCategory">
                    <Title title="Категории"/>
                    <List
                        dataSource={LISTCATEGORY}
                        renderRow={this.renderRowCategory}
                        style={{
                            minHeight: '52vh',
                            overflowY: 'scroll'
                        }}
                    />
                </section>
            </Page>
        )
    }
}

PageCategory.propTypes = {
    handleSelectCategoty: PropTypes.func,
}

export default connect((state) => ({
    topOperations: state.changeCategoryStatistic
}))(PageCategory)
