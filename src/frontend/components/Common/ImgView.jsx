import React, { PureComponent } from 'react';
import format from 'date-format';
import './imgView.scss';

export default class ImgView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: props.activeIndex
        };
    }

    onSetModalImg = activeIndex => {
        const { items } = this.props;
        const l = items.length;
        this.setState({
            activeIndex:
                activeIndex > l - 1 ? 0 : activeIndex < 0 ? l - 1 : activeIndex
        });
    };

    onKeyUp = e => {
        const { onSetModal } = this.props;
        const { activeIndex } = this.state;
        if (e.keyCode === 39) {
            this.onSetModalImg(activeIndex + 1);
        }

        if (e.keyCode === 37) {
            this.onSetModalImg(activeIndex - 1);
        }

        if (e.keyCode === 27) {
            onSetModal(false);
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
        const { items, onSetModal } = this.props;
        const { activeIndex } = this.state;

        const item = items[activeIndex];

        return (
            <div className="fullImg">
                <div className="title">{item.name} </div>
                <div className="count">
                    {activeIndex + 1} из {items.length}
                </div>
                {
                    <div className="preview">
                        <img src={item.url} />
                    </div>
                }
                <div className="description">
                    Дата создания:{' '}
                    {format('dd.MM.yyyy', new Date(item.dateCreate))}
                </div>

                <div
                    onClick={() => this.onSetModalImg(activeIndex - 1)}
                    className="left"
                >
                    <i className="fa fa-chevron-left" />
                </div>

                <div
                    className="right"
                    onClick={() => this.onSetModalImg(activeIndex + 1)}
                >
                    <i className="fa fa fa-chevron-right" />
                </div>

                <div className="close" onClick={() => onSetModal(false)}>
                    <i className="fa fa-times" />
                </div>
            </div>
        );
    }
}
