import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from './helpers/reduxStore'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Root = () => {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
