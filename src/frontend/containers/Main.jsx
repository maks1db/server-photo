import { connect } from 'react-redux';
import {
    init as initAciton,
    getItems as getItemsAction,
    goRoot as goRootAction
} from '../actions/app';
import { selectItem as selectItemAction } from '../actions/item';
import React, { Component } from 'react';
import Preview from 'components/Render/Preview.jsx';

const inRoot = rootFolders => folder =>
    rootFolders.reduce((acum, x) => {
        return !acum ? folder.indexOf(x.path) >= 0 : acum;
    }, false);

function mapStateToProps(state) {
    return {
        viewItems: state.app.viewItems,
        editItems: state.app.editItems,
        folder: {
            view: state.app.viewFolder,
            edit: state.app.editFolder,
            root: state.app.root
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        init: () => dispatch(initAciton()),
        selectItem: (type, name) =>
            dispatch(selectItemAction(`${type}Items`, name)),
        openFolder: (type, folder) => dispatch(getItemsAction(type, folder)),
        goRoot: type => dispatch(goRootAction(type))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    componentDidMount() {
        const { init } = this.props;
        init();
    }

    onClickBack = name => {
        const { openFolder, goRoot } = this.props;
        const folder = this.props.folder[name];
        const root = this.props.folder.root;

        const result =
            folder.split('/')
            |> (_ => _.reduce((accum, dir) => (dir === '' ? accum : dir), ''))
            |> (_ => folder.replace(RegExp(`${_}\/?`), ''));

        result
            |> inRoot(root)
            |> (_ => (_ ? openFolder(name, result) : goRoot(name)));
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
