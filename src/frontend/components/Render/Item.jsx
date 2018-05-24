/*global process */
import React, { PureComponent } from 'react';
import classname from 'helpers/components/classname';
import './item.scss';

const img = {
    folder: '/assets/images/folder.png',
    file: '/assets/images/file.png'
};

const itemSrc = path => `${process.env.BROWSER ? 'http://localhost:4100' : ''}/img/file?path=${path}&src=small`;

export default class Item extends PureComponent {
    constructor() {
        super();
        this.state = {
            imgLoad: false
        };
    }

    handleLoad = () => this.setState({ imgLoad: true });

    handleClick = () => {
        const { name, type, onSelectItem } = this.props;
        onSelectItem(type, name);
    };

    render() {
        const { itFolder, name, selected, path } = this.props;
        const { imgLoad } = this.state;

        const showNativeItem = !itFolder && !imgLoad;
        return (
            <div className="item col-md-3" onClick={this.handleClick}>
                {showNativeItem && <img className={'item-img'} src={img.file} />}
                <img
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
