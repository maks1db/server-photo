import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import configureStore from './store';
import createHistory from 'history/createBrowserHistory';
import './styles/index.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import 'font-awesome/css/font-awesome.css';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);
