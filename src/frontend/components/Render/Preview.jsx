import React, { PureComponent } from 'react';
import Item from './Item.jsx';
import Buttons from './Buttons.jsx';
import './preview.scss';

export default class Preview extends PureComponent {
    onResize = () => {
        const height = window.innerHeight;
        this.item.style.height = `${height - 60}px`;
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    render() {
        const { data, onSelectItem, type } = this.props;

        return [
            <Buttons
                haveSelected={data.filter(x => x.selected).length > 0}
                selectedItem={data.reduce(
                    (accum, x) => (x.selected ? x : accum),
                    {}
                )}
                {...this.props}
            />,
            <div className="preview" ref={e => (this.item = e)}>
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
