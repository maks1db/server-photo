import { connect } from 'react-redux';
import { init as initAciton } from '../actions/app';
import React, { Component } from 'react';
import Preview from 'components/Render/Preview.jsx';

function mapStateToProps(state) {
    return {
        items: state.app.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
        init: () => dispatch(initAciton())
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    componentDidMount() {
        const { init } = this.props;
        init();
    }

    render() {
        const { items } = this.props;

        return (
            <div className="row">
                <div className="col-md-6">
                    <Preview data={items} />
                </div>
                <div className="col-md-6">
                    <Preview />
                </div>
            </div>
        );
    }
}
