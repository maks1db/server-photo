import React from 'react';
import './buttons.scss';

export default ({
    type,
    haveSelected,
    onOpenFolder,
    selectedItem,
    onClickBack,
    rootPathActive,
    editRootPathActive
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
            >
                    Переименовать
            </button>
        )}
        {type === 'edit' &&
            !rootPathActive && (
            <button type="button" className="btn btn-warning">
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
