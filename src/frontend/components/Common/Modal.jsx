import React, { PureComponent } from 'react';

export default class Modal extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            value: props.defaultValue || ''
        };
    }

    handleChange = e => this.setState({ value: e.target.value });

    render() {
        const {
            title,
            onSave,
            btnName,
            onChangeView,
            modalType,
            mainValue,
            defaultValue
        } = this.props;
        const { value } = this.state;
        return [
            <div
                key="form"
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                {...{ style: { display: 'block' } }}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() =>
                                    onChangeView(modalType + 'Show', false)
                                }
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Введите значение..."
                                    value={value}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() =>
                                    onChangeView(modalType + 'Show', false)
                                }
                            >
                                Закрыть
                            </button>
                            <button
                                type="button"
                                onClick={onSave}
                                className="btn btn-primary"
                                onClick={() => {
                                    onSave(mainValue, value, defaultValue);
                                    onChangeView(modalType + 'Show', false);
                                }}
                            >
                                {btnName}
                            </button>
                        </div>
                    </div>
                </div>
            </div>,
            <div key="overlay" className="modal-backdrop fade show" />
        ];
    }
}
