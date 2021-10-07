import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from './context/auth-context';

const onRedirectCallback = (appState, history) => {
    // history.push(
    //     appState && appState.targetUrl
    //         ? appState.targetUrl
    //         : window.location.pathname
    // );
};

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
            redirect_uri={`${process.env.REACT_APP_AUTH0_PRIMARY_URL}`}
            onRedirectCallback={onRedirectCallback}
        >
            <App/>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
