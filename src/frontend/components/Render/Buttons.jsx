import React from 'react';
import './buttons.scss';

export default ({
    type,
    haveSelected,
    onOpenFolder,
    selectedItem,
    onClickBack,
    rootPathActive,
    editRootPathActive,
    onCopyItems,
    openEditor
}) => (
    <div className="btns">
        <button
            type="button"
            disabled={!haveSelected}
            className="btn btn-success"
            onClick={() => {
                selectedItem.itFolder
                    ? onOpenFolder(type, selectedItem.path)
                    : false;
            }}
        >
            Открыть
        </button>
        {type === 'view' &&
            !rootPathActive &&
            !editRootPathActive && (
            <button
                type="button"
                className="btn btn-info"
                disabled={!haveSelected}
                onClick={onCopyItems}
            >
                    Копировать
            </button>
        )}

        {type === 'edit' &&
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
        {type === 'edit' &&
            !rootPathActive && (
            <button
                type="button"
                className="btn btn-warning"
                onClick={() => openEditor('createShow')}
            >
                <i className="fa fa-plus" />
            </button>
        )}
        {!rootPathActive && (
            <button
                type="button"
                className="btn btn-outline-secondary btns-btn__right"
                onClick={() => onClickBack(type)}
            >
                Назад
            </button>
        )}
    </div>
);
