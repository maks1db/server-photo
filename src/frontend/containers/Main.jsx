import { connect } from 'react-redux';
import {
    init as initAciton,
    getItems as getItemsAction,
    goRoot as goRootAction,
    copyItems as copyItemsAction,
    createFolder as createFolderAction,
    renameItem as renameItemAction,
    deleteItem as deleteItemAction,
    moveItems as moveItemsAction
} from '../actions/app';
import { selectItem as selectItemAction } from '../actions/item';
import React, { Component } from 'react';
import Preview from 'Render/Preview.jsx';
import ModalEdit from 'Common/Modal.jsx';
import ModalCreate from 'Common/Modal.jsx';
import { toastr } from 'react-redux-toastr';
import ImgView from 'Common/ImgView.jsx';
import { itemSrc } from 'Render/Item.jsx';
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
        selectItem: (previewName, name) =>
            dispatch(selectItemAction(`${previewName}Items`, name)),
        openFolder: (previewName, folder) =>
            dispatch(getItemsAction(previewName, folder)),
        goRoot: previewName => dispatch(goRootAction(previewName)),
        copyItems: (files, folder) => dispatch(copyItemsAction(files, folder)),
        moveItems: (files, folder) => dispatch(moveItemsAction(files, folder)),
        createFolder: (folder, name) =>
            dispatch(createFolderAction(folder, name)),
        renameItem: (file, name, oldName) => {
            dispatch(renameItemAction(file, name, oldName));
        },
        deleteItem: file => {
            dispatch(deleteItemAction(file));
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            editShow: false,
            createShow: false,
            imgView: {
                open: false,
                name: '',
                previewName: ''
            }
        };
    }

    onChangeImgViewState = (open, name = '', previewName = '') => {
        this.setState({
            imgView: {
                open,
                name,
                previewName
            }
        });
    };

    onChangeViewModal = (name, value = true) => {
        this.setState({ [name]: value });
    };

    componentDidMount() {
        const { init } = this.props;
        init();
    }

    onCopyItems = (move = false) => {
        const {
            viewItems,
            copyItems,
            moveItems,
            folders: { edit }
        } = this.props;
        const selectedItems = viewItems
            .filter(x => x.selected)
            .map(x => x.path);

        move ? moveItems(selectedItems, edit) : copyItems(selectedItems, edit);
    };

    onDeleteItem = () => {
        const { editItems, deleteItem } = this.props;

        const selectedItem = editItems.reduce(
            (accum, x) => (x.selected ? x : accum),
            {}
        );
        const toastrConfirmOptions = {
            onOk: () => deleteItem(selectedItem.path),
            okText: 'Удалить',
            cancelText: 'Отмена'
        };
        toastr.confirm(
            `Удалить файл "${selectedItem.name}"`,
            toastrConfirmOptions
        );
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

        const {
            imgView: { open, name, previewName },
            editShow,
            createShow
        } = this.state;

        const selectedItem = editItems.reduce(
            (accum, x) => (x.selected ? x : accum),
            {}
        );

        const params = {
            onSelectItem: selectItem,
            onOpenFolder: openFolder,
            onClickBack: this.onClickBack,
            onCopyItems: this.onCopyItems,
            openEditor: this.onChangeViewModal,
            onDeleteItem: this.onDeleteItem,
            onChangeImgViewState: this.onChangeImgViewState
        };

        return (
            <div className="row">
                {open && (
                    <ImgView
                        items={this.props[`${previewName}Items`]
                            .filter(x => !x.itFolder)
                            .map(x =>
                                R.assoc('url', itemSrc(x.path, 'preview'), x)
                            )}
                        activeIndex={this.props[`${previewName}Items`]
                            .filter(x => !x.itFolder)
                            .findIndex(x => x.name === name)}
                        onSetModal={this.onChangeImgViewState}
                    />
                )}
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
                        previewName="view"
                        {...params}
                        rootPathActive={view === ''}
                        editRootPathActive={edit === ''}
                        folder={view}
                    />
                </div>
                <div className="col-md-6">
                    <Preview
                        data={editItems}
                        previewName="edit"
                        {...params}
                        rootPathActive={edit === ''}
                        folder={edit}
                    />
                </div>
            </div>
        );
    }
}
