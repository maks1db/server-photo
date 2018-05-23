import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import LeftPanel from 'Layout/LeftPanel.jsx';
import RightPanel from 'Layout/RightPanel.jsx';

function mapStateToProps(state) {
    return {
        title: state.app.title
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

@connect(mapStateToProps, mapDispatchToProps)
class Layout extends React.PureComponent {
    render() {
        const { children, title } = this.props;
        return [
            <LeftPanel key="left-panel" />,
            <RightPanel key="right-panel"> {children} </RightPanel>
        ];
    }
}

export default Layout;
