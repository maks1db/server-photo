/*global process */
import React, { PureComponent } from 'react';
import classname from 'helpers/components/classname';
import format from 'date-format';
import './item.scss';

const img = {
    folder: '/assets/images/folder.png',
    file: '/assets/images/file.png'
};

const LOADING_TIMEOUT = 2000;

const defaultOptions = {
    rootMargin: '100px',
    threshold: 0.25
};

export const itemSrc = (path, src = 'small') =>
    `${
        process.env.DEV ? 'http://localhost:4100' : ''
    }/img/file?path=${path}&src=${src}`;

export default class Item extends PureComponent {
    constructor() {
        super();
        this.state = {
            imgLoad: false,
            imgVisible: false
        };

        this.observer;
        this.ref;
    }

    handleLoad = () => this.setState({ imgLoad: true });

    handleClick = () => {
        const { name, previewName, onSelectItem } = this.props;
        onSelectItem(previewName, name);
    };

    getRef = e => (this.ref = e);

    componentDidMount() {
        setTimeout(() => {
            this.observer = new IntersectionObserver(entries => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    this.setState({
                        imgVisible: true
                    });
                    this.observer.unobserve(this.ref);
                }
            }, defaultOptions);
            this.observer.observe(this.ref);
        }, LOADING_TIMEOUT);
    }

    componentWillUnmount() {
        if (!this.observer) {
            return;
        }

        this.observer.unobserve(this.ref);
        this.observer.disconnect();
    }

    render() {
        const { itFolder, name, selected, path, dateCreate } = this.props;
        const { imgLoad, imgVisible } = this.state;

        const showNativeItem = !itFolder && !imgLoad;
        return (
            <div
                className="item col-md-3"
                onClick={this.handleClick}
                title={`Дата создания: ${format(
                    'dd.MM.yyyy',
                    new Date(dateCreate)
                )}`}
                ref={this.getRef}
            >
                {showNativeItem && (
                    <img className={'item-img'} src={img.file} />
                )}

                {(
                    <img
                        src={itFolder ? img.folder : imgVisible ? itemSrc(path) : ''}
                        {...classname(
                            { 'item-img__hidden': itFolder ? false : !imgLoad },
                            'item-img'
                        )}
                        onLoad={this.handleLoad}
                    />
                )}

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
