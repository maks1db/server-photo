import React from 'react';
import './buttons.scss';

export default ({
    previewName,
    haveSelected,
    onOpenFolder,
    selectedItem,
    onClickBack,
    rootPathActive,
    editRootPathActive,
    onCopyItems,
    onDeleteItem,
    openEditor,
    onChangeImgViewState
}) => (
    <div className="btns">
        <button
            type="button"
            disabled={!haveSelected}
            className="btn btn-success"
            onClick={() => {
                selectedItem.itFolder
                    ? onOpenFolder(previewName, selectedItem.path)
                    : onChangeImgViewState(
                        true,
                        selectedItem.name,
                        previewName
                    );
            }}
        >
            Открыть
        </button>
        {previewName === 'view' &&
            !rootPathActive &&
            !editRootPathActive && (
            <button
                type="button"
                className="btn btn-info"
                disabled={!haveSelected}
                onClick={() => onCopyItems(false)}
            >
                    Копировать
            </button>
        )}
        {previewName === 'view' &&
            !rootPathActive &&
            !editRootPathActive && (
            <button
                type="button"
                className="btn btn-warning"
                disabled={!haveSelected}
                onClick={() => onCopyItems(true)}
            >
                    Переместить
            </button>
        )}
        {previewName === 'edit' &&
            !rootPathActive && (
            <button
                type="button"
                className="btn btn-warning"
                disabled={!haveSelected}
                onClick={() => openEditor('editShow')}
            >
                    Переименовать
            </button>
        )}
        {previewName === 'edit' &&
            !rootPathActive && (
            <button
                type="button"
                className="btn btn-warning"
                onClick={() => openEditor('createShow')}
            >
                <i className="fa fa-plus" />
            </button>
        )}
        {previewName === 'edit' &&
            !rootPathActive && (
            <button
                type="button"
                className="btn btn-danger"
                disabled={!haveSelected}
                onClick={() => onDeleteItem()}
            >
                <i className="fa fa-times" />
            </button>
        )}
        {!rootPathActive && (
            <button
                type="button"
                className="btn btn-outline-secondary btns-btn__right"
                onClick={() => onClickBack(previewName)}
            >
                Назад
            </button>
        )}
    </div>
);
