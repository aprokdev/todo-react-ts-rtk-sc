import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Normalize } from 'styled-normalize';
import { setupStore } from '~app-state/store';
import App from './app';
import GlobalStyle from './globalStyles';

const store = setupStore();

const root = (
    <React.StrictMode>
        <Provider store={store}>
            {/* <Normalize /> */}
            <GlobalStyle />
            <App />
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(root, document.getElementById('root') as HTMLElement);
