import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import configureStore from './store';
import createHistory from 'history/createBrowserHistory';
import './styles/css/normalize.css';
import './styles/css/bootstrap.min.css';
import './styles/css/font-awesome.min.css';
import './styles/css/themify-icons.css';
// import './styles/css/flag-icon.min.css';
// import './styles/css/cs-skin-elastic.css';
import './styles/scss/style.scss';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);
