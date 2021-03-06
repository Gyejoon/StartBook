import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { hot } from 'react-hot-loader/root';
import client from './lib/graphql/client';
import { createStore } from 'redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'lib/storage';
import { setUser } from 'modules/core';
import { HelmetProvider } from 'react-helmet-async';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(),
);

const loadUser = () => {
  const user = storage.getItem('CURRENT_USER');
  if (!user) return;
  store.dispatch(setUser(user));
};

loadUser();

const WithHotReload = process.env.NODE_ENV === 'production' ? App : hot(App);

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <WithHotReload />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root'),
);

(window as any).fbAsyncInit = function () {
  (window as any).FB.init({
    appId: '215662702997532',
    cookie: true,
    xfbml: true,
    version: 'v6.0',
  });

  (window as any).FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0] as any;
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s) as any;
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
