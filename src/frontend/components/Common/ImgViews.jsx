import React, { PureComponent } from 'react';
import styles from './Gallery.scss';
import Img from './Controls/Img.jsx';
import Button from 'Controls/RaisedButton.jsx';

export default class ImgView extends PureComponent {
    constructor() {
        super();

        this.state = {
            items: []
        };
    }

    onKeyUp = e => {
        const props = this.props;

        const index = props.items.data.findIndex(x => x._id === props.id);
        if (e.keyCode === 39 && index !== props.items.data.length - 1) {
            props.onSetModalImg(index + 1);
        }

        if (e.keyCode === 37 && index !== 0) {
            props.onSetModalImg(index - 1);
        }
    };

    componentDidMount() {
        document.addEventListener('keyup', this.onKeyUp);
        this.setState({
            items: this.props.items
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onKeyUp);
    }

    render() {
        const { items, open, id, onSetModalImg, onSetModal } = this.props;

        const index = items.findIndex(x => x._id === id);

        const item = items[index];

        return (
            open && (
                <div className="fullImg">
                    <div className="title">{item.name} </div>
                    <div className="count">
                        {index + 1} из {items.length}
                    </div>
                    {
                        <div className="preview">
                            <Img src={item.url.replace('small', 'preview')} />
                        </div>
                    }
                    <div className="description">{item.room}</div>
                    <div className="rating">{item.rating}</div>
                    {index !== 0 && (
                        <div
                            onClick={() => onSetModalImg(index - 1)}
                            className="left"
                        >
                            <i className="fa fa-chevron-left" />
                        </div>
                    )}
                    {index !== items.data.length - 1 && (
                        <div
                            className="right"
                            onClick={() => onSetModalImg(index + 1)}
                        >
                            <i className="fa fa fa-chevron-right" />
                        </div>
                    )}
                    <div className="close" onClick={() => onSetModal(false)}>
                        <i className="fa fa-times" />
                    </div>
                </div>
            )
        );
    }
}
