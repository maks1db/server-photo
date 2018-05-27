import { connect } from 'react-redux';
import {
    init as initAciton,
    getItems as getItemsAction,
    goRoot as goRootAction,
    copyItems as copyItemsAction,
    createFolder as createFolderAction,
    renameItem as renameItemAction
} from '../actions/app';
import { selectItem as selectItemAction } from '../actions/item';
import React, { Component } from 'react';
import Preview from 'Render/Preview.jsx';
import ModalEdit from 'Common/Modal.jsx';
import ModalCreate from 'Common/Modal.jsx';
import { SELECTION_SET } from 'graphql/language/kinds';
const R = require('ramda');

const inRoot = rootFolders => folder =>
    rootFolders.reduce((acum, x) => {
        return !acum ? folder.indexOf(x.path) >= 0 : acum;
    }, false);

function mapStateToProps(state) {
    return {
        viewItems: state.app.viewItems,
        editItems: state.app.editItems,
        folders: {
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
        goRoot: type => dispatch(goRootAction(type)),
        copyItems: (files, folder) => dispatch(copyItemsAction(files, folder)),
        createFolder: (folder, name) =>
            dispatch(createFolderAction(folder, name)),
        renameItem: (file, name) => dispatch(renameItemAction(file, name))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            editShow: false,
            createShow: false
        };
    }

    onChangeViewModal = (name, value = true) => {
        this.setState({ [name]: value });
    };

    componentDidMount() {
        const { init } = this.props;
        init();
    }

    onCopyItems = () => {
        const {
            viewItems,
            copyItems,
            folders: { edit }
        } = this.props;
        const selectedItems = viewItems
            .filter(x => x.selected)
            .map(x => x.path);

        copyItems(selectedItems, edit);
    };

    onClickBack = name => {
        const { openFolder, goRoot } = this.props;
        const folder = this.props.folders[name];
        const root = this.props.folders.root;

        const result =
            folder.split('/')
            |> (_ => _.reduce((accum, dir) => (dir === '' ? accum : dir), ''))
            |> (_ => folder.replace(RegExp(`${_}\/?`), ''));

        result
            |> inRoot(root)
            |> (_ => (_ ? openFolder(name, result) : goRoot(name)));
    };

    render() {
        const {
            viewItems,
            editItems,
            selectItem,
            openFolder,
            folders: { view, edit },
            createFolder,
            renameItem
        } = this.props;

        const { editShow, createShow } = this.state;
        const selectedItem = editItems.reduce(
            (accum, x) => (x.selected ? x : accum),
            {}
        );

        const params = {
            onSelectItem: selectItem,
            onOpenFolder: openFolder,
            onClickBack: this.onClickBack,
            onCopyItems: this.onCopyItems,
            openEditor: this.onChangeViewModal
        };

        return (
            <div className="row">
                {editShow && (
                    <ModalEdit
                        title="Редактирование элемента"
                        btnName="Применить"
                        onSave={renameItem}
                        onChangeView={this.onChangeViewModal}
                        mainValue={selectedItem.path}
                        defaultValue={
                            selectedItem && selectedItem.name.split('.')[0]
                        }
                        modalType={'edit'}
                    />
                )}
                {createShow && (
                    <ModalCreate
                        title="Новая папка"
                        btnName="Создать"
                        onSave={createFolder}
                        onChangeView={this.onChangeViewModal}
                        mainValue={edit}
                        modalType={'create'}
                    />
                )}
                <div className="col-md-6">
                    <Preview
                        data={viewItems}
                        type="view"
                        {...params}
                        rootPathActive={view === ''}
                        editRootPathActive={edit === ''}
                    />
                </div>
                <div className="col-md-6">
                    <Preview
                        data={editItems}
                        type="edit"
                        {...params}
                        rootPathActive={edit === ''}
                    />
                </div>
            </div>
        );
    }
}
