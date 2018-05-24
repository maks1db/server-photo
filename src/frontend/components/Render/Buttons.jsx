import React from 'react';
import './buttons.scss';

export default ({
    type,
    haveSelected,
    onOpenFolder,
    selectedItem,
    onClickBack
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
        {type === 'view' && (
            <button
                type="button"
                className="btn btn-info"
                disabled={!haveSelected}
            >
                Копировать
            </button>
        )}
        {type === 'edit' && (
            <button
                type="button"
                className="btn btn-warning"
                disabled={!haveSelected}
            >
                Переименовать
            </button>
        )}
        <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => onClickBack(type)}
        >
            Назад
        </button>
    </div>
);
