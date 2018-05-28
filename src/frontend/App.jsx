import React from 'react';
import Routes from './routes.jsx';
import { ConnectedRouter } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ConnectedRouter history={this.props.history}>
                    <Routes />
                </ConnectedRouter>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-left"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                />
            </div>
        );
    }
}

export default hot(module)(App);
