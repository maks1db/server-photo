import React, { PureComponent } from 'react';
import classname from 'helpers/components/classname';

export default class Modal extends PureComponent {
    constructor() {
        super();
        this.state = {
            value: ''
        };
    }

    handleChange = e => this.setState({ value: e.target.value });

    render() {
        const { show } = this.props;
        return [
            <div
                {...classname({ show: show }, 'modal fade')}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                {...show && { style: { display: 'block' } }}
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
                                Modal title
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Значение</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Введите значение"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Закрыть
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>,
            <div {...classname({ show: show }, 'modal-backdrop fade')} />
        ];
    }
}
