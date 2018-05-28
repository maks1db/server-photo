import React, { PureComponent } from 'react';
import Item from './Item.jsx';
import Buttons from './Buttons.jsx';
import './preview.scss';

const folderPreview = folder =>
    folder === ''
        ? '""'
        : folder.split('/').reduce((accum, x) => (x !== '' ? x : accum), '');

export default class Preview extends PureComponent {
    onResize = () => {
        const height = window.innerHeight;
        this.item.style.height = `${height - 100}px`;
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    render() {
        const { data, onSelectItem, type, folder = '' } = this.props;

        return [
            <Buttons
                key="buttons"
                haveSelected={data.filter(x => x.selected).length > 0}
                selectedItem={data.reduce(
                    (accum, x) => (x.selected ? x : accum),
                    {}
                )}
                {...this.props}
            />,
            <div className="preview" ref={e => (this.item = e)} key="preview">
                <h5 className="preview-folder">{folderPreview(folder)}</h5>
                <div className="row">
                    {data.map(x => (
                        <Item
                            key={x.name}
                            {...x}
                            onSelectItem={onSelectItem}
                            type={type}
                        />
                    ))}
                </div>
            </div>
        ];
    }
}
