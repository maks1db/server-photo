/*global process */
import React, { PureComponent } from 'react';
import classname from 'helpers/components/classname';
import format from 'date-format';
import './item.scss';

const img = {
    folder: '/assets/images/folder.png',
    file: '/assets/images/file.png'
};

export const itemSrc = (path, src = 'small') =>
    `${
        process.env.DEV ? 'http://localhost:4100' : ''
    }/img/file?path=${path}&src=${src}`;

export default class Item extends PureComponent {
    constructor() {
        super();
        this.state = {
            imgLoad: false
        };
    }

    handleLoad = () => this.setState({ imgLoad: true });

    handleClick = () => {
        const { name, previewName, onSelectItem } = this.props;
        onSelectItem(previewName, name);
    };

    render() {
        const { itFolder, name, selected, path, dateCreate } = this.props;
        const { imgLoad } = this.state;

        const showNativeItem = !itFolder && !imgLoad;
        return (
            <div
                className="item col-md-3"
                onClick={this.handleClick}
                title={`Дата создания: ${format(
                    'dd.MM.yyyy',
                    new Date(dateCreate)
                )}`}
            >
                {showNativeItem && (
                    <img className={'item-img'} src={img.file} />
                )}

                <img
                    data-tip="hello world"
                    src={itFolder ? img.folder : itemSrc(path)}
                    {...classname(
                        { 'item-img__hidden': itFolder ? false : !imgLoad },
                        'item-img'
                    )}
                    onLoad={this.handleLoad}
                />

                <label
                    {...classname(
                        { ['item-name__bold']: selected },
                        'item-name'
                    )}
                >
                    {name}
                </label>
            </div>
        );
    }
}
