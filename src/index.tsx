import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setupStore } from '~app-state/store';
import App from './app';
import './index.scss';

const store = setupStore();

const root = (
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(root, document.getElementById('root') as HTMLElement);
