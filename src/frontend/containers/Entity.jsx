import { setTitle as setTitleAction } from '../actions/app.js';
import { connect } from 'react-redux';
import {
    getItem as getItemAction,
    saveItem as saveItemAction
} from '../actions/item';
const R = require('ramda');
import runIf from '../../helpers/logic/runIf';
import React, { Component } from 'react';
import Form from 'Entity/Form.jsx';
import BtnSave from 'Entity/BtnSave.jsx';

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        setTitle: title => title |> setTitleAction |> dispatch,
        saveItem: obj => obj |> saveItemAction |> dispatch,
        getItem: id => id |> getItemAction |> dispatch
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Entity extends Component {
    componentDidMount() {
        const { match, setTitle, getItem } = this.props;

        if (match.params.id === 'new') {
            switch (match.params.type) {
            case 'books':
                setTitle('Новая книга');
                break;
            case 'item':
                setTitle('Новый товар');
                break;
            }
        } else {
            getItem(match.params.id);
        }
    }

    onSave = async obj => {
        const { saveItem, match } = this.props;
        const runIfHaveId = runIf(match.params.id !== 'new');

        const res = await (obj
            |> R.assoc('itemType', match.params.type)
            |> runIfHaveId(R.assoc('itemType', match.params.id))
            |> saveItem);
        console.log(res);
    };

    render() {
        return [
            <Form key="form" onSubmit={this.onSave}>
                <BtnSave />
            </Form>
        ];
    }
}
