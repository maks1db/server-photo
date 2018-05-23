import { setTitle as setTitleAction } from '../actions/app.js';
import {
    getItems as getItemsAction,
    changePagination as changePaginationAction
} from '../actions/table';
import { connect } from 'react-redux';
const R = require('ramda');
import React, { Component } from 'react';
import Table from '../components/Table/Table.jsx';
import BtnNewItem from '../components/Table/BtnNewItem.jsx';
import { push } from 'react-router-redux';

function mapStateToProps(state) {
    return {
        items: state.table.items,
        pagination: state.table.pagination
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setTitle: title => title |> setTitleAction |> dispatch,
        getItems: pagination => {
            getItemsAction('books', pagination) |> dispatch;
        },
        changePagination: (key, value) =>
            changePaginationAction(key, value) |> dispatch,
        onChangeRoute: route => route |> push |> dispatch,
        onRowClick: id => push(`/edit/books/${id}`) |> dispatch
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Books extends Component {
    componentDidMount() {
        const { setTitle, getItems, pagination } = this.props;

        setTitle('Цены на книги');
        getItems(pagination);
    }

    onChangePagination = (key, value) => {
        const { changePagination, pagination, getItems } = this.props;
        changePagination(key, value);
        getItems(pagination);
    };

    render() {
        const {
            items,
            changePagination,
            pagination,
            onChangeRoute,
            onRowClick
        } = this.props;
        return [
            <div></div>
        ];
    }
}
