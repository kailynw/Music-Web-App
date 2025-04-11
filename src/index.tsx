import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './main/app/store';
import App from './main/app/App';
import reportWebVitals from './reportWebVitals';
import './main/css/components/index.scss';
import { createBrowserHistory } from "history";
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import { PersistGate } from 'redux-persist/integration/react';

const onRedirectCallback = (appState:any) => {
  const history = createBrowserHistory()
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const domain= process.env.REACT_APP_AUTH0_DOMAIN ?  process.env.REACT_APP_AUTH0_DOMAIN : ""
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ? process.env.REACT_APP_AUTH0_CLIENT_ID : ""
const audience = process.env.REACT_APP_AUTH0_AUDIENCE? process.env.REACT_APP_AUTH0_AUDIENCE : ""

const providerConfig:Auth0ProviderOptions= {
  domain: domain,
  clientId: clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(audience ? { audience: audience } : null),
  },
};
console.log(providerConfig)



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
