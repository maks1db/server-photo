import { connect } from 'react-redux';
import { init as initAciton, getItems as getItemsAction } from '../actions/app';
import { selectItem as selectItemAction } from '../actions/item';
import React, { Component } from 'react';
import Preview from 'components/Render/Preview.jsx';

function mapStateToProps(state) {
    return {
        viewItems: state.app.viewItems,
        editItems: state.app.editItems,
        folder: {
            view: state.app.viewFolder,
            edit: state.app.editFolder
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        init: () => dispatch(initAciton()),
        selectItem: (type, name) =>
            dispatch(selectItemAction(`${type}Items`, name)),
        openFolder: (type, folder) => dispatch(getItemsAction(type, folder))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    componentDidMount() {
        const { init } = this.props;
        init();
    }

    onClickBack = type => {
        const { openFolder } = this.props;
        const folder = this.props.folder[type];

        const dirs = folder.split('/');
        const name = dirs.reduce((accum, d) => (d === '' ? accum : d), '');
        openFolder(type, folder.replace(RegExp(`${name}?\/`), ''));
    };

    render() {
        const { viewItems, editItems, selectItem, openFolder } = this.props;

        const params = {
            onSelectItem: selectItem,
            onOpenFolder: openFolder,
            onClickBack: this.onClickBack
        };

        return (
            <div className="row">
                <div className="col-md-6">
                    <Preview data={viewItems} type="view" {...params} />
                </div>
                <div className="col-md-6">
                    <Preview data={editItems} type="edit" {...params} />
                </div>
            </div>
        );
    }
}
